'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-card)] text-[var(--color-foreground)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[var(--color-foreground)]">237Circulo</h1>
                <p className="text-xs text-[var(--color-text-dim)]">Waste AI</p>
              </div>
            </Link>
            <p className="text-[var(--color-text-dim)] text-sm leading-relaxed mb-6">
              Transforming waste into value through AI-powered circular economy solutions in Cameroon and beyond.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-green-primary/20 hover:bg-green-primary flex items-center justify-center transition">
                <span className="text-green-primary hover:text-white">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-primary/20 hover:bg-green-primary flex items-center justify-center transition">
                <span className="text-green-primary hover:text-white">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-primary/20 hover:bg-green-primary flex items-center justify-center transition">
                <span className="text-green-primary hover:text-white">in</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-syne font-bold text-[var(--color-foreground)] mb-6 uppercase tracking-wide">Product</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  ListWaste
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-syne font-bold text-[var(--color-foreground)] mb-6 uppercase tracking-wide">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Impact Report
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-syne font-bold text-[var(--color-foreground)] mb-6 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--color-text-dim)] hover:text-green-primary transition text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--color-text-dim)] text-sm">
          <p>&copy; {currentYear} 237CirculoAI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-green-primary transition">
              Status
            </Link>
            <Link href="#" className="hover:text-green-primary transition">
              API Docs
            </Link>
            <Link href="#" className="hover:text-green-primary transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
