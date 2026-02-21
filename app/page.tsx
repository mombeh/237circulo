import Link from 'next/link';
import { Leaf, ArrowRight, Trash2, Brain, Coins, Route } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-foreground)]">237Circulo</h1>
            <p className="text-xs text-[var(--color-text-dim)]">Waste-to-Value AI</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/auth"
            className="px-4 py-2 rounded-lg bg-green-600 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              🌍 Cameroon's Circular Economy Platform
            </span>
            <h1 className="font-syne text-4xl lg:text-6xl font-extrabold text-[var(--color-foreground)] mb-6">
              Turn Waste into
              <span className="text-green-600"> Value</span>
            </h1>
            <p className="text-lg text-[var(--color-text-dim)] max-w-2xl mx-auto mb-8">
              CirculoAI connects waste generators, collectors, and recyclers through an AI-powered 
              marketplace. Earn green points, track your impact, and contribute to a cleaner Cameroon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-foreground)] font-medium hover:bg-[var(--color-border)] transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">AI Classification</h3>
              <p className="text-sm text-[var(--color-text-dim)]">
                Smart waste identification with GPT-4 Vision
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 mb-4">
                <Coins className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">Earn Points</h3>
              <p className="text-sm text-[var(--color-text-dim)]">
                Get green points for verified recycling activities
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 mb-4">
                <Route className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">Smart Routes</h3>
              <p className="text-sm text-[var(--color-text-dim)]">
                AI-optimized collection routes for collectors
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 mb-4">
                <Trash2 className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">Marketplace</h3>
              <p className="text-sm text-[var(--color-text-dim)]">
                Buy and sell waste materials directly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 lg:px-12 border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-dim)]">
            © 2026 CirculoAI. Built for Cameroon Waste Management Hackathon.
          </p>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-dim)]">
            <span>Powered by Next.js + NestJS + OpenAI</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
