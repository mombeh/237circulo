'use client';

import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Globe,
  Shield,
  Palette,
  Key,
  Save,
  Upload,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'language', name: 'Language & Region', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Settings</h1>
        <p className="text-[var(--color-text-dim)]">Manage your account and preferences</p>
      </div>

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
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-border)]">
                    <User className="h-10 w-10 text-[var(--color-text-dim)]" />
                  </div>
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
                      defaultValue="Admin User"
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@237circulo.com"
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+237 6XX XXX XXX"
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Quartier
                    </label>
                    <select className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]">
                      <option>Nkolfoulou</option>
                      <option>Biyem-Assi</option>
                      <option>Essos</option>
                      <option>Mvan</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                    <Save className="h-4 w-4" />
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
                    onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.email ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.email ? 'left-6' : 'left-1'
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
                    onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.push ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.push ? 'left-6' : 'left-1'
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
                    onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.sms ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.sms ? 'left-6' : 'left-1'
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
                    onClick={() => setNotifications({ ...notifications, alerts: !notifications.alerts })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications.alerts ? 'bg-green-600' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.alerts ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Language & Region */}
          {activeTab === 'language' && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Language & Region</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Set your language and regional preferences</p>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)]">
                    Interface Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="pidgin">Cameroonian Pidgin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)]">
                    Timezone
                  </label>
                  <select className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]">
                    <option>Africa/Douala (UTC+1)</option>
                    <option>Africa/Yaoundé (UTC+1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)]">
                    Currency
                  </label>
                  <select className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]">
                    <option>XAF (FCFA)</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
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
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)]">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                    <Key className="h-4 w-4" />
                    Update Password
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Two-Factor Authentication</h2>
                <p className="text-sm text-[var(--color-text-dim)]">Add an extra layer of security</p>

                <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--color-background)] p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">2FA is disabled</p>
                      <p className="text-sm text-[var(--color-text-dim)]">
                        Enable two-factor authentication for enhanced security
                      </p>
                    </div>
                  </div>
                  <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                    Enable
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
                  <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-green-500 bg-[var(--color-background)] p-4">
                    <div className="h-12 w-12 rounded-lg bg-white" />
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-800" />
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
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
