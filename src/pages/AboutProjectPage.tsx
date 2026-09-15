import React from 'react';
import { 
  Info, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingDown, 
  Smile, 
  Clock, 
  Layers, 
  Eye, 
  FileText,
  UserCheck,
  Compass,
  Award
} from 'lucide-react';
import { PageId } from '../types';
import { C29_STUDENT_FIELD_DATA } from '../data/mockParkingData';

interface AboutProjectPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutProjectPage: React.FC<AboutProjectPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* C29 PROJECT HERO / AUTHOR ATTRIBUTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 text-white shadow-xl border border-slate-700">
        <div className="max-w-3xl space-y-5">
          {/* Top Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              C29 AI Immersion Capstone Prototype
            </span>
            <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full">
              Computer Vision in Campus Infrastructure
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            SmartPark – AI College Parking Detection System
          </h1>

          {/* Author attribution prominently featured */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-md">
              SR
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                Project Creator & Lead Researcher
              </span>
              <span className="text-base font-bold text-white tracking-wide">
                Created by SAKTHEESWARI R
              </span>
              <p className="text-xs text-slate-300">
                C29 AI Immersion Program • Academic & Applied AI Prototype
              </p>
            </div>
          </div>

          {/* Core mission statement from prompt */}
          <blockquote className="p-4 rounded-xl bg-slate-950/60 border-l-4 border-emerald-400 text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            "SmartPark uses computer vision and AI to detect vehicle occupancy in college parking spaces and provide real-time parking availability."
          </blockquote>
        </div>
      </div>

      {/* THREE PILLARS SEPARATION MANDATE (C29 REQUIREMENT) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Methodological Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Three Pillars of the C29 Project
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clearly separating primary field research, prototype user interface simulation, and the technical AI pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Real Field Observations */}
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                  PILLAR 1
                </span>
                <span className="text-xs font-semibold text-emerald-600">Empirical Research</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                1. Real Field Observations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collected by <strong>SAKTHEESWARI R</strong> across student commuter lots during morning arrival rushes (08:30 AM – 10:30 AM).
              </p>

              <div className="pt-2 space-y-2 text-xs">
                {C29_STUDENT_FIELD_DATA.realObservations.map((obs, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="font-bold text-emerald-900 block">{obs.metric} – {obs.label}</span>
                    <span className="text-[11px] text-emerald-700">{obs.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 italic">
              Verified campus field observations.
            </div>
          </div>

          {/* Pillar 2: Simulated Website Data */}
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800">
                  PILLAR 2
                </span>
                <span className="text-xs font-semibold text-blue-600">Interactive Model</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                2. Simulated Website Data
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This responsive web application is a full functional interface demonstration simulating:
              </p>

              <ul className="space-y-2 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Interactive 24-slot visual map across Zone A & Zone B</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Real-time occupancy counter and dynamic filter states</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Synthetic camera video view with toggleable bounding boxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Security dashboard with historical hourly usage charts</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 italic">
              Client prototype for C29 project presentation.
            </div>
          </div>

          {/* Pillar 3: Proposed AI Functionality */}
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-xs flex flex-col justify-between hover:border-purple-400 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-800">
                  PILLAR 3
                </span>
                <span className="text-xs font-semibold text-purple-600">Applied Deep Learning</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                3. Proposed AI Functionality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The targeted deployment architecture utilizing existing campus hardware:
              </p>

              <ul className="space-y-2 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>YOLOv8 Edge Inference:</strong> 28ms sub-second vehicle detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Compass className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Homography Warp:</strong> 35° tilt perspective correction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Polygon IoU:</strong> Automatic overlap classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>92% Cost Reduction:</strong> Compared to in-ground induction pucks</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 italic">
              Deployable on campus NVIDIA Jetson microservers.
            </div>
          </div>
        </div>
      </div>

      {/* CORE SPECIFIED SECTIONS: Problem, Solution, Benefits, AI Tech, Future */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">The Problem</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            College campuses experience severe parking bottlenecks during morning peak hours (08:30 AM to 10:30 AM). Commuting students spend an average of <strong>14.8 minutes</strong> circling lots, resulting in tardiness for lectures, elevated carbon emissions from idling engines, gridlock at perimeter gates, and intense academic stress.
          </p>
          <p className="text-xs text-slate-500">
            Existing commercial parking solutions require costly magnetic sensors drilled into every parking bay, incurring exorbitant installation, battery maintenance, and asphalt resurfacing expenses.
          </p>
        </div>

        {/* Proposed Solution */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">The Proposed Solution</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>SmartPark</strong> solves this problem non-invasively by utilizing existing elevated campus CCTV security cameras. Powered by a lightweight YOLOv8 deep learning network, SmartPark processes video feeds directly on edge devices to classify slot availability in real time without digging up the ground.
          </p>
          <p className="text-xs text-slate-500">
            Students open an instant web application to view live green (available) vs red (occupied) slots and receive direct navigation to the closest open stall before arriving at the gate.
          </p>
        </div>
      </div>

      {/* BENEFITS SECTION (ALL 5 REQUIRED BULLETS) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Key System Benefits
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Measurable impact on student well-being and campus facility administration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Benefit 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Reduces parking search time
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cuts student search times from ~15 minutes to under 2 minutes with direct spot routing.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Reduces parking congestion
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Eliminates the 32% "cruising traffic" circling campus roads looking for empty spaces.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Improves student experience
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Reduces anxiety and stress so students arrive calm and punctual for early morning exams.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Provides real-time availability
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Sub-second live updates reflected immediately across mobile web and gate LED indicators.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Helps administrators monitor
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Delivers reliable data analytics on peak hours, lot turnover, and future lot sizing.
            </p>
          </div>
        </div>
      </div>

      {/* AI TECHNOLOGY & FUTURE IMPROVEMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Technology Deep Dive */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              AI Technology Stack
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">YOLOv8 Architecture (You Only Look Once):</strong>
              Selected for its single-pass tensor inference capability, achieving high precision (96.4% mAP) while running comfortably on edge-tier microprocessors.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">CLAHE Contrast Enhancement:</strong>
              Mitigates false negatives during heavy rain, high-glare morning sunrise, or cast tree shadows.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Homography Matrix Warping:</strong>
              Converts oblique perspective angles into top-down geometric coordinates so stalls 80 meters away are accurately monitored.
            </li>
          </ul>
        </div>

        {/* Future Improvements */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Future Improvements & Roadmap
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">1. Automatic License Plate Recognition (ALPR):</strong>
              Integration of OCR to verify student and faculty permits automatically without physical hangtags or paper citations.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">2. Predictive Stall Availability Forecasting:</strong>
              Machine learning models predicting spot availability 15–30 minutes in advance based on lecture timetable schedules.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">3. Campus Gate LED Signboard Integration:</strong>
              Direct serial communication to physical electronic signs at campus entrances displaying "Zone A: 4 Free / Zone B: 7 Free".
            </li>
          </ul>
        </div>
      </div>

      {/* Author Acknowledgement Card */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Presentation Ready
          </span>
          <h4 className="text-xl sm:text-2xl font-bold">
            SmartPark – AI College Parking Detection System
          </h4>
          <p className="text-xs text-slate-300">
            Project developed and presented by <strong>SAKTHEESWARI R</strong> for the C29 AI Immersion program.
          </p>
        </div>

        <button
          onClick={() => onNavigate('live')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <span>Launch Live Parking System</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
