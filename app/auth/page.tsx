'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    // Update this to your NestJS backend URL
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.')
        setLoading(false)
        return
      }

      setLoading(false)
      router.push('/dashboard')
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)] hover:text-green-primary transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back</span>
        <span
          className="ml-1 inline-block w-2 h-2 rounded-full bg-green-primary animate-pulse"
          aria-hidden
        />
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

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-8 rounded-2xl shadow-xl relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl z-50">
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-medium">Signing in...</p>
              </div>
            </div>
          )}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-syne text-2xl text-[var(--color-foreground)] font-bold mb-2">
              Welcome back
            </h1>
            <p className="text-[var(--color-text-dim)] text-sm mb-8">
              Sign in to your account to continue.
            </p>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-dim)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                    className="w-full bg-white border border-[var(--color-border)] 
             rounded-xl px-4 py-3 outline-none 
             text-[var(--color-foreground)] placeholder:text-[var(--color-text-dim)]
             focus:ring-2 focus:ring-green-primary/20 
             focus:border-green-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-dim)]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[var(--color-border)] 
             rounded-xl px-4 py-3 outline-none 
             text-[var(--color-foreground)] placeholder:text-[var(--color-text-dim)]
             focus:ring-2 focus:ring-green-primary/20 
             focus:border-green-primary transition-all"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-primary hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--color-border)]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[var(--color-card)] px-2 text-[var(--color-text-dim)]">
                    Or continue with Google
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-all shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-[var(--color-text-dim)]">
              <span>Don't have an account? </span>
              <Link
                href="/auth/signup"
                className="font-bold text-green-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] text-[var(--color-text-dim)] uppercase tracking-widest">
          Secure Connection
        </p>
      </div>
    </div>
  )
}
