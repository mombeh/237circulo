'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Trash2,
  Brain,
  Route,
  Settings,
  Menu,
  Leaf,
  Bell,
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
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      // No token found, redirect to login
      router.push('/auth');
      return;
    }
    
    // Parse user data if available
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        // If user data is invalid, use default
        setUser(null);
      }
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    router.push('/auth');
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-foreground)]">Loading...</p>
          <p className="text-sm text-[var(--color-text-dim)] mt-2">Verifying your session</p>
        </div>
      </div>
    );
  }

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
          {/* Logo - links to landing page */}
          <div className="flex h-16 items-center gap-2 border-b border-[var(--color-border)] px-6">
            <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 hover:bg-green-700 transition-colors">
              <Leaf className="h-6 w-6 text-white" />
            </Link>
            <Link href="/" className="flex-1">
              <h1 className="text-lg font-bold text-[var(--color-foreground)] hover:text-green-primary transition-colors">237Circulo</h1>
              <p className="text-xs text-[var(--color-text-dim)]">Waste AI</p>
            </Link>
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
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                  <span className="text-sm font-bold text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-foreground)] truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-[var(--color-text-dim)] truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors text-red-500 hover:text-red-600"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
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
