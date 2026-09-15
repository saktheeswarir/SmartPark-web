import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Car, 
  Cpu, 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Info, 
  Menu, 
  X, 
  Activity, 
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  availableCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  availableCount,
  totalCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'live', label: 'Live Parking', icon: <MapPin className="w-4 h-4" /> },
    { id: 'detection', label: 'AI Detection', icon: <Cpu className="w-4 h-4" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <Layers className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Dashboard', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'about', label: 'About / C29 Project', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-banner for C29 project disclosure */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              C29 AI IMMERSION
            </span>
            <span className="hidden sm:inline text-slate-300">
              Prototype & Research Demo: College Computer Vision Parking System
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-medium">AI Inference Active (96.4%)</span>
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-300 font-medium hidden md:inline">
              Available: <strong className="text-emerald-400">{availableCount}</strong> / {totalCount} Spots
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            id="nav-logo"
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Smart<span className="text-emerald-600">Park</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block">
                College Parking Detection System
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA & Live Status */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-live-btn"
              onClick={() => handleNavClick('live')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-semibold shadow-sm shadow-emerald-600/25 transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Live Parking Map</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="mb-3 px-2 py-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Available Bays</span>
            <span className="font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded">
              {availableCount} of {totalCount} free
            </span>
          </div>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
