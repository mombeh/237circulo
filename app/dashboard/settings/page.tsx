'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Globe,
  Shield,
  Palette,
  Key,
  Save,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  getSettings,
  updateProfile,
  updateLanguage,
  updateNotifications,
  updateAppearance,
  updateRegion,
  changePassword,
  toggleTwoFactor,
  UserSettings,
} from '@/app/lib/settings';

type Language = 'English' | 'French' | 'Pigin';
type Theme = 'light' | 'dark' | 'system';
type Timezone = 'Africa/Douala' | 'Africa/Yaounde';
type Currency = 'XAF' | 'USD' | 'EUR';

interface NotificationSettings {
  notify_email: boolean;
  notify_push: boolean;
  notify_sms: boolean;
  notify_ai_alerts: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // User settings state
  const [settings, setSettings] = useState<UserSettings>({
    id: '',
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
  });

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    quartier: '',
    town: '',
  });

  const [language, setLanguage] = useState<Language>('English');
  const [timezone, setTimezone] = useState<Timezone>('Africa/Douala');
  const [currency, setCurrency] = useState<Currency>('XAF');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    notify_email: true,
    notify_push: true,
    notify_sms: false,
    notify_ai_alerts: true,
  });
  const [theme, setTheme] = useState<Theme>('system');

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
      
      // Update form states
      setProfileForm({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        quartier: data.quartier || '',
        town: data.town || '',
      });
      setLanguage(data.pref_lang || 'English');
      setTimezone(data.timezone || 'Africa/Douala');
      setCurrency(data.currency || 'XAF');
      setNotifications({
        notify_email: data.notify_email ?? true,
        notify_push: data.notify_push ?? true,
        notify_sms: data.notify_sms ?? false,
        notify_ai_alerts: data.notify_ai_alerts ?? true,
      });
      setTheme(data.theme || 'system');
    } catch (error) {
      console.error('Failed to load settings:', error);
      showMessage('error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Profile handlers
  const handleProfileSave = async () => {
    setSaving(true);
    try {
      await updateProfile(profileForm);
      await loadSettings();
      showMessage('success', 'Profile updated successfully');
    } catch (error: unknown) {
      const err = error as { message?: string };
      showMessage('error', err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Language & Region handlers
  const handleLanguageSave = async () => {
    setSaving(true);
    try {
      await updateLanguage({ pref_lang: language });
      showMessage('success', 'Language updated successfully');
    } catch (error: unknown) {
      const err = error as { message?: string };
      showMessage('error', err.message || 'Failed to update language');
    } finally {
      setSaving(false);
    }
  };

  const handleRegionSave = async () => {
    setSaving(true);
    try {
      await updateRegion({ timezone, currency });
      showMessage('success', 'Region settings updated successfully');
    } catch (error: unknown) {
      const err = error as { message?: string };
      showMessage('error', err.message || 'Failed to update region settings');
    } finally {
      setSaving(false);
    }
  };

  // Notifications handlers
  const handleNotificationChange = async (key: keyof NotificationSettings) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(newNotifications);
    
    try {
      await updateNotifications({ [key]: newNotifications[key] });
      showMessage('success', 'Notification settings updated');
    } catch (error: unknown) {
      const err = error as { message?: string };
      // Revert on error
      setNotifications(notifications);
      showMessage('error', err.message || 'Failed to update notifications');
    }
  };

  // Appearance handlers
  const handleThemeChange = async (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      await updateAppearance({ theme: newTheme });
      showMessage('success', 'Theme updated successfully');
    } catch (error: unknown) {
      const err = error as { message?: string };
      setTheme(settings.theme || 'system');
      showMessage('error', err.message || 'Failed to update theme');
    }
  };

  // Password handlers
  const handlePasswordSave = async () => {
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordForm.new_password.length < 8) {
      showMessage('error', 'Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      await changePassword(passwordForm);
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      showMessage('success', 'Password changed successfully');
    } catch (error: unknown) {
      const err = error as { message?: string };
      showMessage('error', err.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  // 2FA handlers
  const handleTwoFactorToggle = async () => {
    try {
      const result = await toggleTwoFactor({ enable: !settings.two_factor_enabled });
      setSettings({ ...settings, two_factor_enabled: result.two_factor_enabled });
      showMessage('success', result.message);
    } catch (error: unknown) {
      const err = error as { message?: string };
      showMessage('error', err.message || 'Failed to toggle 2FA');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'language', name: 'Language & Region', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Settings</h1>
        <p className="text-[var(--color-text-dim)]">Manage your account and preferences</p>
      </div>

      {/* Message toast */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar navigation */}
        <nav className="flex w-full shrink-0 flex-row gap-2 overflow-x-auto lg:w-64 lg:flex-col lg:gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-[var(--color-text-dim)] hover:bg-[var(--color-border)] hover:text-[var(--color-foreground)]'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Profile Settings</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Update your personal information</p>

              <div className="mt-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  {settings.avatar_url ? (
                    <img
                      src={settings.avatar_url}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-border)]">
                      <User className="h-10 w-10 text-[var(--color-text-dim)]" />
                    </div>
                  )}
                  <button className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]">
                    <Upload className="h-4 w-4" />
                    Change Photo
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Quartier
                    </label>
                    <input
                      type="text"
                      value={profileForm.quartier}
                      onChange={(e) => setProfileForm({ ...profileForm, quartier: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Town
                    </label>
                    <input
                      type="text"
                      value={profileForm.town}
                      onChange={(e) => setProfileForm({ ...profileForm, town: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleProfileSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Notification Preferences</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Choose how you want to be notified</p>

              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Email Notifications</p>
                    <p className="text-sm text-[var(--color-text-dim)]">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('notify_email')}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.notify_email ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.notify_email ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Push Notifications</p>
                    <p className="text-sm text-[var(--color-text-dim)]">Receive push notifications on your device</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('notify_push')}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.notify_push ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.notify_push ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">SMS Notifications</p>
                    <p className="text-sm text-[var(--color-text-dim)]">Receive important alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('notify_sms')}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.notify_sms ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.notify_sms ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">AI Alerts</p>
                    <p className="text-sm text-[var(--color-text-dim)]">Receive AI-generated insights and predictions</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('notify_ai_alerts')}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.notify_ai_alerts ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.notify_ai_alerts ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Language & Region */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Language</h2>
                <p className="text-sm text-[var(--color-text-dim)]">Set your interface language</p>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[var(--color-foreground)]">
                    Interface Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                  >
                    <option value="English">English</option>
                    <option value="French">Français</option>
                    <option value="Pigin">Cameroonian Pidgin</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleLanguageSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Language
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Region Settings</h2>
                <p className="text-sm text-[var(--color-text-dim)]">Set your timezone and currency</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value as Timezone)}
                      className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    >
                      <option value="Africa/Douala">Africa/Douala (UTC+1)</option>
                      <option value="Africa/Yaounde">Africa/Yaoundé (UTC+1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    >
                      <option value="XAF">XAF (FCFA)</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleRegionSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Region
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Change Password</h2>
                <p className="text-sm text-[var(--color-text-dim)]">Update your password regularly for security</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.new_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handlePasswordSave}
                    disabled={saving || !passwordForm.current_password || !passwordForm.new_password || !passwordForm.confirm_password}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                    Update Password
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Two-Factor Authentication</h2>
                <p className="text-sm text-[var(--color-text-dim)]">Add an extra layer of security</p>

                <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--color-background)] p-4">
                  <div className="flex items-center gap-3">
                    <Shield className={`h-5 w-5 ${settings.two_factor_enabled ? 'text-green-600' : 'text-[var(--color-text-dim)]'}`} />
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">
                        2FA is {settings.two_factor_enabled ? 'enabled' : 'disabled'}
                      </p>
                      <p className="text-sm text-[var(--color-text-dim)]">
                        {settings.two_factor_enabled
                          ? 'Your account is protected with two-factor authentication'
                          : 'Enable two-factor authentication for enhanced security'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleTwoFactorToggle}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      settings.two_factor_enabled
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {settings.two_factor_enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Appearance</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Customize the look and feel</p>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[var(--color-foreground)]">Theme</label>
                <div className="mt-3 grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === 'light'
                        ? 'border-green-500 bg-[var(--color-background)]'
                        : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-green-300'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-lg bg-white border" />
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === 'dark'
                        ? 'border-green-500 bg-[var(--color-background)]'
                        : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-green-300'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-lg bg-gray-800" />
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === 'system'
                        ? 'border-green-500 bg-[var(--color-background)]'
                        : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-green-300'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-white to-gray-800" />
                    <span className="text-sm font-medium text-[var(--color-foreground)]">System</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
