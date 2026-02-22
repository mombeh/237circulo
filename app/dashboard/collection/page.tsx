'use client';

import { useState, useMemo } from 'react';
import {
  Trash2,
  Calendar,
  Download,
  MapPin,
  Clock,
  Truck,
  TrendingUp,
  BarChart3,
  Filter,
} from 'lucide-react';

interface CollectionRecord {
  id: string;
  zone: string;
  type: string;
  amount: string;
  date: string;
  status: string;
}

const zones = [
  { id: 1, name: 'Nkolfoulou', collections: 12, total: '45 kg', efficiency: 94 },
  { id: 2, name: 'Biyem-Assi', collections: 9, total: '32 kg', efficiency: 89 },
  { id: 3, name: 'Essos', collections: 8, total: '28 kg', efficiency: 91 },
  { id: 4, name: 'Mvan', collections: 6, total: '18 kg', efficiency: 87 },
  { id: 5, name: 'Bastos', collections: 4, total: '12 kg', efficiency: 92 },
  { id: 6, name: 'Akwa', collections: 5, total: '15 kg', efficiency: 95 },
];

// Data for different time periods
const periodData: Record<string, { 
  weeklyData: Array<{day: string; organic: number; recyclable: number; hazardous: number; general: number}>;
  history: CollectionRecord[];
  stats: { total: number; collections: number; time: number; efficiency: number };
}> = {
  '7days': {
    weeklyData: [
      { day: 'Mon', organic: 8, recyclable: 5, hazardous: 1, general: 3 },
      { day: 'Tue', organic: 10, recyclable: 6, hazardous: 0, general: 2 },
      { day: 'Wed', organic: 12, recyclable: 7, hazardous: 1, general: 4 },
      { day: 'Thu', organic: 9, recyclable: 5, hazardous: 1, general: 3 },
      { day: 'Fri', organic: 11, recyclable: 8, hazardous: 1, general: 5 },
      { day: 'Sat', organic: 8, recyclable: 6, hazardous: 0, general: 2 },
      { day: 'Sun', organic: 5, recyclable: 3, hazardous: 0, general: 2 },
    ],
    history: [
      { id: 'COL-001', zone: 'Nkolfoulou', type: 'General', amount: '12 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-002', zone: 'Biyem-Assi', type: 'Organic', amount: '15 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-003', zone: 'Essos', type: 'Recyclable', amount: '8 kg', date: '2026-02-21', status: 'Completed' },
      { id: 'COL-004', zone: 'Mvan', type: 'General', amount: '6 kg', date: '2026-02-21', status: 'Pending' },
      { id: 'COL-005', zone: 'Bastos', type: 'E-waste', amount: '3 kg', date: '2026-02-20', status: 'Completed' },
      { id: 'COL-006', zone: 'Akwa', type: 'Organic', amount: '10 kg', date: '2026-02-19', status: 'Completed' },
      { id: 'COL-007', zone: 'Nkolfoulou', type: 'Recyclable', amount: '7 kg', date: '2026-02-18', status: 'Completed' },
    ],
    stats: { total: 127, collections: 44, time: 38, efficiency: 91.2 },
  },
  '30days': {
    weeklyData: [
      { day: 'Week 1', organic: 58, recyclable: 40, hazardous: 5, general: 22 },
      { day: 'Week 2', organic: 65, recyclable: 45, hazardous: 6, general: 25 },
      { day: 'Week 3', organic: 52, recyclable: 38, hazardous: 4, general: 20 },
      { day: 'Week 4', organic: 48, recyclable: 35, hazardous: 5, general: 18 },
    ],
    history: [
      { id: 'COL-001', zone: 'Nkolfoulou', type: 'General', amount: '12 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-002', zone: 'Biyem-Assi', type: 'Organic', amount: '15 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-008', zone: 'Biyem-Assi', type: 'General', amount: '5 kg', date: '2026-02-15', status: 'Completed' },
      { id: 'COL-009', zone: 'Essos', type: 'Hazardous', amount: '2 kg', date: '2026-02-10', status: 'Completed' },
      { id: 'COL-010', zone: 'Mvan', type: 'Organic', amount: '9 kg', date: '2026-02-05', status: 'Completed' },
      { id: 'COL-011', zone: 'Bastos', type: 'Recyclable', amount: '4 kg', date: '2026-01-28', status: 'Completed' },
      { id: 'COL-012', zone: 'Akwa', type: 'General', amount: '8 kg', date: '2026-01-20', status: 'Completed' },
      { id: 'COL-013', zone: 'Nkolfoulou', type: 'Organic', amount: '14 kg', date: '2026-01-15', status: 'Completed' },
      { id: 'COL-014', zone: 'Essos', type: 'Recyclable', amount: '11 kg', date: '2026-01-10', status: 'Completed' },
      { id: 'COL-015', zone: 'Biyem-Assi', type: 'E-waste', amount: '6 kg', date: '2026-01-05', status: 'Completed' },
    ],
    stats: { total: 485, collections: 156, time: 42, efficiency: 88.5 },
  },
  '90days': {
    weeklyData: [
      { day: 'Jan', organic: 180, recyclable: 130, hazardous: 18, general: 75 },
      { day: 'Feb', organic: 165, recyclable: 120, hazardous: 15, general: 68 },
      { day: 'Mar', organic: 195, recyclable: 145, hazardous: 20, general: 82 },
    ],
    history: [
      { id: 'COL-001', zone: 'Nkolfoulou', type: 'General', amount: '12 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-002', zone: 'Biyem-Assi', type: 'Organic', amount: '15 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-008', zone: 'Biyem-Assi', type: 'General', amount: '5 kg', date: '2026-02-15', status: 'Completed' },
      { id: 'COL-009', zone: 'Essos', type: 'Hazardous', amount: '2 kg', date: '2026-02-10', status: 'Completed' },
      { id: 'COL-010', zone: 'Mvan', type: 'Organic', amount: '9 kg', date: '2026-02-05', status: 'Completed' },
      { id: 'COL-011', zone: 'Bastos', type: 'Recyclable', amount: '4 kg', date: '2026-01-28', status: 'Completed' },
      { id: 'COL-012', zone: 'Akwa', type: 'General', amount: '8 kg', date: '2026-01-20', status: 'Completed' },
      { id: 'COL-013', zone: 'Nkolfoulou', type: 'Organic', amount: '14 kg', date: '2026-01-15', status: 'Completed' },
      { id: 'COL-014', zone: 'Essos', type: 'Recyclable', amount: '11 kg', date: '2026-01-10', status: 'Completed' },
      { id: 'COL-015', zone: 'Biyem-Assi', type: 'E-waste', amount: '6 kg', date: '2026-01-05', status: 'Completed' },
      { id: 'COL-016', zone: 'Mvan', type: 'General', amount: '7 kg', date: '2025-12-28', status: 'Completed' },
      { id: 'COL-017', zone: 'Bastos', type: 'Organic', amount: '12 kg', date: '2025-12-20', status: 'Completed' },
      { id: 'COL-018', zone: 'Akwa', type: 'Recyclable', amount: '9 kg', date: '2025-12-15', status: 'Completed' },
      { id: 'COL-019', zone: 'Nkolfoulou', type: 'Hazardous', amount: '3 kg', date: '2025-12-10', status: 'Completed' },
      { id: 'COL-020', zone: 'Essos', type: 'General', amount: '10 kg', date: '2025-12-05', status: 'Completed' },
    ],
    stats: { total: 1245, collections: 412, time: 45, efficiency: 85.2 },
  },
  'year': {
    weeklyData: [
      { day: 'Q1', organic: 680, recyclable: 490, hazardous: 65, general: 290 },
      { day: 'Q2', organic: 720, recyclable: 520, hazardous: 70, general: 310 },
      { day: 'Q3', organic: 650, recyclable: 480, hazardous: 58, general: 275 },
      { day: 'Q4', organic: 710, recyclable: 510, hazardous: 62, general: 295 },
    ],
    history: [
      { id: 'COL-001', zone: 'Nkolfoulou', type: 'General', amount: '12 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-002', zone: 'Biyem-Assi', type: 'Organic', amount: '15 kg', date: '2026-02-22', status: 'Completed' },
      { id: 'COL-008', zone: 'Biyem-Assi', type: 'General', amount: '5 kg', date: '2026-02-15', status: 'Completed' },
      { id: 'COL-009', zone: 'Essos', type: 'Hazardous', amount: '2 kg', date: '2026-02-10', status: 'Completed' },
      { id: 'COL-010', zone: 'Mvan', type: 'Organic', amount: '9 kg', date: '2026-02-05', status: 'Completed' },
      { id: 'COL-011', zone: 'Bastos', type: 'Recyclable', amount: '4 kg', date: '2026-01-28', status: 'Completed' },
      { id: 'COL-012', zone: 'Akwa', type: 'General', amount: '8 kg', date: '2026-01-20', status: 'Completed' },
      { id: 'COL-013', zone: 'Nkolfoulou', type: 'Organic', amount: '14 kg', date: '2026-01-15', status: 'Completed' },
      { id: 'COL-014', zone: 'Essos', type: 'Recyclable', amount: '11 kg', date: '2026-01-10', status: 'Completed' },
      { id: 'COL-015', zone: 'Biyem-Assi', type: 'E-waste', amount: '6 kg', date: '2026-01-05', status: 'Completed' },
      { id: 'COL-016', zone: 'Mvan', type: 'General', amount: '7 kg', date: '2025-12-28', status: 'Completed' },
      { id: 'COL-017', zone: 'Bastos', type: 'Organic', amount: '12 kg', date: '2025-12-20', status: 'Completed' },
      { id: 'COL-018', zone: 'Akwa', type: 'Recyclable', amount: '9 kg', date: '2025-12-15', status: 'Completed' },
      { id: 'COL-019', zone: 'Nkolfoulou', type: 'Hazardous', amount: '3 kg', date: '2025-12-10', status: 'Completed' },
      { id: 'COL-020', zone: 'Essos', type: 'General', amount: '10 kg', date: '2025-12-05', status: 'Completed' },
      { id: 'COL-021', zone: 'Biyem-Assi', type: 'Organic', amount: '18 kg', date: '2025-11-28', status: 'Completed' },
      { id: 'COL-022', zone: 'Mvan', type: 'Recyclable', amount: '14 kg', date: '2025-11-20', status: 'Completed' },
      { id: 'COL-023', zone: 'Bastos', type: 'General', amount: '8 kg', date: '2025-11-15', status: 'Completed' },
      { id: 'COL-024', zone: 'Akwa', type: 'E-waste', amount: '5 kg', date: '2025-11-10', status: 'Completed' },
      { id: 'COL-025', zone: 'Nkolfoulou', type: 'Organic', amount: '20 kg', date: '2025-11-05', status: 'Completed' },
    ],
    stats: { total: 4250, collections: 1450, time: 52, efficiency: 82.1 },
  },
};

export default function CollectionPage() {
  const [dateRange, setDateRange] = useState('7days');
  
  const currentData = useMemo(() => periodData[dateRange], [dateRange]);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Waste Collection</h1>
          <p className="text-[var(--color-text-dim)]">Track and analyze waste collection data</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[var(--color-text-dim)]" />
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      {/* Stats - These change based on date range */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Trash2 className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Total Collected</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">{currentData.stats.total} kg</p>
          <p className="text-sm text-green-500">+15.3% from yesterday</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Collections</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">{currentData.stats.collections}</p>
          <p className="text-sm text-green-500">+8.7% from yesterday</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Avg. Collection Time</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">{currentData.stats.time} min</p>
          <p className="text-sm text-green-500">-5 min from yesterday</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Efficiency Rate</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">{currentData.stats.efficiency}%</p>
          <p className="text-sm text-green-500">+3.1% from yesterday</p>
        </div>
      </div>

      {/* Weekly chart - Changes based on date range */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Collection Overview</h2>
            <p className="text-sm text-[var(--color-text-dim)]">Waste collected by period (kg)</p>
          </div>
          <BarChart3 className="h-5 w-5 text-[var(--color-text-dim)]" />
        </div>
        <div className="mt-6 flex items-end justify-between gap-2">
          {currentData.weeklyData.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div className="flex w-full items-end gap-1">
                <div
                  className="flex-1 rounded bg-green-500"
                  style={{ height: `${(day.organic / 250) * 100}%` }}
                  title={`Organic: ${day.organic}kg`}
                />
                <div
                  className="flex-1 rounded bg-blue-500"
                  style={{ height: `${(day.recyclable / 250) * 100}%` }}
                  title={`Recyclable: ${day.recyclable}kg`}
                />
                <div
                  className="flex-1 rounded bg-red-500"
                  style={{ height: `${(day.hazardous / 250) * 100}%` }}
                  title={`Hazardous: ${day.hazardous}kg`}
                />
                <div
                  className="flex-1 rounded bg-gray-400"
                  style={{ height: `${(day.general / 250) * 100}%` }}
                  title={`General: ${day.general}kg`}
                />
              </div>
              <span className="text-xs text-[var(--color-text-dim)]">{day.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span className="text-[var(--color-text-dim)]">Organic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-blue-500" />
            <span className="text-[var(--color-text-dim)]">Recyclable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span className="text-[var(--color-text-dim)]">Hazardous</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-gray-400" />
            <span className="text-[var(--color-text-dim)]">General</span>
          </div>
        </div>
      </div>

      {/* Zone breakdown - Updates based on date range */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Zone Breakdown</h2>
        <p className="text-sm text-[var(--color-text-dim)]">Performance by collection zone</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Zone</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Collections</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Total Weight</th>
                <th className="pb-3 text-left text-sm font-medium text-[var(--color-text-dim)]">Efficiency</th>
                <th className="pb-3 text-right text-sm font-medium text-[var(--color-text-dim)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id} className="border-b border-[var(--color-border)]">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[var(--color-text-dim)]" />
                      <span className="font-medium text-[var(--color-foreground)]">{zone.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-[var(--color-foreground)]">{zone.collections}</td>
                  <td className="py-4 text-[var(--color-foreground)]">{zone.total}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-[var(--color-border)]">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${zone.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm text-[var(--color-foreground)]">{zone.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-sm text-green-600 hover:text-green-700" onClick={() => window.location.href = '/dashboard/insights'}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection History - Updates based on date range */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Collection History</h2>
        <p className="text-sm text-[var(--color-text-dim)]">Recent collection records</p>
        <div className="mt-6 space-y-3">
          {currentData.history.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between rounded-lg bg-[var(--color-background)] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-border)]">
                  <Truck className="h-5 w-5 text-[var(--color-text-dim)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">{record.id}</p>
                  <p className="text-sm text-[var(--color-text-dim)]">
                    {record.zone} • {record.type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-[var(--color-foreground)]">{record.amount}</p>
                <p className="text-sm text-[var(--color-text-dim)]">{record.date}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  record.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
