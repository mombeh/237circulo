/**
 * AI Service - Frontend API Layer for 237Circulo
 * 
 * Using MOCK DATA for demonstration purposes.
 * 
 * Features:
 * - Waste Classification (mock)
 * - Price Forecasting (mock)
 * - Chat (placeholder)
 */

import { ClassificationResult, PriceForecastResult, ChatMessage } from './types';

// ── Mock Data for Waste Classification ────────────────────────────────────────

const mockClassificationResults: Record<string, ClassificationResult> = {
  'plastic': {
    category: 'Plastic',
    sub_category: 'PET Bottles',
    confidence: 'high',
    recyclability_score: 85,
    price_range_fcfa: { min: 50, max: 150 },
    guidance: 'Clean and crush PET bottles before selling. Remove caps and labels for better prices.',
  },
  'metal': {
    category: 'Metal',
    sub_category: 'Aluminum Cans',
    confidence: 'high',
    recyclability_score: 95,
    price_range_fcfa: { min: 200, max: 350 },
    guidance: 'Aluminum has high value! Clean and flatten cans for best prices.',
  },
  'paper': {
    category: 'Paper',
    sub_category: 'Cardboard',
    confidence: 'medium',
    recyclability_score: 75,
    price_range_fcfa: { min: 25, max: 75 },
    guidance: 'Keep cardboard dry and free from food contamination. Flatten boxes.',
  },
  'glass': {
    category: 'Glass',
    sub_category: 'Glass Bottles',
    confidence: 'high',
    recyclability_score: 90,
    price_range_fcfa: { min: 30, max: 80 },
    guidance: 'Sort by color (clear, brown, green). Remove caps and rinse clean.',
  },
  'organic': {
    category: 'Organic',
    sub_category: 'Food Waste',
    confidence: 'medium',
    recyclability_score: 100,
    price_range_fcfa: { min: 0, max: 25 },
    guidance: 'Organic waste can be composted. Keep separate from recyclables.',
  },
  'e-waste': {
    category: 'E-Waste',
    sub_category: 'Small Electronics',
    confidence: 'high',
    recyclability_score: 70,
    price_range_fcfa: { min: 500, max: 2000 },
    guidance: 'Contains valuable metals! Do not break apart. Sell to certified collectors.',
  },
};

// ── Mock Data for Price Forecast ────────────────────────────────────────────

const mockPriceForecasts: Record<string, PriceForecastResult> = {
  'plastic-nkolfoulou': {
    price_range_fcfa: { min: 50, max: 150 },
    demand_trend: 'rising',
    confidence: 'high',
    rationale: 'High demand from recyclers in Nkolfoulou area. Limited supply keeps prices strong.',
  },
  'plastic-bastos': {
    price_range_fcfa: { min: 60, max: 180 },
    demand_trend: 'rising',
    confidence: 'high',
    rationale: 'Industrial area with high demand. Good infrastructure for recycling.',
  },
  'metal-nkolfoulou': {
    price_range_fcfa: { min: 200, max: 400 },
    demand_trend: 'stable',
    confidence: 'high',
    rationale: 'Consistent demand with stable prices. Export opportunities to nearby regions.',
  },
  'metal-biyem-assi': {
    price_range_fcfa: { min: 180, max: 350 },
    demand_trend: 'rising',
    confidence: 'high',
    rationale: 'Growing market with many local scrap dealers competing for materials.',
  },
  'paper-nkolfoulou': {
    price_range_fcfa: { min: 25, max: 75 },
    demand_trend: 'falling',
    confidence: 'medium',
    rationale: 'Digital transition reducing paper demand. Consider donating instead.',
  },
  'glass-nkolfoulou': {
    price_range_fcfa: { min: 30, max: 80 },
    demand_trend: 'stable',
    confidence: 'medium',
    rationale: 'Local glass manufacturers provide steady demand.',
  },
  'organic-nkolfoulou': {
    price_range_fcfa: { min: 0, max: 25 },
    demand_trend: 'rising',
    confidence: 'low',
    rationale: 'Composting initiatives growing. Agricultural demand increasing.',
  },
  'e-waste-nkolfoulou': {
    price_range_fcfa: { min: 500, max: 2500 },
    demand_trend: 'rising',
    confidence: 'high',
    rationale: 'High value metals. Limited collectors means premium prices.',
  },
};

const defaultPriceForecast: PriceForecastResult = {
  price_range_fcfa: { min: 25, max: 100 },
  demand_trend: 'stable',
  confidence: 'medium',
  rationale: 'Market price varies by quality. Contact local collectors for quotes.',
};

// ── Functions ────────────────────────────────────────────────────────────────

/**
 * Classify waste from an image and/or text description
 */
export async function classifyWaste(
  image?: File,
  description?: string
): Promise<ClassificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('plastic') || desc.includes('bottle') || desc.includes('sachet') || desc.includes('poly')) {
    return mockClassificationResults['plastic'];
  }
  if (desc.includes('metal') || desc.includes('aluminum') || desc.includes('can') || desc.includes('copper')) {
    return mockClassificationResults['metal'];
  }
  if (desc.includes('paper') || desc.includes('cardboard') || desc.includes('box')) {
    return mockClassificationResults['paper'];
  }
  if (desc.includes('glass') || desc.includes('bottle') || desc.includes('jar')) {
    return mockClassificationResults['glass'];
  }
  if (desc.includes('organic') || desc.includes('food') || desc.includes('vegetable') || desc.includes('fruit')) {
    return mockClassificationResults['organic'];
  }
  if (desc.includes('e-waste') || desc.includes('electronic') || desc.includes('phone') || desc.includes('computer')) {
    return mockClassificationResults['e-waste'];
  }

  const keys = Object.keys(mockClassificationResults);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return mockClassificationResults[randomKey];
}

/**
 * Forecast a fair price for waste in a given zone
 */
export async function forecastPrice(
  wasteType: string,
  zoneId: string
): Promise<PriceForecastResult> {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const key = `${wasteType}-${zoneId}`;
  
  if (mockPriceForecasts[key]) {
    return mockPriceForecasts[key];
  }

  const zoneName = zoneId.replace('-', ' ').toLowerCase();
  for (const k of Object.keys(mockPriceForecasts)) {
    if (k.includes(wasteType) && k.includes(zoneName)) {
      return mockPriceForecasts[k];
    }
  }

  return {
    ...defaultPriceForecast,
    demand_trend: 'stable',
    confidence: 'medium',
  };
}

/**
 * Chat function - placeholder
 */
export async function streamChat(
  _messages: ChatMessage[],
  _language: string,
  onToken: (token: string) => void,
  onDone: () => void,
  _onError: (error: string) => void
): Promise<() => void> {
  const mockResponse = `I'm sorry, the AI chat feature is currently under development. 
  
In the meantime, you can:
• Use Waste Classification to identify materials
• Use Price Forecast to check current market prices
• Check the Marketplace for buying/selling recyclables

How can I help you with waste classification or pricing?`;

  let index = 0;
  const interval = setInterval(() => {
    if (index < mockResponse.length) {
      onToken(mockResponse[index]);
      index++;
    } else {
      clearInterval(interval);
      onDone();
    }
  }, 30);

  return () => clearInterval(interval);
}

export type ChatLanguage = 'fr' | 'en' | 'pidgin';

// ── Utility Functions ──────────────────────────────────────────────────────

export function getDefaultZones(): { id: string; name: string }[] {
  return [
    { id: 'nkolfoulou', name: 'Nkolfoulou' },
    { id: 'bastos', name: 'Bastos' },
    { id: 'biyem-assi', name: 'Biyem-Assi' },
    { id: 'mvan', name: 'Mvan' },
    { id: 'essos', name: 'Essos' },
    { id: 'akwa', name: 'Akwa' },
    { id: 'tsinga', name: 'Tsinga' },
    { id: 'ngousso', name: 'Ngousso' },
  ];
}

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
  ];
}
