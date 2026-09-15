import React from 'react';
import { PageId, ParkingSlot } from '../types';
import { 
  Car, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  Compass, 
  ChevronRight,
  Zap,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  slots: ParkingSlot[];
  onNavigate: (page: PageId) => void;
  onSelectSlot: (slot: ParkingSlot) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  slots,
  onNavigate,
  onSelectSlot,
}) => {
  const totalSlots = slots.length;
  const availableSlots = slots.filter((s) => s.status === 'AVAILABLE').length;
  const occupiedSlots = totalSlots - availableSlots;
  const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100);

  // Take a preview slice of slots
  const previewSlots = slots.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/40 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Smart Campus Mobility • Computer Vision Prototype</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Created by SAKTHEESWARI R</span>
              </div>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Find Your Parking Spot <br className="hidden sm:inline" />
              <span className="text-emerald-600">Before You Arrive</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              AI-powered real-time parking detection for smarter and faster college parking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                id="hero-view-live-btn"
                onClick={() => onNavigate('live')}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 flex items-center gap-2.5 transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span>View Live Parking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={() => onNavigate('how-it-works')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100/90 active:scale-98 text-slate-700 font-semibold text-base border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all"
              >
                <span>How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 3 Core Statistics Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Stat 1: Available Slots */}
            <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Available Slots
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-emerald-600 font-mono">
                  {availableSlots}
                </span>
                <span className="text-slate-500 text-sm font-medium">bays ready</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Live open stalls detected in North & South student lots
              </p>
            </div>

            {/* Stat 2: Total Slots */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Total Slots Monitored
                </span>
                <Car className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                  {totalSlots}
                </span>
                <span className="text-slate-500 text-sm font-medium">calibrated</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Single CCTV camera covering both Zone A & Zone B
              </p>
            </div>

            {/* Stat 3: Occupancy Rate */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Occupancy Rate
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  occupancyRate > 85 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {occupancyRate > 85 ? 'High Rush' : 'Moderate'}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                  {occupancyRate}%
                </span>
                <span className="text-slate-500 text-sm font-medium">full</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    occupancyRate > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Illustration / Mockup of College Parking Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Lot Camera Model
                </span>
                <span className="text-xs text-slate-400">Campus North Lot — Quad 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Simulated College Parking Area Visualizer
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Real-time spatial projection: Green indicates available stalls, red represents AI-identified parked vehicles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span className="text-slate-200">AVAILABLE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                <span className="text-slate-200">OCCUPIED</span>
              </div>
              <button
                id="illustration-goto-dashboard"
                onClick={() => onNavigate('live')}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Full Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Parking Lot Schematic Graphic */}
          <div className="relative bg-slate-950/80 rounded-2xl p-6 border border-slate-800">
            {/* Campus Roadway Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-2">
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> North Academic Boulevard (Main Entrance)
              </span>
              <span className="text-slate-500 font-mono">Speed Limit 10 MPH • CCTV Pole #04</span>
            </div>

            {/* Parking bays preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {previewSlots.map((slot) => {
                const isFree = slot.status === 'AVAILABLE';
                return (
                  <div
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    className={`relative p-3.5 rounded-xl border transition-all cursor-pointer select-none text-center flex flex-col items-center justify-between min-h-[110px] ${
                      isFree
                        ? 'bg-emerald-950/40 border-emerald-500/60 hover:border-emerald-400 hover:bg-emerald-900/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/60 hover:border-rose-400 hover:bg-rose-900/40 text-rose-300'
                    }`}
                  >
                    {/* Top slot number */}
                    <div className="w-full flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold">{slot.id}</span>
                      {slot.type === 'EV_CHARGING' && <Zap className="w-3 h-3 text-amber-400" />}
                    </div>

                    {/* Center Icon */}
                    <div className="my-1.5">
                      {isFree ? (
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                          <Car className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Status text */}
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${
                      isFree ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isFree ? 'FREE' : 'TAKEN'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Central Drive Lane Marking */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                AI Homography Mapping Calibrated
              </span>
              <span className="text-slate-400 font-mono">Click any slot to test simulated navigation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Persona Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for the Entire Campus Community
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Tailored interfaces solving morning traffic bottlenecks for every campus stakeholder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Students */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">College Students</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check live stall status before arriving at campus. Eliminate driving in circles and arrive on time for 9:00 AM lectures.
            </p>
          </div>

          {/* Card 2: Faculty */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Faculty & Staff</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reserved faculty bay verification and quick navigation to buildings without searching across multiple lots.
            </p>
          </div>

          {/* Card 3: Security */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Campus Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time alerts for overtime vehicles, illegally parked cars in EV/disabled spots, and suspicious lot occupancy.
            </p>
          </div>

          {/* Card 4: Parking Administrators */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Parking Admins</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Historical usage data, peak utilization heatmaps, and capacity planning without buying $300 ground sensors.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Jump Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-600/20">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              C29 Capstone Presentation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Ready to see the real-time AI detection in action?
            </h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Inspect the YOLOv8 object detection simulator, parking ROI polygon classification, and admin metrics console.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('detection')}
              className="px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow-md transition-all"
            >
              Explore AI Detection
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold border border-emerald-500/60 transition-all"
            >
              Admin Console
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
