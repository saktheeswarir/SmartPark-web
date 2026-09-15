import React, { useState } from 'react';
import { ParkingSlot, ParkingAlert, OccupancyDataPoint } from '../types';
import { HOURLY_OCCUPANCY_DATA, SYSTEM_ALERTS } from '../data/mockParkingData';
import { 
  ShieldAlert, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Car, 
  Users, 
  Plus, 
  Trash2, 
  Settings, 
  TrendingUp, 
  Cpu, 
  Sparkles,
  Zap,
  Filter,
  Check
} from 'lucide-react';

interface AdminDashboardPageProps {
  slots: ParkingSlot[];
  onToggleSlotStatus: (slotId: string) => void;
  onAddSlot: (slot: Partial<ParkingSlot>) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  slots,
  onToggleSlotStatus,
  onAddSlot,
}) => {
  const [selectedZone, setSelectedZone] = useState<'ALL' | 'Zone A' | 'Zone B'>('ALL');
  const [alerts, setAlerts] = useState<ParkingAlert[]>(SYSTEM_ALERTS);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlotId, setNewSlotId] = useState('');
  const [newSlotZone, setNewSlotZone] = useState<'Zone A' | 'Zone B'>('Zone A');
  const [newSlotType, setNewSlotType] = useState<'STUDENT' | 'FACULTY' | 'EV_CHARGING' | 'ACCESSIBLE'>('STUDENT');

  // Computed metrics
  const totalSlots = slots.length;
  const availableSlots = slots.filter((s) => s.status === 'AVAILABLE').length;
  const occupiedSlots = totalSlots - availableSlots;
  const currentOccupancy = Math.round((occupiedSlots / totalSlots) * 100);

  // Peak parking time & daily usage
  const peakTime = '10:00 AM – 11:30 AM (96% Peak)';
  const dailyParkingUsage = '342 Vehicles / Day';
  const detectionAccuracy = '96.4%';

  // Filter slots for management table
  const filteredSlots = slots.filter(
    (s) => selectedZone === 'ALL' || s.zone === selectedZone
  );

  const handleDismissAlert = (alertId: string) => {
    setAlerts(alerts.filter((a) => a.id !== alertId));
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotId.trim()) return;

    onAddSlot({
      id: newSlotId.toUpperCase().trim(),
      zone: newSlotZone,
      status: 'AVAILABLE',
      type: newSlotType,
      distanceMeters: 75,
      walkingTimeMinutes: 2,
    });

    setNewSlotId('');
    setShowAddSlotModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* PAGE 5 HEADER */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Admin & Campus Security Dashboard
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Campus parking enforcement, real-time analytics, automated alert dispatch, and bay telemetry management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Security Console Synced
            </span>
          </div>
        </div>

        {/* 6 KEY METRIC CARDS REQUIRED */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          {/* Total Slots */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Slots
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">
              {totalSlots}
            </span>
            <span className="text-[10px] text-slate-500">2 Lots Calibrated</span>
          </div>

          {/* Current Occupancy */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Current Occupancy
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">
              {currentOccupancy}%
            </span>
            <span className={`text-[10px] font-semibold ${currentOccupancy > 85 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {currentOccupancy > 85 ? 'High Congestion' : 'Normal Flow'}
            </span>
          </div>

          {/* Available Slots */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Available Slots
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1 block">
              {availableSlots}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">Ready to Park</span>
          </div>

          {/* Peak Parking Time */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Peak Parking Time
            </span>
            <span className="text-sm font-bold text-slate-900 mt-1 block leading-tight">
              10:00 – 11:30 AM
            </span>
            <span className="text-[10px] text-slate-500">Before morning lectures</span>
          </div>

          {/* Daily Parking Usage */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Daily Turnout
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">
              342
            </span>
            <span className="text-[10px] text-slate-500">Vehicles Today</span>
          </div>

          {/* Detection Accuracy */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Detection Accuracy
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1 block">
              {detectionAccuracy}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">YOLOv8 Edge Model</span>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Parking Occupancy Throughout the Day */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Parking Occupancy Throughout the Day (Simulated)
              </h3>
              <p className="text-xs text-slate-500">
                Hourly trends demonstrating morning surge and afternoon departure
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Peak: 11:00 AM (96%)
            </span>
          </div>

          {/* Visual Bar Chart */}
          <div className="pt-4">
            <div className="h-56 flex items-end gap-2 sm:gap-3 px-2 border-b border-slate-200 pb-2">
              {HOURLY_OCCUPANCY_DATA.map((item) => {
                const isPeak = item.occupancyRate >= 90;
                return (
                  <div 
                    key={item.time} 
                    className="flex-1 flex flex-col items-center gap-1.5 group relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-10">
                      {item.time}: {item.occupied} cars ({item.occupancyRate}%)
                    </div>

                    <div 
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isPeak 
                          ? 'bg-rose-500 group-hover:bg-rose-600' 
                          : item.occupancyRate > 70 
                            ? 'bg-amber-500 group-hover:bg-amber-600'
                            : 'bg-emerald-500 group-hover:bg-emerald-600'
                      }`}
                      style={{ height: `${item.occupancyRate}%` }}
                    />
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono -rotate-45 sm:rotate-0 origin-top-left sm:origin-center mt-1">
                      {item.time.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                  &lt;70% Moderate
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                  70-89% High
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
                  90%+ Peak Congestion
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Campus Sensor Telemetry</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Available vs Occupied Breakdown & Live Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Available vs Occupied
            </h3>
            <p className="text-xs text-slate-500">
              Live capacity breakdown across {totalSlots} active slots
            </p>

            {/* Visual Donut / Stack Bar */}
            <div className="my-6 space-y-3">
              <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
                <div 
                  className="bg-emerald-500 rounded-l-lg transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${(availableSlots / totalSlots) * 100}%` }}
                >
                  {availableSlots > 2 && `${availableSlots}`}
                </div>
                <div 
                  className="bg-rose-500 rounded-r-lg transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${(occupiedSlots / totalSlots) * 100}%` }}
                >
                  {occupiedSlots > 2 && `${occupiedSlots}`}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
                  <span className="text-xs font-semibold text-emerald-800 block">Available</span>
                  <span className="text-2xl font-black text-emerald-600 font-mono">{availableSlots}</span>
                  <span className="text-[11px] text-emerald-700 block">
                    {Math.round((availableSlots / totalSlots) * 100)}% of total
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-center">
                  <span className="text-xs font-semibold text-rose-800 block">Occupied</span>
                  <span className="text-2xl font-black text-rose-600 font-mono">{occupiedSlots}</span>
                  <span className="text-[11px] text-rose-700 block">
                    {Math.round((occupiedSlots / totalSlots) * 100)}% of total
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Peak Usage Periods Analysis Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              Peak Usage Periods
            </span>
            <p className="text-slate-600 leading-relaxed">
              • <strong>Morning Rush:</strong> 09:15 AM – 11:30 AM (92–96% full)
            </p>
            <p className="text-slate-600 leading-relaxed">
              • <strong>Midday Shift:</strong> 01:00 PM – 02:30 PM (71–79% full)
            </p>
            <p className="text-slate-600 leading-relaxed">
              • <strong>Evening Clear:</strong> After 04:30 PM (&lt;40% full)
            </p>
          </div>
        </div>
      </div>

      {/* ALERTS SECTION */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Active Security & System Alerts ({alerts.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live AI Event Log</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                alert.type === 'critical'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[10px] uppercase font-mono shadow-2xs">
                    {alert.timestamp}
                  </span>
                  <span>{alert.title}</span>
                  {alert.slotId && (
                    <span className="px-1.5 py-0.5 rounded bg-black/10 font-mono">
                      Slot {alert.slotId}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {alert.message}
                </p>
              </div>

              <button
                onClick={() => handleDismissAlert(alert.id)}
                className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 text-xs shrink-0 transition-colors"
              >
                Acknowledge / Dismiss
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PARKING-SLOT MANAGEMENT TABLE REQUIRED */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Parking Slot Management Table
            </h3>
            <p className="text-xs text-slate-500">
              Override slot occupancy, reconfigure bay types, or add new calibrated parking boundaries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Zone Filter */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {(['ALL', 'Zone A', 'Zone B'] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedZone === z ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddSlotModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Slot</span>
            </button>
          </div>
        </div>

        {/* Table view */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Slot ID</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Vehicle Details</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSlots.map((slot) => {
                const isFree = slot.status === 'AVAILABLE';
                return (
                  <tr key={slot.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {slot.id}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {slot.zone}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {slot.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isFree ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isFree ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        {slot.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {isFree ? '— Empty —' : `${slot.vehicleType || 'Vehicle'} (since ${slot.occupiedSince || '09:00 AM'})`}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {isFree ? '—' : `${Math.round((slot.confidenceScore || 0.96) * 100)}%`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onToggleSlotStatus(slot.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors border ${
                          isFree
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {isFree ? 'Force Occupied' : 'Force Free'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">
                Calibrate & Add New Slot
              </h4>
              <button 
                onClick={() => setShowAddSlotModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Slot Identifier (e.g. A13 or B13)
                </label>
                <input
                  type="text"
                  required
                  placeholder="A13"
                  value={newSlotId}
                  onChange={(e) => setNewSlotId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Parking Zone
                </label>
                <select
                  value={newSlotZone}
                  onChange={(e) => setNewSlotZone(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="Zone A">Zone A (North Lot - Science Quad)</option>
                  <option value="Zone B">Zone B (South Lot - Library Quad)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Slot Classification
                </label>
                <select
                  value={newSlotType}
                  onChange={(e) => setNewSlotType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="STUDENT">General Student Permit</option>
                  <option value="FACULTY">Faculty / Staff Reserved</option>
                  <option value="EV_CHARGING">EV Fast Charger Bay</option>
                  <option value="ACCESSIBLE">Accessible Disabled Stall</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSlotModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Confirm & Calibrate Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
