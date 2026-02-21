'use client';

import {
  Trash2,
  Recycle,
  Truck,
  TrendingUp,
  TrendingDown,
  Zap,
  Droplets,
  Leaf,
  AlertTriangle,
  Coins,
  Award,
  Users,
  Package,
  Clock,
  ArrowRight,
} from 'lucide-react';

const stats = [
  {
    name: 'Total Waste Collected',
    value: '2,847',
    unit: 'kg',
    change: '+12.5%',
    changeType: 'positive',
    icon: Trash2,
    color: 'bg-blue-500',
  },
  {
    name: 'Green Points Earned',
    value: '12,450',
    unit: 'pts',
    change: '+850',
    changeType: 'positive',
    icon: Coins,
    color: 'bg-yellow-500',
  },
  {
    name: 'Active Collectors',
    value: '24',
    unit: 'collectors',
    change: '+2',
    changeType: 'positive',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    name: 'AI Predictions',
    value: '94.2',
    unit: '% accuracy',
    change: '-1.3%',
    changeType: 'negative',
    icon: Zap,
    color: 'bg-orange-500',
  },
];

const recentListings = [
  { zone: 'Nkolfoulou', waste: '15kg Plastics', price: 'FCFA 2,500', status: 'Available', time: '2 hours ago' },
  { zone: 'Biyem-Assi', waste: '8kg E-waste', price: 'FCFA 5,200', status: 'Matched', time: '1 hour ago' },
  { zone: 'Essos', waste: '25kg Organic', price: 'FCFA 1,000', status: 'Available', time: '3 hours ago' },
  { zone: 'Mvan', waste: '12kg Metals', price: 'FCFA 3,800', status: 'Collected', time: '4 hours ago' },
  { zone: 'Bastos', waste: '5kg Glass', price: 'FCFA 1,200', status: 'Available', time: '5 hours ago' },
];

const wasteTypes = [
  { type: 'Plastics', percentage: 32, color: 'bg-blue-500', icon: Package },
  { type: 'Organic', percentage: 28, color: 'bg-green-500', icon: Leaf },
  { type: 'Metals', percentage: 18, color: 'bg-gray-500', icon: Recycle },
  { type: 'E-waste', percentage: 12, color: 'bg-purple-500', icon: Zap },
  { type: 'Glass', percentage: 10, color: 'bg-cyan-500', icon: Trash2 },
];

const impactMetrics = [
  { label: 'Waste Diverted', value: '2.8 tonnes', icon: Trash2, color: 'text-blue-500' },
  { label: 'Economic Value', value: 'FCFA 1.2M', icon: Coins, color: 'text-yellow-500' },
  { label: 'CO₂ Saved', value: '4.2 tonnes', icon: Leaf, color: 'text-green-500' },
  { label: 'Water Saved', value: '12,500 L', icon: Droplets, color: 'text-cyan-500' },
];

const leaderboard = [
  { rank: 1, quartier: 'Nkolfoulou', points: 15420, collections: 245 },
  { rank: 2, quartier: 'Biyem-Assi', points: 12850, collections: 198 },
  { rank: 3, quartier: 'Essos', points: 11200, collections: 167 },
  { rank: 4, quartier: 'Mvan', points: 9800, collections: 142 },
  { rank: 5, quartier: 'Bastos', points: 8450, collections: 118 },
];

const alerts = [
  { type: 'warning', message: 'New listing match found in Nkolfoulou - 15kg plastics', time: '10 min ago' },
  { type: 'success', message: 'You earned 150 green points!', time: '1 hour ago' },
  { type: 'info', message: 'Price update: E-waste demand increased by 15%', time: '3 hours ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Welcome back!</h1>
          <p className="text-[var(--color-text-dim)]">Monitor your circular economy activity</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="font-bold text-[var(--color-foreground)]">12,450</span>
          <span className="text-sm text-[var(--color-text-dim)]">Green Points</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-[var(--color-foreground)]">
                {stat.value}
                <span className="ml-1 text-sm font-normal text-[var(--color-text-dim)]">
                  {stat.unit}
                </span>
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-dim)]">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Impact metrics */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Your Impact</h2>
            <p className="text-sm text-[var(--color-text-dim)]">Environmental and economic contribution</p>
          </div>
          <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700">
            View Details <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg bg-[var(--color-background)] p-4"
            >
              <div className="flex items-center gap-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <span className="text-sm text-[var(--color-text-dim)]">{metric.label}</span>
              </div>
              <p className="mt-2 text-xl font-bold text-[var(--color-foreground)]">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Waste types & Listings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Waste breakdown */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Waste Types Collected</h2>
          <p className="text-sm text-[var(--color-text-dim)]">Distribution by category</p>
          <div className="mt-6 space-y-4">
            {wasteTypes.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-[var(--color-foreground)]">{item.type}</span>
                  </div>
                  <span className="font-medium text-[var(--color-foreground)]">
                    {item.percentage}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent listings */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Recent Listings</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Marketplace activity</p>
            </div>
            <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {recentListings.map((listing) => (
              <div
                key={listing.zone}
                className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-3"
              >
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">{listing.zone}</p>
                  <p className="text-sm text-[var(--color-text-dim)]">{listing.waste}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{listing.price}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      listing.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : listing.status === 'Matched'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard & Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Quartier Leaderboard</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Top recycling communities</p>
            </div>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="mt-6 space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.rank}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  item.rank <= 3 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-[var(--color-background)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      item.rank === 1
                        ? 'bg-yellow-500 text-white'
                        : item.rank === 2
                          ? 'bg-gray-400 text-white'
                          : item.rank === 3
                            ? 'bg-orange-400 text-white'
                            : 'bg-[var(--color-border)] text-[var(--color-text-dim)]'
                    }`}
                  >
                    {item.rank}
                  </span>
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{item.quartier}</p>
                    <p className="text-xs text-[var(--color-text-dim)]">{item.collections} collections</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--color-foreground)]">{item.points.toLocaleString()}</p>
                  <p className="text-xs text-[var(--color-text-dim)]">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Activity Feed</h2>
              <p className="text-sm text-[var(--color-text-dim)]">Latest updates and notifications</p>
            </div>
            <Clock className="h-5 w-5 text-[var(--color-text-dim)]" />
          </div>
          <div className="mt-6 space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-[var(--color-background)] p-3"
              >
                {alert.type === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                {alert.type === 'success' && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                )}
                {alert.type === 'info' && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <span className="text-xs font-bold text-white">i</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-foreground)]">{alert.message}</p>
                  <p className="text-xs text-[var(--color-text-dim)]">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
