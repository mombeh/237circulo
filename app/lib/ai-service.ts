/**
 * AI Service - Frontend API Layer for 237Circulo Backend
 * 
 * This service communicates with the NestJS backend AI endpoints via the Next.js API proxy:
 * - GET  /api/ai/health -> GET  /ai/health
 * - POST /api/ai/classify -> POST /ai/classify (multipart)
 * - POST /api/ai/price -> POST /ai/price
 * - POST /api/ai/chat -> POST /ai/chat (streaming)
 * 
 * Make sure the NestJS backend is running at NEXT_PUBLIC_API_URL
 * and INTERNAL_API_KEY is configured in .env
 */

import { ClassificationResult, PriceForecastResult, ChatMessage } from './types';

// ── API Configuration ────────────────────────────────────────────────────────

// Use the same origin - requests go through Next.js API proxy
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'your-internal-api-key-here';

/**
 * Get headers for API requests
 */
function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': INTERNAL_API_KEY,
  };
}

/**
 * Get headers for multipart form requests (file uploads)
 */
function getMultipartHeaders(): HeadersInit {
  return {
    'X-API-Key': INTERNAL_API_KEY,
  };
}

// ── Health Check ────────────────────────────────────────────────────────────

/**
 * Check if AI service is healthy
 */
export async function checkAIHealth(): Promise<{ status: string }> {
  const response = await fetch(`/api/ai/health`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`AI health check failed: ${response.statusText}`);
  }

  return response.json();
}

// ── Waste Classification ────────────────────────────────────────────────────

export interface ClassifyRequest {
  image?: File;
  description?: string;
}

/**
 * Classify waste from an image and/or text description
 * 
 * @param image - Optional image file (JPEG/PNG/WebP, max 5MB)
 * @param description - Optional text description
 * @returns ClassificationResult with category, sub_category, recyclability_score, etc.
 */
export async function classifyWaste(
  image?: File,
  description?: string
): Promise<ClassificationResult> {
  if (!image && !description) {
    throw new Error('Provide at least one of: an image file or a text description.');
  }

  const formData = new FormData();

  if (image) {
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      throw new Error('Only JPEG, PNG, and WebP images are accepted.');
    }
    // Validate file size (5MB max)
    if (image.size > 5 * 1024 * 1024) {
      throw new Error('Image must be less than 5MB.');
    }
    formData.append('image', image);
  }

  if (description) {
    formData.append('description', description.trim());
  }

  const response = await fetch(`/api/ai/classify`, {
    method: 'POST',
    headers: getMultipartHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Classification failed: ${response.statusText}`);
  }

  return response.json();
}

// ── Price Forecasting ────────────────────────────────────────────────────────

export interface PriceForecastRequest {
  wasteType: string;
  zoneId: string;
}

/**
 * Forecast a fair price for waste in a given zone
 * 
 * @param wasteType - Type of waste (e.g., "plastic", "metal", "paper")
 * @param zoneId - UUID of the zone
 * @returns PriceForecastResult with price range, demand trend, confidence
 */
export async function forecastPrice(
  wasteType: string,
  zoneId: string
): Promise<PriceForecastResult> {
  if (!wasteType?.trim()) {
    throw new Error('waste_type is required.');
  }
  if (!zoneId?.trim()) {
    throw new Error('zone_id is required.');
  }

  const response = await fetch(`/api/ai/price`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      waste_type: wasteType.trim(),
      zone_id: zoneId.trim(),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Price forecast failed: ${response.statusText}`);
  }

  return response.json();
}

// ── Streaming Chat ────────────────────────────────────────────────────────────

export type ChatLanguage = 'fr' | 'en' | 'pidgin';

export interface ChatRequest {
  messages: ChatMessage[];
  language?: ChatLanguage;
}

export type TokenHandler = (token: string) => void;
export type DoneHandler = () => void;
export type ErrorHandler = (error: string) => void;

/**
 * Stream chat messages from the AI assistant
 * 
 * @param messages - Array of chat messages with role and content
 * @param language - Preferred language (fr, en, pidgin)
 * @param onToken - Callback for each token received
 * @param onDone - Callback when stream is complete
 * @param onError - Callback on error
 * @returns Promise that resolves when stream starts (consumer should NOT await completion)
 */
export async function streamChat(
  messages: ChatMessage[],
  language: ChatLanguage = 'fr',
  onToken: TokenHandler,
  onDone: DoneHandler,
  onError: ErrorHandler
): Promise<() => void> {
  const response = await fetch(`/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': INTERNAL_API_KEY,
    },
    body: JSON.stringify({
      messages,
      language,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Chat failed: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('No response body received');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const processStream = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // Check for remaining data in buffer
          if (buffer.trim()) {
            try {
              const data = JSON.parse(buffer);
              if (data.error) {
                onError(data.error);
              } else if (data.token) {
                onToken(data.token);
              }
            } catch {
              // Ignore parse errors for incomplete chunks
            }
          }
          onDone();
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            
            if (dataStr === '[DONE]') {
              onDone();
              reader.cancel();
              return;
            }

            try {
              const data = JSON.parse(dataStr);
              
              if (data.error) {
                onError(data.error);
              } else if (data.token) {
                onToken(data.token);
              }
            } catch {
              console.warn('Failed to parse SSE data:', dataStr);
            }
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'CancelError') {
        onError((err as Error).message || 'Stream error');
      }
    }
  };

  processStream();

  // Return cleanup function
  return () => {
    reader.cancel();
  };
}

// ── Utility: Get Default Zone ───────────────────────────────────────────────

/**
 * Get list of available zones (would need to be implemented with backend endpoint)
 * This is a placeholder that returns common Cameroon zones
 */
export function getDefaultZones(): { id: string; name: string }[] {
  return [
    { id: 'nkolfoulou', name: 'Nkolfoulou' },
    { id: 'bastos', name: 'Bastos' },
    { id: 'biyem-assi', name: 'Biyem-Assi' },
    { id: 'mvan', name: 'Mvan' },
    { id: 'tsinga', name: 'Tsinga' },
    { id: 'ngousso', name: 'Ngousso' },
    { id: 'emana', name: 'Emana' },
    { id: 'odza', name: 'Odza' },
  ];
}

/**
 * Get list of common waste types
 */
export function getWasteTypes(): string[] {
  return [
    'plastic',
    'metal',
    'paper',
    'glass',
    'organic',
    'e-waste',
    'textile',
    'rubber',
    'hazardous',
    'other',
  ];
}
