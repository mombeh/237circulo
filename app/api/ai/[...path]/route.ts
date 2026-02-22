import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'your-internal-api-key-here';

/**
 * API Route to proxy AI requests to the NestJS backend
 * This avoids CORS issues and provides a single entry point
 * 
 * Routes:
 * - GET  /api/ai/health -> GET  /ai/health
 * - POST /api/ai/classify -> POST /ai/classify (multipart)
 * - POST /api/ai/price -> POST /ai/price
 * - POST /api/ai/chat -> POST /ai/chat (streaming)
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const path = (await params).path.join('/');
  const targetUrl = `${API_BASE_URL}/ai/${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': INTERNAL_API_KEY,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('AI API Proxy Error:', error);
    return NextResponse.json(
      { message: 'Failed to connect to AI service. Please ensure the backend is running.' },
      { status: 502 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const path = (await params).path.join('/');
  const targetUrl = `${API_BASE_URL}/ai/${path}`;

  // Check if this is a multipart form request (for classify with image)
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('multipart/form-data')) {
      // Forward multipart request as-is
      const formData = await request.formData();
      
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'X-API-Key': INTERNAL_API_KEY,
        },
        body: formData,
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      // Forward JSON request
      const body = await request.json();

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': INTERNAL_API_KEY,
        },
        body: JSON.stringify(body),
      });

      // For streaming responses, pipe them directly
      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
            } catch {
              // Ignore errors during streaming
            }
          },
        });

        return new NextResponse(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('AI API Proxy Error:', error);
    return NextResponse.json(
      { message: 'Failed to connect to AI service. Please ensure the backend is running.' },
      { status: 502 }
    );
  }
}
