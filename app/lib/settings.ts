import { useState, useEffect, useCallback } from 'react';

// Settings API service using localStorage for persistent storage
// All settings are saved locally in the browser - no backend required

const STORAGE_KEY = '237circulo_settings';

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

// Default settings
export const defaultSettings: UserSettings = {
  id: 'local-user',
  name: '',
  email: '',
  phone: '',
  quartier: '',
  town: '',
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

/**
 * React Hook for accessing settings globally
 * Use this hook in any component to get/set settings
 * 
 * @example
 * const { settings, updateLanguage, isLoading } = useSettings();
 */
export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Update functions that also update local state
  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
    return updated;
  }, [settings]);

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    const result = await updateProfileAPI(data);
    setSettings(prev => ({ ...prev, ...result }));
    return result;
  }, []);

  const updateLanguage = useCallback(async (data: UpdateLanguageData) => {
    const result = await updateLanguageAPI(data);
    setSettings(prev => ({ ...prev, pref_lang: data.pref_lang }));
    return result;
  }, []);

  const updateNotifications = useCallback(async (data: UpdateNotificationsData) => {
    const result = await updateNotificationsAPI(data);
    setSettings(prev => ({ ...prev, ...data }));
    return result;
  }, []);

  const updateAppearance = useCallback(async (data: UpdateAppearanceData) => {
    const result = await updateAppearanceAPI(data);
    setSettings(prev => ({ ...prev, theme: data.theme }));
    return result;
  }, []);

  const updateRegion = useCallback(async (data: UpdateRegionData) => {
    const result = await updateRegionAPI(data);
    setSettings(prev => ({ ...prev, ...data }));
    return result;
  }, []);

  return {
    settings,
    isLoading,
    updateSettings,
    updateProfile,
    updateLanguage,
    updateNotifications,
    updateAppearance,
    updateRegion,
  };
}

// ============================================
// LOCAL STORAGE FUNCTIONS (No backend required)
// ============================================

// Get settings from localStorage
export function getStoredSettings(): UserSettings {
  if (typeof window === 'undefined') {
    return { ...defaultSettings };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error reading settings from localStorage:', error);
  }
  return { ...defaultSettings };
}

// Save settings to localStorage
function saveSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    console.log('Settings saved to localStorage:', settings);
    // Dispatch event for other components to update
    window.dispatchEvent(new Event('settings-updated'));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
}

// API Functions - All using localStorage

/**
 * GET /settings - Get all user settings
 * Retrieves settings from localStorage
 */
export async function getSettings(): Promise<UserSettings> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  return getStoredSettings();
}

// Internal API functions (used by hook)
async function updateProfileAPI(data: UpdateProfileData): Promise<Partial<UserSettings>> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, ...data };
  saveSettings(updatedSettings);
  return { ...currentSettings, ...data };
}

async function updateLanguageAPI(data: UpdateLanguageData): Promise<{ pref_lang: string }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, pref_lang: data.pref_lang };
  saveSettings(updatedSettings);
  return { pref_lang: data.pref_lang };
}

async function updateNotificationsAPI(data: UpdateNotificationsData): Promise<UpdateNotificationsData> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, ...data };
  saveSettings(updatedSettings);
  return { ...data };
}

async function updateAppearanceAPI(data: UpdateAppearanceData): Promise<{ theme: string }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, theme: data.theme };
  saveSettings(updatedSettings);
  return { theme: data.theme };
}

async function updateRegionAPI(data: UpdateRegionData): Promise<{ timezone: string; currency: string }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentSettings = getStoredSettings();
  const updatedSettings = { 
    ...currentSettings, 
    ...(data.timezone && { timezone: data.timezone }),
    ...(data.currency && { currency: data.currency })
  };
  saveSettings(updatedSettings);
  return { 
    timezone: data.timezone || currentSettings.timezone, 
    currency: data.currency || currentSettings.currency 
  };
}

/**
 * PUT /settings/profile - Update profile settings
 * Saves to localStorage
 */
export async function updateProfile(data: UpdateProfileData): Promise<Partial<UserSettings>> {
  return updateProfileAPI(data);
}

/**
 * PUT /settings/language - Update language preference
 * Saves to localStorage
 */
export async function updateLanguage(data: UpdateLanguageData): Promise<{ pref_lang: string }> {
  return updateLanguageAPI(data);
}

/**
 * PUT /settings/notifications - Update notification preferences
 * Saves to localStorage
 */
export async function updateNotifications(data: UpdateNotificationsData): Promise<UpdateNotificationsData> {
  return updateNotificationsAPI(data);
}

/**
 * PUT /settings/appearance - Update appearance settings
 * Saves to localStorage
 */
export async function updateAppearance(data: UpdateAppearanceData): Promise<{ theme: string }> {
  return updateAppearanceAPI(data);
}

/**
 * PUT /settings/region - Update region settings
 * Saves to localStorage
 */
export async function updateRegion(data: UpdateRegionData): Promise<{ timezone: string; currency: string }> {
  return updateRegionAPI(data);
}

/**
 * POST /settings/password - Change password
 * Validates and saves to localStorage (stored as hash in real app)
 */
export async function changePassword(data: ChangePasswordData): Promise<{ message: string }> {
  // Validate passwords
  if (data.new_password !== data.confirm_password) {
    throw new Error('Passwords do not match');
  }
  if (data.new_password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would hash the password before storing
  // For demo, we just store a flag indicating password is set
  const currentSettings = getStoredSettings();
  saveSettings({ ...currentSettings, id: currentSettings.id || 'has-password' });
  
  return { message: 'Password changed successfully' };
}

/**
 * POST /settings/2fa - Toggle two-factor authentication
 * Saves to localStorage
 */
export async function toggleTwoFactor(data: EnableTwoFactorData): Promise<{ two_factor_enabled: boolean; message: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, two_factor_enabled: data.enable };
  saveSettings(updatedSettings);
  
  return {
    two_factor_enabled: data.enable,
    message: data.enable ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
  };
}

/**
 * POST /settings/avatar - Upload/update avatar
 * Saves to localStorage
 */
export async function uploadAvatar(avatarUrl: string): Promise<{ avatar_url: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const currentSettings = getStoredSettings();
  const updatedSettings = { ...currentSettings, avatar_url: avatarUrl };
  saveSettings(updatedSettings);
  
  return { avatar_url: avatarUrl };
}
