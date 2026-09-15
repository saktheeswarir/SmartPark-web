import React, { useState } from 'react';
import { ParkingSlot, SlotStatus } from '../types';
import { 
  Car, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  Compass, 
  Search, 
  Zap, 
  Footprints, 
  Clock, 
  Layers, 
  Navigation,
  Accessibility,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface LiveParkingPageProps {
  slots: ParkingSlot[];
  onSelectSlot: (slot: ParkingSlot) => void;
  onRefreshSlots: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

export const LiveParkingPage: React.FC<LiveParkingPageProps> = ({
  slots,
  onSelectSlot,
  onRefreshSlots,
  isRefreshing,
  lastUpdated,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'OCCUPIED'>('ALL');
  const [zoneFilter, setZoneFilter] = useState<'ALL' | 'Zone A' | 'Zone B'>('ALL');
  const [nearestSlotId, setNearestSlotId] = useState<string | null>(null);

  // Stats
  const totalSlots = slots.length;
  const availableSlots = slots.filter((s) => s.status === 'AVAILABLE').length;
  const occupiedSlots = totalSlots - availableSlots;
  const occupancyPercentage = Math.round((occupiedSlots / totalSlots) * 100);

  // Filter slots
  const filteredSlots = slots.filter((slot) => {
    // Search
    const matchesSearch = 
      slot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.zone.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = 
      statusFilter === 'ALL' || slot.status === statusFilter;

    // Zone filter
    const matchesZone = 
      zoneFilter === 'ALL' || slot.zone === zoneFilter;

    return matchesSearch && matchesStatus && matchesZone;
  });

  // Nearest available slot logic
  const handleFindNearestSlot = () => {
    const available = slots.filter((s) => s.status === 'AVAILABLE');
    if (available.length === 0) return;

    // Sort by shortest distance
    const sorted = [...available].sort((a, b) => a.distanceMeters - b.distanceMeters);
    const nearest = sorted[0];
    setNearestSlotId(nearest.id);
    onSelectSlot(nearest);

    // Scroll to the slot
    const element = document.getElementById(`slot-card-${nearest.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* PAGE 2 TOP SECTION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Live Parking Availability
              </h1>
              {/* Green indicator: "AI System Online" */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>AI System Online</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Last updated: <strong className="text-slate-700 font-mono">{lastUpdated}</strong></span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 text-xs">Simulated live feed sampling 1 frame / 2.5s</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="find-nearest-btn"
              onClick={handleFindNearestSlot}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-semibold shadow-sm shadow-emerald-600/25 flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Find Nearest Available Slot</span>
            </button>

            <button
              id="refresh-availability-btn"
              onClick={onRefreshSlots}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-98 text-slate-700 text-sm font-medium border border-slate-200 shadow-2xs flex items-center gap-2 transition-all disabled:opacity-60"
            >
              <RotateCw className={`w-4 h-4 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Scanning...' : 'Refresh Availability'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          {/* Total Slots */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Total Slots
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {totalSlots}
              </span>
              <span className="text-xs text-slate-500">calibrated</span>
            </div>
          </div>

          {/* Available Slots */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
              Available Slots
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                {availableSlots}
              </span>
              <span className="text-xs text-emerald-700 font-medium">ready to park</span>
            </div>
          </div>

          {/* Occupied Slots */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
              Occupied Slots
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600 font-mono">
                {occupiedSlots}
              </span>
              <span className="text-xs text-rose-700 font-medium">taken</span>
            </div>
          </div>

          {/* Occupancy Percentage */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Occupancy Percentage
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {occupancyPercentage}%
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                occupancyPercentage > 85 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {occupancyPercentage > 85 ? 'High' : 'Normal'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="slot-search-input"
            type="text"
            placeholder="Search slot (e.g., A05, EV, Faculty)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filters */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              id="filter-all-btn"
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalSlots})
            </button>
            <button
              id="filter-available-btn"
              onClick={() => setStatusFilter('AVAILABLE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'AVAILABLE'
                  ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Available ({availableSlots})
            </button>
            <button
              id="filter-occupied-btn"
              onClick={() => setStatusFilter('OCCUPIED')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'OCCUPIED'
                  ? 'bg-rose-600 text-white shadow-2xs font-semibold'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Occupied ({occupiedSlots})
            </button>
          </div>

          {/* Zone Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            {(['ALL', 'Zone A', 'Zone B'] as const).map((zone) => (
              <button
                key={zone}
                onClick={() => setZoneFilter(zone)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  zoneFilter === zone
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {zone === 'ALL' ? 'Both Lots' : zone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VISUAL PARKING MAP LAYOUT */}
      <div className="space-y-8">
        {/* Zone A Section */}
        {(zoneFilter === 'ALL' || zoneFilter === 'Zone A') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Zone A – North Lot (Science & Engineering Quad)
                  </h3>
                  <p className="text-xs text-slate-500">
                    45–95 meters from Main Academic Hall • Camera 01 (Overhead Pole)
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {slots.filter(s => s.zone === 'Zone A' && s.status === 'AVAILABLE').length} Available
              </span>
            </div>

            {/* Parking Grid for Zone A (12 slots) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredSlots
                .filter((s) => s.zone === 'Zone A')
                .map((slot) => renderSlotCard(slot))}
            </div>

            {/* Aisle Marking */}
            <div className="mt-6 py-2 px-4 rounded-lg bg-slate-100 border border-slate-200/80 text-center text-xs text-slate-500 font-mono flex items-center justify-between">
              <span>← ENTRANCE (GATE 1)</span>
              <span className="font-semibold text-slate-700">CENTRAL DRIVE AISLE • ONE WAY ➔</span>
              <span>EXIT TO ACADEMIC BLVD →</span>
            </div>
          </div>
        )}

        {/* Zone B Section */}
        {(zoneFilter === 'ALL' || zoneFilter === 'Zone B') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Zone B – South Lot (Library & Student Union)
                  </h3>
                  <p className="text-xs text-slate-500">
                    100–165 meters from Library Quad • Camera 02 (Building Rooftop)
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {slots.filter(s => s.zone === 'Zone B' && s.status === 'AVAILABLE').length} Available
              </span>
            </div>

            {/* Parking Grid for Zone B (12 slots) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredSlots
                .filter((s) => s.zone === 'Zone B')
                .map((slot) => renderSlotCard(slot))}
            </div>

            {/* Aisle Marking */}
            <div className="mt-6 py-2 px-4 rounded-lg bg-slate-100 border border-slate-200/80 text-center text-xs text-slate-500 font-mono flex items-center justify-between">
              <span>← ENTRANCE (GATE 2)</span>
              <span className="font-semibold text-slate-700">SOUTH LOT ACCESS AISLE • ONE WAY ➔</span>
              <span>LIBRARY PATHWAY →</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Instructions */}
      <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-600" />
            <span>Green = AVAILABLE</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-3.5 h-3.5 rounded bg-rose-500 border border-rose-600" />
            <span>Red = OCCUPIED</span>
          </div>
          <div className="flex items-center gap-1 text-amber-600 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>EV Charging Bay</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <Accessibility className="w-3.5 h-3.5" />
            <span>Accessible Bay</span>
          </div>
        </div>
        <p className="text-slate-500 text-center md:text-right">
          💡 Click any parking bay card to view immediate navigation route and reservation details.
        </p>
      </div>
    </div>
  );

  // Reusable slot card renderer
  function renderSlotCard(slot: ParkingSlot) {
    const isAvailable = slot.status === 'AVAILABLE';
    const isNearest = nearestSlotId === slot.id;

    return (
      <div
        key={slot.id}
        id={`slot-card-${slot.id}`}
        onClick={() => onSelectSlot(slot)}
        className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between min-h-[140px] shadow-2xs hover:shadow-md ${
          isAvailable
            ? 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100/60'
            : 'bg-rose-50/60 border-rose-300 hover:border-rose-500 hover:bg-rose-100/60'
        } ${isNearest ? 'ring-4 ring-emerald-400 ring-offset-2 scale-[1.02]' : ''}`}
      >
        {/* Top bar: Slot ID and Type Badges */}
        <div className="flex items-start justify-between">
          <span className="font-mono font-black text-lg tracking-tight text-slate-900">
            {slot.id}
          </span>
          <div className="flex items-center gap-1">
            {slot.type === 'EV_CHARGING' && (
              <span className="p-1 rounded-md bg-amber-100 text-amber-800" title="Electric Vehicle Charging">
                <Zap className="w-3 h-3" />
              </span>
            )}
            {slot.type === 'ACCESSIBLE' && (
              <span className="p-1 rounded-md bg-blue-100 text-blue-800" title="Accessible Permit Only">
                <Accessibility className="w-3 h-3" />
              </span>
            )}
            {slot.type === 'FACULTY' && (
              <span className="p-1 rounded-md bg-purple-100 text-purple-800" title="Faculty/Staff Permit">
                <Briefcase className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Center: Vehicle Icon or Empty Parking Icon */}
        <div className="my-2 flex flex-col items-center justify-center">
          {isAvailable ? (
            <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-xs group-hover:scale-110 transition-transform">
              <Car className="w-7 h-7" />
            </div>
          )}
        </div>

        {/* Bottom: Status pill and walking distance */}
        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
          <span className={`font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
            isAvailable ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            {isAvailable ? 'AVAILABLE' : 'OCCUPIED'}
          </span>
          <span className="text-slate-500 font-medium flex items-center gap-0.5">
            <Footprints className="w-3 h-3 text-slate-400" />
            {slot.distanceMeters}m
          </span>
        </div>
      </div>
    );
  }
};
