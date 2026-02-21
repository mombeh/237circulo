'use client'

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { QuickStats } from './components/QuickStats'
import { Features } from './components/Features'
import { SmartRecycling } from './components/SmartRecycling'
import { HowItWorks } from './components/HowItWorks'
import { ImpactCTA } from './components/ImpactCTA'
import { Footer } from './components/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <QuickStats />
      </div>
      <Features />
      <SmartRecycling />
      <HowItWorks />
      <ImpactCTA />
      <Footer />
    </main>
  )
}