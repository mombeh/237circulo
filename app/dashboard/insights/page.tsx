'use client';

import { useState } from 'react';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
  Zap,
  Calendar,
  ChevronRight,
  RefreshCw,
  Activity,
} from 'lucide-react';

const predictions = [
  {
    id: 1,
    type: 'overflow',
    zone: 'Nkolfoulou',
    probability: 67,
    timeframe: '2 hours',
    recommendation: 'Schedule immediate collection',
  },
  {
    id: 2,
    type: 'volume',
    zone: 'Biyem-Assi',
    probability: 53,
    timeframe: '4 hours',
    recommendation: 'Prepare additional capacity',
  },
  {
    id: 3,
    type: 'equipment',
    zone: 'Truck #2',
    probability: 45,
    timeframe: '24 hours',
    recommendation: 'Schedule preventive maintenance',
  },
];

const aiMetrics = [
  { name: 'Prediction Accuracy', value: '82.4%', trend: '+2.1%', icon: Target },
  { name: 'Models Active', value: '4', trend: '+1', icon: Brain },
  { name: 'Data Processed', value: '120 MB', trend: '+15%', icon: Activity },
  { name: 'Insights Generated', value: '24', trend: '+8', icon: Lightbulb },
];

const insights = [
  {
    category: 'Optimization',
    title: 'Route Efficiency Improvement',
    description: 'AI analysis suggests consolidating Zone Nkolfoulou and Biyem-Assi collections on the same day, potentially reducing fuel costs by 15%.',
    impact: 'High',
    impactColor: 'text-green-500',
  },
  {
    category: 'Prediction',
    title: 'Daily Waste Increase',
    description: 'Historical data indicates a 20% increase in organic waste expected during the weekend.',
    impact: 'Medium',
    impactColor: 'text-yellow-500',
  },
  {
    category: 'Maintenance',
    title: 'Equipment Check',
    description: 'Truck #2 shows patterns that suggest a minor issue. Recommend inspection within 3 days.',
    impact: 'Medium',
    impactColor: 'text-yellow-500',
  },
  {
    category: 'Recycling',
    title: 'Recycling Opportunity',
    description: 'Analysis shows Biyem-Assi has 28% higher recyclable content than average. Consider targeted collection.',
    impact: 'Medium',
    impactColor: 'text-yellow-500',
  },
];

const modelPerformance = [
  { name: 'Overflow Detection', accuracy: 86, latency: '120ms', status: 'Active' },
  { name: 'Volume Prediction', accuracy: 82, latency: '250ms', status: 'Active' },
  { name: 'Route Optimization', accuracy: 79, latency: '1.2s', status: 'Active' },
  { name: 'Maintenance Prediction', accuracy: 75, latency: '450ms', status: 'Training' },
  { name: 'Anomaly Detection', accuracy: 84, latency: '80ms', status: 'Active' },
];

export default function InsightsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">AI Insights</h1>
          <p className="text-[var(--color-text-dim)]">Machine learning predictions and analytics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <Brain className="h-4 w-4" />
            Train Models
          </button>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiMetrics.map((metric) => (
          <div
            key={metric.name}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <metric.icon className="h-5 w-5 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-4 w-4" />
                {metric.trend}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-[var(--color-foreground)]">{metric.value}</p>
            <p className="text-sm text-[var(--color-text-dim)]">{metric.name}</p>
          </div>
        ))}
      </div>

      {/* Active Predictions */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Active Predictions</h2>
            <p className="text-sm text-[var(--color-text-dim)]">Real-time AI-generated alerts</p>
          </div>
          <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700" onClick={() => window.location.href = '/dashboard/ai-assistance'}>
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--color-foreground)]">{prediction.zone}</span>
                    <span className="rounded-full bg-[var(--color-border)] px-2 py-0.5 text-xs capitalize">
                      {prediction.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-dim)]">{prediction.recommendation}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-medium text-[var(--color-foreground)]">{prediction.probability}%</p>
                  <p className="text-xs text-[var(--color-text-dim)]">Probability</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-[var(--color-foreground)]">{prediction.timeframe}</p>
                  <p className="text-xs text-[var(--color-text-dim)]">Timeframe</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">AI-Generated Insights</h2>
            <p className="text-sm text-[var(--color-text-dim)]">Actionable recommendations from ML models</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                    {insight.category}
                  </span>
                </div>
                <span className={`text-sm font-medium ${insight.impactColor}`}>{insight.impact} Impact</span>
              </div>
              <h3 className="mt-3 font-medium text-[var(--color-foreground)]">{insight.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-dim)]">{insight.description}</p>
              <button className="mt-3 text-sm text-green-600 hover:text-green-700" onClick={() => window.location.href = '/dashboard/ai-assistance'}>
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Model Performance */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Model Performance</h2>
            <p className="text-sm text-[var(--color-text-dim)]">AI model accuracy and latency metrics</p>
          </div>
          <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700" onClick={() => window.location.href = '/dashboard/ai-assistance'}>
            Manage Models <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Model</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Accuracy</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Latency</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {modelPerformance.map((model, index) => (
                <tr key={index} className="border-b border-[var(--color-border)]">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-[var(--color-foreground)]">{model.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-[var(--color-border)]">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                      <span className="text-sm text-[var(--color-foreground)]">{model.accuracy}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-[var(--color-foreground)]">{model.latency}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        model.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Predictions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Scheduled Predictions</h2>
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-dim)]">Upcoming AI-generated forecasts</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-3">
              <div>
                <p className="font-medium text-[var(--color-foreground)]">Weekly Volume Forecast</p>
                <p className="text-sm text-[var(--color-text-dim)]">Tomorrow, 6:00 AM</p>
              </div>
              <Zap className="h-5 w-5 text-[var(--color-text-dim)]" />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-3">
              <div>
                <p className="font-medium text-[var(--color-foreground)]">Route Optimization</p>
                <p className="text-sm text-[var(--color-text-dim)]">Daily, 5:00 AM</p>
              </div>
              <Zap className="h-5 w-5 text-[var(--color-text-dim)]" />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-3">
              <div>
                <p className="font-medium text-[var(--color-foreground)]">Maintenance Alert</p>
                <p className="text-sm text-[var(--color-text-dim)]">Every Monday</p>
              </div>
              <Zap className="h-5 w-5 text-[var(--color-text-dim)]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Quick Tips</h2>
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-dim)]">AI-powered optimization suggestions</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="font-medium text-green-700 dark:text-green-400">
                Consider adjusting collection times
              </p>
              <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                Traffic patterns suggest 10-15% efficiency gain by starting Zone 1 collections at 7 AM instead of 6 AM.
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="font-medium text-blue-700 dark:text-blue-400">Recycling goal on track</p>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-500">
                Current trends indicate you'll exceed Q1 recycling targets by 8%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
