'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf } from 'lucide-react'

/* ✅ Move this OUTSIDE Header */
function NavLinks() {
  return (
    <>
      <Link href="/dashboard" className="text-sm font-medium text-[var(--color-text-dim)] hover:text-green-primary transition">
        Dashboard
      </Link>
    </>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-background)] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-foreground)]">237Circulo</h1>
            <p className="text-xs text-[var(--color-text-dim)]">Waste AI</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-md text-[var(--color-text-dim)] hover:bg-[var(--color-card)] hover:text-green-primary transition"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Sign Up (desktop only) */}
          <Link
            href="/auth/signup"
            className="hidden sm:inline-flex px-6 py-2 rounded-full border border-green-primary text-green-primary font-bold text-sm hover:bg-green-50 transition-all"
          >
            Sign Up
          </Link>

          {/* Sign In */}
          <Link
            href="/auth"
            className="hidden sm:inline-flex px-6 py-2 rounded-full bg-green-primary text-white font-bold text-sm hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden bg-[var(--color-card)] border-t border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              <NavLinks />
              <Link
                href="/auth/signup"
                className="mt-2 inline-block px-4 py-3 rounded-lg border border-green-primary text-green-primary font-bold text-center"
              >
                Sign Up
              </Link>
              <Link
                href="/auth"
                className="mt-2 inline-block px-4 py-3 rounded-lg bg-green-primary text-white font-bold text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}