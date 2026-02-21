'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Trash2,
  Brain,
  Route,
  Settings,
  Menu,
  Leaf,
  Bell,
  User,
  LogOut,
  ShoppingBag,
  MessageSquare,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Waste Collection', href: '/dashboard/collection', icon: Trash2 },
  { name: 'AI Insights', href: '/dashboard/insights', icon: Brain },
  { name: 'Route Optimization', href: '/dashboard/routes', icon: Route },
  { name: 'Marketplace', href: '/dashboard/marketplace', icon: ShoppingBag },
  { name: 'AI Assistant', href: '/dashboard/ai-assistance', icon: MessageSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--color-card)] border-r border-[var(--color-border)] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-[var(--color-border)] px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--color-foreground)]">237Circulo</h1>
              <p className="text-xs text-[var(--color-text-dim)]">Waste AI</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-[var(--color-text-dim)] hover:bg-[var(--color-border)] hover:text-[var(--color-foreground)]'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-[var(--color-border)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-border)]">
                <User className="h-5 w-5 text-[var(--color-text-dim)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-foreground)] truncate">
                  Admin User
                </p>
                <p className="text-xs text-[var(--color-text-dim)] truncate">
                  admin@237circulo.com
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">
                <LogOut className="h-4 w-4 text-[var(--color-text-dim)]" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">
              <Bell className="h-5 w-5 text-[var(--color-text-dim)]" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
