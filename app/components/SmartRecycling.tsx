'use client'

import Image from 'next/image'

export function SmartRecycling() {
  const features = [
    'Instant AI waste classification',
    'Track your personal environmental footprints',
    'Compete on the leaderboard for rewards',
    'Connect directly with local collectors',
  ]

  return (
    <section className="bg-[var(--color-card)] border-t border-[var(--color-border)] py-16 sm:py-24 lg:py-32 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/trash1.jpg"
              alt="Colorful recycling bins"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold">
              Photo with details
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="font-syne text-4xl sm:text-5xl font-extrabold mb-6 text-[var(--color-foreground)]">
              Smart Recycling for Smart Cities
            </h2>

            <p className="text-[var(--color-foreground)] text-lg mb-8 leading-relaxed">
              Our platform connects households with certified collectors. Simply snap a photo, let our AI classify it, and schedule a pickup.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-primary" />
                  </div>
                  <span className="text-[var(--color-foreground)] font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="px-8 py-4 rounded-full bg-green-primary text-white font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30">
              View with details
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
