'use client';

import { useState } from 'react';
import {
  Trash2,
  Calendar,
  Filter,
  Download,
  MapPin,
  Clock,
  Truck,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

const zones = [
  { id: 1, name: 'Douala 1', collections: 156, total: '45.2 tons', efficiency: 94 },
  { id: 2, name: 'Douala 2', collections: 142, total: '38.7 tons', efficiency: 89 },
  { id: 3, name: 'Douala 3', collections: 189, total: '52.1 tons', efficiency: 91 },
  { id: 4, name: 'Douala 4', collections: 134, total: '35.4 tons', efficiency: 87 },
  { id: 5, name: 'Bonamousadi', collections: 98, total: '28.9 tons', efficiency: 92 },
  { id: 6, name: 'Akwa', collections: 167, total: '41.3 tons', efficiency: 95 },
];

const weeklyData = [
  { day: 'Mon', organic: 12, recyclable: 8, hazardous: 2, general: 6 },
  { day: 'Tue', organic: 15, recyclable: 10, hazardous: 1, general: 5 },
  { day: 'Wed', organic: 18, recyclable: 12, hazardous: 3, general: 7 },
  { day: 'Thu', organic: 14, recyclable: 9, hazardous: 2, general: 6 },
  { day: 'Fri', organic: 20, recyclable: 14, hazardous: 2, general: 8 },
  { day: 'Sat', organic: 16, recyclable: 11, hazardous: 1, general: 5 },
  { day: 'Sun', organic: 10, recyclable: 6, hazardous: 1, general: 4 },
];

const collectionHistory = [
  { id: 'COL-001', zone: 'Douala 1', type: 'General', amount: '3.2 tons', date: '2024-01-15', status: 'Completed' },
  { id: 'COL-002', zone: 'Douala 3', type: 'Organic', amount: '4.1 tons', date: '2024-01-15', status: 'Completed' },
  { id: 'COL-003', zone: 'Akwa', type: 'Recyclable', amount: '2.8 tons', date: '2024-01-14', status: 'Completed' },
  { id: 'COL-004', zone: 'Bonamousadi', type: 'General', amount: '2.5 tons', date: '2024-01-14', status: 'Pending' },
  { id: 'COL-005', zone: 'Douala 2', type: 'Hazardous', amount: '0.8 tons', date: '2024-01-13', status: 'Completed' },
];

export default function CollectionPage() {
  const [dateRange, setDateRange] = useState('7days');

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
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Trash2 className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Total Collected</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">241.6 tons</p>
          <p className="text-sm text-green-500">+15.3% from last month</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Collections</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">886</p>
          <p className="text-sm text-green-500">+8.7% from last month</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Avg. Collection Time</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">42 min</p>
          <p className="text-sm text-green-500">-5 min from last month</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm text-[var(--color-text-dim)]">Efficiency Rate</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-foreground)]">91.2%</p>
          <p className="text-sm text-green-500">+3.1% from last month</p>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Weekly Collection</h2>
            <p className="text-sm text-[var(--color-text-dim)]">Waste collected by day (tons)</p>
          </div>
          <BarChart3 className="h-5 w-5 text-[var(--color-text-dim)]" />
        </div>
        <div className="mt-6 flex items-end justify-between gap-2">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div className="flex w-full items-end gap-1">
                <div
                  className="flex-1 rounded bg-green-500"
                  style={{ height: `${(day.organic / 20) * 100}%` }}
                  title={`Organic: ${day.organic}t`}
                />
                <div
                  className="flex-1 rounded bg-blue-500"
                  style={{ height: `${(day.recyclable / 20) * 100}%` }}
                  title={`Recyclable: ${day.recyclable}t`}
                />
                <div
                  className="flex-1 rounded bg-red-500"
                  style={{ height: `${(day.hazardous / 20) * 100}%` }}
                  title={`Hazardous: ${day.hazardous}t`}
                />
                <div
                  className="flex-1 rounded bg-gray-400"
                  style={{ height: `${(day.general / 20) * 100}%` }}
                  title={`General: ${day.general}t`}
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

      {/* Zone breakdown */}
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
                    <button className="text-sm text-green-600 hover:text-green-700">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent history */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Collection History</h2>
        <p className="text-sm text-[var(--color-text-dim)]">Recent collection records</p>
        <div className="mt-6 space-y-3">
          {collectionHistory.map((record) => (
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
