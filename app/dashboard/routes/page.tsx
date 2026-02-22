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
  CheckCircle,
  Calendar,
  Zap,
  X,
} from 'lucide-react';

interface RouteData {
  id: string;
  name: string;
  zones: string[];
  status: string;
  distance: string;
  duration: string;
  collections: number;
  fuel: string;
  efficiency: number;
}

const zones = ['Nkolfoulou', 'Biyem-Assi', 'Essos', 'Mvan', 'Bastos', 'Akwa', 'Tonga', 'Odza'];

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  
  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState({
    routeName: '',
    selectedZones: [] as string[],
    date: '',
    time: '',
  });

  const [routes, setRoutes] = useState<RouteData[]>([
    {
      id: 'RT-001',
      name: 'Morning Route - North',
      zones: ['Nkolfoulou', 'Biyem-Assi', 'Essos'],
      status: 'Active',
      distance: '8 km',
      duration: '1h 30m',
      collections: 8,
      fuel: '2.5 L',
      efficiency: 94,
    },
    {
      id: 'RT-002',
      name: 'Afternoon Route - Centre',
      zones: ['Mvan', 'Bastos'],
      status: 'Scheduled',
      distance: '6 km',
      duration: '1h 15m',
      collections: 5,
      fuel: '1.8 L',
      efficiency: 89,
    },
    {
      id: 'RT-003',
      name: 'Evening Route - South',
      zones: ['Odza', 'Tonga'],
      status: 'Pending',
      distance: '5 km',
      duration: '1h 00m',
      collections: 4,
      fuel: '1.5 L',
      efficiency: 92,
    },
  ]);

  const [activeRoutes] = useState([
    { id: 1, name: 'Route 1 - Nkolfoulou', progress: 75, collected: 6, remaining: 2 },
    { id: 2, name: 'Route 2 - Biyem-Assi', progress: 40, collected: 4, remaining: 6 },
    { id: 3, name: 'Route 3 - Essos', progress: 60, collected: 3, remaining: 2 },
  ]);

  const [collectors] = useState([
    { id: 1, name: 'Paul T.', vehicle: 'Van #1', status: 'Active', location: 'Nkolfoulou' },
    { id: 2, name: 'Marie L.', vehicle: 'Van #2', status: 'Active', location: 'Biyem-Assi' },
    { id: 3, name: 'Jean M.', vehicle: 'Van #3', status: 'Break', location: 'Essos' },
  ]);

  const handleSchedule = () => {
    if (!scheduleForm.routeName || scheduleForm.selectedZones.length === 0 || !scheduleForm.date || !scheduleForm.time) {
      alert('Please fill in all fields');
      return;
    }

    const newRoute: RouteData = {
      id: `RT-${String(routes.length + 1).padStart(3, '0')}`,
      name: scheduleForm.routeName,
      zones: scheduleForm.selectedZones,
      status: 'Scheduled',
      distance: `${scheduleForm.selectedZones.length * 2.5} km`,
      duration: `${scheduleForm.selectedZones.length * 25} min`,
      collections: scheduleForm.selectedZones.length * 2,
      fuel: `${scheduleForm.selectedZones.length * 0.8} L`,
      efficiency: Math.floor(85 + Math.random() * 10),
    };

    setRoutes([...routes, newRoute]);
    setScheduleForm({ routeName: '', selectedZones: [], date: '', time: '' });
    setShowScheduleModal(false);
    alert('Route scheduled successfully!');
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setOptimizationComplete(false);
    
    // Simulate optimization
    setTimeout(() => {
      setRoutes(routes.map(route => ({
        ...route,
        efficiency: Math.min(99, route.efficiency + Math.floor(Math.random() * 5)),
        fuel: `${(parseFloat(route.fuel) * 0.9).toFixed(1)} L`,
        distance: `${(parseFloat(route.distance) * 0.9).toFixed(1)} km`,
      })));
      setIsOptimizing(false);
      setOptimizationComplete(true);
    }, 2000);
  };

  const toggleZoneSelection = (zone: string) => {
    setScheduleForm(prev => ({
      ...prev,
      selectedZones: prev.selectedZones.includes(zone)
        ? prev.selectedZones.filter(z => z !== zone)
        : [...prev.selectedZones, zone]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Route Optimization</h1>
          <p className="text-[var(--color-text-dim)]">AI-powered collection route planning</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
            onClick={() => setShowScheduleModal(true)}
          >
            <Calendar className="h-4 w-4" />
            Schedule
          </button>
          <button 
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            onClick={() => setShowOptimizeModal(true)}
          >
            <Zap className="h-4 w-4" />
            Optimize Routes
          </button>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Schedule New Route</h2>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 hover:bg-[var(--color-border)] rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Route Name</label>
                <input
                  type="text"
                  value={scheduleForm.routeName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, routeName: e.target.value })}
                  placeholder="e.g., Morning Route - North"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Select Zones</label>
                <div className="flex flex-wrap gap-2">
                  {zones.map((zone) => (
                    <button
                      key={zone}
                      onClick={() => toggleZoneSelection(zone)}
                      className={`rounded-full px-3 py-1 text-sm ${
                        scheduleForm.selectedZones.includes(zone)
                          ? 'bg-green-600 text-white'
                          : 'border border-[var(--color-border)] text-[var(--color-text-dim)]'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Time</label>
                  <input
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={handleSchedule}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                <Calendar className="h-4 w-4" />
                Schedule Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optimize Modal */}
      {showOptimizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">AI Route Optimization</h2>
              <button onClick={() => { setShowOptimizeModal(false); setOptimizationComplete(false); }} className="p-1 hover:bg-[var(--color-border)] rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isOptimizing ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[var(--color-foreground)]">Analyzing routes...</p>
                <p className="text-sm text-[var(--color-text-dim)] mt-2">Finding the most efficient paths</p>
              </div>
            ) : optimizationComplete ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-[var(--color-foreground)]">Optimization Complete!</p>
                <p className="text-sm text-[var(--color-text-dim)] mt-2">
                  Routes optimized for better efficiency. Fuel consumption reduced by ~10%.
                </p>
                <button
                  onClick={() => { setShowOptimizeModal(false); setOptimizationComplete(false); }}
                  className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">AI Optimization Benefits</h3>
                  <ul className="text-sm text-green-600 dark:text-green-500 space-y-1">
                    <li>• Reduced fuel consumption</li>
                    <li>• Optimized route paths</li>
                    <li>• Better time management</li>
                    <li>• Lower operational costs</li>
                  </ul>
                </div>
                <p className="text-sm text-[var(--color-text-dim)]">
                  Click below to let AI analyze your current routes and optimize them for maximum efficiency.
                </p>
                <button
                  onClick={handleOptimize}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  <Zap className="h-4 w-4" />
                  Start Optimization
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Active Routes</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">{routes.length}</p>
          <p className="text-sm text-green-500">+1 from yesterday</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Truck className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Distance Covered</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">19 km</p>
          <p className="text-sm text-green-500">+12% efficiency</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Fuel className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Fuel Saved</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">5.8 L</p>
          <p className="text-sm text-green-500">$5.20 value</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Cost Reduction</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">18%</p>
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
