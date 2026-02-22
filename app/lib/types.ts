/**
 * Type definitions for 237Circulo AI Service
 * Matches the backend response shapes from AIService
 */

// ── Price Range ────────────────────────────────────────────────────────────────

export interface PriceRange {
  min: number;
  max: number;
}

// ── Classification Result ──────────────────────────────────────────────────────

export interface ClassificationResult {
  category: string;
  sub_category: string;
  recyclability_score: number;
  price_range_fcfa: PriceRange;
  guidance: string;
  confidence: 'high' | 'medium' | 'low';
}

// ── Price Forecast Result ──────────────────────────────────────────────────────

export interface PriceForecastResult {
  price_range_fcfa: PriceRange;
  demand_trend: 'rising' | 'stable' | 'falling';
  confidence: 'high' | 'medium' | 'low';
  rationale: string;
}

// ── Chat Messages ──────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ── Zone ───────────────────────────────────────────────────────────────────────

export interface Zone {
  id: string;
  name: string;
  city?: string;
}

// ── Waste Listing ────────────────────────────────────────────────────────────

export interface WasteListing {
  id: string;
  waste_type: string;
  sub_category?: string;
  weight_kg: number;
  price_per_kg?: number;
  zone_id: string;
  status: 'pending' | 'collected' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

// ── User ───────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'collector' | 'seller' | 'admin';
  zone_id?: string;
  green_points?: number;
  created_at: string;
}
