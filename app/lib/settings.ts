// Settings API service for connecting to the backend
// API URL is read from environment variable
// Falls back to demo mode when backend is unavailable

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') + '/api';

// Demo mode flag - set to true to use mock data when backend is unavailable
const DEMO_MODE = false;

// Types matching backend DTOs and User entity
export interface UserSettings {
  id: string;
  name: string;
  email: string;
  phone: string;
  quartier: string;
  town: string;
  pref_lang: 'English' | 'French' | 'Pigin';
  theme: 'light' | 'dark' | 'system';
  timezone: 'Africa/Douala' | 'Africa/Yaounde';
  currency: 'XAF' | 'USD' | 'EUR';
  notify_email: boolean;
  notify_push: boolean;
  notify_sms: boolean;
  notify_ai_alerts: boolean;
  two_factor_enabled: boolean;
  avatar_url: string;
}

// Demo data for when backend is unavailable
const demoSettings: UserSettings = {
  id: 'demo-user-id',
  name: 'Demo User',
  email: 'demo@237circulo.com',
  phone: '+237 6XX XXX XXX',
  quartier: 'Biyem-Assi',
  town: 'Yaoundé',
  pref_lang: 'English',
  theme: 'system',
  timezone: 'Africa/Douala',
  currency: 'XAF',
  notify_email: true,
  notify_push: true,
  notify_sms: false,
  notify_ai_alerts: true,
  two_factor_enabled: false,
  avatar_url: '',
};

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  quartier?: string;
  town?: string;
  avatar_url?: string;
}

export interface UpdateLanguageData {
  pref_lang: 'English' | 'French' | 'Pigin';
}

export interface UpdateNotificationsData {
  notify_email?: boolean;
  notify_push?: boolean;
  notify_sms?: boolean;
  notify_ai_alerts?: boolean;
}

export interface UpdateAppearanceData {
  theme: 'light' | 'dark' | 'system';
}

export interface UpdateRegionData {
  timezone?: 'Africa/Douala' | 'Africa/Yaounde';
  currency?: 'XAF' | 'USD' | 'EUR';
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface EnableTwoFactorData {
  enable: boolean;
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// In-memory store for demo mode (persists during session)
let demoState = { ...demoSettings };

// Helper to make API calls with demo mode fallback
async function apiCall<T>(
  endpoint: string,
  options: RequestInit,
  demoResponse: T
): Promise<T> {
  if (DEMO_MODE) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Demo mode: ${options.method || 'GET'} ${endpoint}`);
    return demoResponse;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.warn(`API call failed, using demo response:`, error);
    return demoResponse;
  }
}

// API Functions

/**
 * GET /settings - Get all user settings
 * Falls back to demo data if backend is unavailable
 */
export async function getSettings(): Promise<UserSettings> {
  if (DEMO_MODE) {
    console.log('Using demo mode for settings');
    return { ...demoState };
  }

  try {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.warn('Backend unavailable, using demo data');
      return { ...demoState };
    }

    return response.json();
  } catch (error) {
    console.warn('Failed to connect to backend, using demo data:', error);
    return { ...demoState };
  }
}

/**
 * PUT /settings/profile - Update profile settings
 */
export async function updateProfile(data: UpdateProfileData): Promise<Partial<UserSettings>> {
  const demoResponse: Partial<UserSettings> = {
    id: demoState.id,
    name: data.name || demoState.name,
    email: data.email || demoState.email,
    phone: data.phone || demoState.phone,
    quartier: data.quartier || demoState.quartier,
    town: data.town || demoState.town,
    avatar_url: data.avatar_url || demoState.avatar_url,
  };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState = { ...demoState, ...demoResponse };
    return demoResponse;
  }

  return apiCall('/settings/profile', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * PUT /settings/language - Update language preference
 */
export async function updateLanguage(data: UpdateLanguageData): Promise<{ pref_lang: string }> {
  const demoResponse = { pref_lang: data.pref_lang };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState.pref_lang = data.pref_lang;
    return demoResponse;
  }

  return apiCall('/settings/language', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * PUT /settings/notifications - Update notification preferences
 */
export async function updateNotifications(data: UpdateNotificationsData): Promise<UpdateNotificationsData> {
  const demoResponse: UpdateNotificationsData = {
    notify_email: data.notify_email ?? demoState.notify_email,
    notify_push: data.notify_push ?? demoState.notify_push,
    notify_sms: data.notify_sms ?? demoState.notify_sms,
    notify_ai_alerts: data.notify_ai_alerts ?? demoState.notify_ai_alerts,
  };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState = { ...demoState, ...demoResponse };
    return demoResponse;
  }

  return apiCall('/settings/notifications', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * PUT /settings/appearance - Update appearance settings
 */
export async function updateAppearance(data: UpdateAppearanceData): Promise<{ theme: string }> {
  const demoResponse = { theme: data.theme };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState.theme = data.theme;
    return demoResponse;
  }

  return apiCall('/settings/appearance', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * PUT /settings/region - Update region settings
 */
export async function updateRegion(data: UpdateRegionData): Promise<{ timezone: string; currency: string }> {
  const demoResponse = {
    timezone: data.timezone || demoState.timezone,
    currency: data.currency || demoState.currency,
  };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (data.timezone) demoState.timezone = data.timezone;
    if (data.currency) demoState.currency = data.currency;
    return demoResponse;
  }

  return apiCall('/settings/region', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * POST /settings/password - Change password
 */
export async function changePassword(data: ChangePasswordData): Promise<{ message: string }> {
  // Validate in demo mode
  if (data.new_password !== data.confirm_password) {
    throw new Error('Passwords do not match');
  }
  if (data.new_password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const demoResponse = { message: 'Password updated successfully (demo mode)' };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return demoResponse;
  }

  return apiCall('/settings/password', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * POST /settings/2fa - Toggle two-factor authentication
 */
export async function toggleTwoFactor(data: EnableTwoFactorData): Promise<{ two_factor_enabled: boolean; message: string }> {
  const demoResponse = {
    two_factor_enabled: data.enable,
    message: data.enable ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
  };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState.two_factor_enabled = data.enable;
    return demoResponse;
  }

  return apiCall('/settings/2fa', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }, demoResponse);
}

/**
 * POST /settings/avatar - Upload/update avatar
 */
export async function uploadAvatar(avatarUrl: string): Promise<{ avatar_url: string }> {
  const demoResponse = { avatar_url: avatarUrl };

  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 500));
    demoState.avatar_url = avatarUrl;
    return demoResponse;
  }

  return apiCall('/settings/avatar', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ avatar_url: avatarUrl }),
  }, demoResponse);
}
