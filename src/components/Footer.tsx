import React from 'react';
import { PageId } from '../types';
import { Car, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Smart<span className="text-emerald-400">Park</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/50">
                C29 Prototype
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              AI-powered real-time parking detection system for college campuses.
              Designed to help students, faculty, and campus security eliminate parking
              congestion using non-intrusive YOLO computer vision.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No Ground Magnetic Sensors Needed
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                YOLOv8 Edge Inference
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              System Pages
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  id="footer-nav-landing"
                  onClick={() => onNavigate('landing')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Landing Page
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-live"
                  onClick={() => onNavigate('live')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Live Parking Dashboard
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-detection"
                  onClick={() => onNavigate('detection')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  AI Detection (Simulated Preview)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-how-it-works"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works (Pipeline)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-admin"
                  onClick={() => onNavigate('admin')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin & Security Console
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Project & C29 Research
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: C29 AI Immersion Note */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Academic Context
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">
                C29 AI Immersion Project
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                Demonstration prototype presenting the proposed computer vision parking architecture,
                field survey findings, and interactive telemetry interface.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-1"
              >
                <span>Read student field study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-medium text-slate-300">
              SmartPark – AI College Parking Detection System
            </p>
            <p className="text-emerald-400 font-semibold mt-0.5">
              Created by SAKTHEESWARI R • C29 AI Immersion Capstone
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Created by SAKTHEESWARI R
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
