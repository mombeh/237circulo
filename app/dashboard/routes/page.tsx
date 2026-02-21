'use client';

import { useState } from 'react';
import {
  Route,
  MapPin,
  Clock,
  Truck,
  Fuel,
  DollarSign,
  Navigation,
  Play,
  Pause,
  CheckCircle,
  ArrowRight,
  Calendar,
  Zap,
} from 'lucide-react';

const routes = [
  {
    id: 'RT-001',
    name: 'Zone Nord - Morning',
    zones: ['Nkolfoulou', 'Biyem-Assi', 'Essos'],
    status: 'Active',
    distance: '42 km',
    duration: '3h 15m',
    collections: 24,
    fuel: '12.5 L',
    efficiency: 94,
  },
  {
    id: 'RT-002',
    name: 'Zone Centre - Afternoon',
    zones: ['Mvan', 'Nlongkak', 'Bastos'],
    status: 'Scheduled',
    distance: '38 km',
    duration: '2h 45m',
    collections: 18,
    fuel: '10.2 L',
    efficiency: 89,
  },
  {
    id: 'RT-003',
    name: 'Zone Sud - Evening',
    zones: ['Oliga', 'Nkolbisson', 'Mimboman'],
    status: 'Pending',
    distance: '35 km',
    duration: '2h 30m',
    collections: 15,
    fuel: '9.8 L',
    efficiency: 92,
  },
];

const activeRoutes = [
  { id: 1, name: 'Route 1 - Douala', progress: 75, collected: 18, remaining: 6 },
  { id: 2, name: 'Route 2 - Yaoundé', progress: 45, collected: 12, remaining: 15 },
  { id: 3, name: 'Route 3 - Buea', progress: 90, collected: 22, remaining: 2 },
];

const collectors = [
  { id: 1, name: 'Paul T.', vehicle: 'Truck #12', status: 'Active', location: 'Nkolfoulou' },
  { id: 2, name: 'Marie L.', vehicle: 'Van #05', status: 'Active', location: 'Biyem-Assi' },
  { id: 3, name: 'Jean M.', vehicle: 'Truck #03', status: 'Break', location: 'Essos' },
];

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Route Optimization</h1>
          <p className="text-[var(--color-text-dim)]">AI-powered collection route planning</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]">
            <Calendar className="h-4 w-4" />
            Schedule
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <Zap className="h-4 w-4" />
            Optimize Routes
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Active Routes</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">8</p>
          <p className="text-sm text-green-500">+2 from yesterday</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Truck className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Distance Covered</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">156 km</p>
          <p className="text-sm text-green-500">+18% efficiency</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Fuel className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Fuel Saved</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">32.5 L</p>
          <p className="text-sm text-green-500">$28.50 value</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Cost Reduction</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">24%</p>
          <p className="text-sm text-green-500">vs. manual planning</p>
        </div>
      </div>

      {/* Routes list */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Planned Routes</h2>
          <p className="text-sm text-[var(--color-text-dim)]">AI-optimized collection schedules</p>
          <div className="mt-6 space-y-4">
            {routes.map((route) => (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                  selectedRoute === route.id
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-[var(--color-foreground)]">{route.name}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      route.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : route.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {route.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {route.zones.map((zone) => (
                    <span
                      key={zone}
                      className="rounded-full bg-[var(--color-border)] px-2 py-0.5 text-xs"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{route.distance}</p>
                    <p className="text-xs text-[var(--color-text-dim)]">Distance</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{route.duration}</p>
                    <p className="text-xs text-[var(--color-text-dim)]">Duration</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{route.collections}</p>
                    <p className="text-xs text-[var(--color-text-dim)]">Collections</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active routes progress */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Active Routes Progress</h2>
          <p className="text-sm text-[var(--color-text-dim)]">Real-time collection tracking</p>
          <div className="mt-6 space-y-6">
            {activeRoutes.map((route) => (
              <div key={route.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--color-foreground)]">{route.name}</span>
                  <span className="text-sm text-[var(--color-text-dim)]">
                    {route.collected}/{route.collected + route.remaining}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${route.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-dim)]">
                  <span>{route.progress}% complete</span>
                  <span>{route.remaining} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map placeholder and collectors */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Route Map</h2>
          <p className="text-sm text-[var(--color-text-dim)]">Geographic visualization</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg bg-[var(--color-background)]">
            <div className="text-center">
              <Navigation className="mx-auto h-12 w-12 text-[var(--color-text-dim)]" />
              <p className="mt-2 text-sm text-[var(--color-text-dim)]">Map visualization</p>
              <p className="text-xs text-[var(--color-text-dim)]">Coming soon</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Active Collectors</h2>
          <p className="text-sm text-[var(--color-text-dim)]">Fleet status and locations</p>
          <div className="mt-6 space-y-4">
            {collectors.map((collector) => (
              <div
                key={collector.id}
                className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{collector.name}</p>
                    <p className="text-sm text-[var(--color-text-dim)]">{collector.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      collector.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {collector.status}
                  </span>
                  <p className="mt-1 text-xs text-[var(--color-text-dim)]">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {collector.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization suggestions */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">AI Optimization Suggestions</h2>
        <p className="text-sm text-[var(--color-text-dim)]">Recommendations for improving route efficiency</p>
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <Zap className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-700 dark:text-green-400">
                Consolidate Routes in Zone Nkolfoulou
              </p>
              <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                Combining collections from Nkolfoulou and Biyem-Assi on the same day could reduce
                travel time by 23% and save approximately 8L of fuel weekly.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-700 dark:text-blue-400">
                Adjust Morning Collection Times
              </p>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-500">
                Traffic analysis suggests starting Zone Centre routes at 6:30 AM instead of 7:00 AM
                to avoid peak hour congestion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
