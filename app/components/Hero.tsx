'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      {/* Gradient background blur effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-primary/10 dark:bg-green-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main content */}
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <h1 className="font-syne text-black text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6">
          Turn your waste into
          <br />
          <span className="text-green-primary">value</span> for the planet.
        </h1>

        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Transform waste management in cameroon. Connect generators, collectors, and recylers through AI-powered circular economy
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth"
            className="px-8 py-4 rounded-full bg-green-primary text-white font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30"
          >
            Get Started Free →
          </Link>
          <button className="px-8 py-4 rounded-full border-2 border-gray-500 font-bold hover:bg-[var(--card)] transition-all text-gray-700">
            View Impact Data
          </button>
        </div>
      </div>
    </section>
  )
}
