'use client'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Snap a Photo',
      description: 'Take a picture of your waste and upload on our web platform.',
    },
    {
      number: '02',
      title: 'AI Classifies',
      description: 'Our AI instantly identifies and categorizes your waste type and condition.',
    },
    {
      number: '03',
      title: 'Earn Points',
      description: 'You receive points and rewards for proper waste classification and recycling.',
    },
    {
      number: '04',
      title: 'Schedule Pickup',
      description: 'Connect with certified collectors and schedule convenient waste pickups.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[var(--card)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-syne text-4xl sm:text-5xl font-extrabold text-black mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in 4 simple steps and start making a difference today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[calc(100%-60px)] h-1 bg-gradient-to-r from-green-primary/50 to-transparent" />
              )}

              <div className="relative z-10">
                <div className="font-syne text-5xl font-bold text-green-primary mb-4 opacity-20">
                  {step.number}
                </div>
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-green-primary flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="font-syne text-xl font-bold text-black mb-3 pt-8">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
