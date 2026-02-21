'use client'

import Link from 'next/link'

export function ImpactCTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-primary to-green-600 rounded-3xl overflow-hidden">
          <div className="relative py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-16 text-center">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Join the Circular Economy Revolution
              </h2>

              <p className="text-lg text-green-50 max-w-2xl mx-auto mb-10 leading-relaxed">
                Be part of a community-driven movement transforming waste into value. Every action counts towards a cleaner, greener planet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth"
                  className="px-8 py-4 rounded-full bg-white text-green-primary font-bold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Start Making Impact →
                </Link>
                <button className="px-8 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-12 border-t border-white/30 flex flex-col sm:flex-row justify-center items-center gap-8 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2.5M kg</div>
                  <div className="text-sm opacity-90">Waste Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500K kg</div>
                  <div className="text-sm opacity-90">CO2 Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
