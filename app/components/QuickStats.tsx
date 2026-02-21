'use client'

import { Recycle, Leaf, Clock } from 'lucide-react'

export function QuickStats() {
  const stats = [
    {
      icon: Recycle,
      value: '1.2M+',
      label: 'Waste Classified',
    },
    {
      icon: Leaf,
      value: 'CO2E',
      label: 'Emissions Saved',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'AI Monitoring',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-sm p-8 text-center hover:shadow-xl transition-all"
            >
              <div className="mb-4 flex justify-center">
                <Icon className="w-8 h-8 text-green-primary" strokeWidth={1.5} />
              </div>

              <div className="font-syne text-3xl font-bold text-[var(--card)] mb-2">
                {stat.value}
              </div>

              <div className="text-[var(--color-text-dim)] text-sm font-medium">
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}