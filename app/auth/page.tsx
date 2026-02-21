'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setIsSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-green-primary transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back</span>
        <span className="ml-1 inline-block w-2 h-2 rounded-full bg-green-primary animate-pulse" aria-hidden />
      </Link>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-primary/10 dark:bg-green-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="font-syne text-2xl font-extrabold tracking-tighter"
          >
            <span className="text-green-primary">237</span>CIRCULO
            <span className="text-green-primary">AI</span>
          </Link>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow-xl">
          {!isSent ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="font-syne text-2xl text-gray-700 font-bold mb-2">
                Welcome back
              </h1>
              <p className="text-[var(--text-dim)] text-sm mb-8">
                Enter your email to receive a secure login link.
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-dim)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[var(--background)] border border-[var(--border)] 
             rounded-xl px-4 py-3 outline-none 
             text-black placeholder:text-gray-400
             focus:ring-2 focus:ring-green-primary/20 
             focus:border-green-primary transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-primary hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Link'}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/10 text-green-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                📬
              </div>
              <h2 className="font-syne text-2xl font-bold mb-2">
                Check your inbox
              </h2>
              <p className="text-[var(--text-dim)] text-sm mb-8">
                We sent a login link to <br />
                <span className="text-[var(--foreground)] font-medium">
                  {email}
                </span>
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs font-bold uppercase tracking-widest text-green-primary hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          No password required • Secure Connection
        </p>
      </div>
    </div>
  )
}
