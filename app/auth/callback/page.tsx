'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const userData = searchParams.get('user')
    const email = searchParams.get('email')
    const name = searchParams.get('name')

    if (token) {
      // Store token
      localStorage.setItem('token', token)

      // Build user object from available data
      let user = null
      
      if (userData) {
        try {
          // Try to parse as JSON
          user = JSON.parse(userData)
        } catch {
          // If not JSON, treat as name
          user = { name: userData, email: email || '' }
        }
      } else if (email || name) {
        // Use individual parameters if available
        user = { 
          name: name || 'Google User', 
          email: email || '' 
        }
      } else {
        // Default user data
        user = {
          name: 'Google User',
          email: '',
          avatar: ''
        }
      }

      localStorage.setItem('user', JSON.stringify(user))

      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--color-foreground)]">Authenticating...</p>
        <p className="text-sm text-[var(--color-text-dim)] mt-2">Please wait while we verify your account</p>
      </div>
    </div>
  )
}