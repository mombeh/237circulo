'use client'

import { 
  Search,
  Wallet,
  Smartphone,
  BarChart3,
  Truck,
  Trophy
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Search,
      title: 'Smart Classification',
      description: 'Instantly identify and classify waste types using advanced image recognition technology.',
    },
    {
      icon: Wallet,
      title: 'Earn Rewards',
      description: 'Get paid for each waste item you properly classify and recycle with our rewards system.',
    },
    {
      icon: Smartphone,
      title: 'Easy to Use',
      description: 'Simple interface designed for everyone. Just snap, classify, and get rewarded.',
    },
    {
      icon: BarChart3,
      title: 'Track Impact',
      description: 'Monitor your environmental impact in real-time with detailed analytics and insights.',
    },
    {
      icon: Truck,
      title: 'Connect Collectors',
      description: 'Directly reach certified waste collectors and schedule pickups at your convenience.',
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Join the leaderboard, compete with your community, and win exclusive prizes.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-syne text-4xl sm:text-5xl font-extrabold text-black mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform makes waste management easy, rewarding, and impactful for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all"
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-green-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-syne text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}