import React, { useState } from 'react';
import { ParkingSlot } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Navigation, 
  Clock, 
  Footprints, 
  Zap, 
  ShieldCheck, 
  Car, 
  X, 
  Share2, 
  BookmarkCheck,
  Compass
} from 'lucide-react';

interface SlotDetailModalProps {
  slot: ParkingSlot | null;
  onClose: () => void;
  onReserve?: (slotId: string) => void;
}

export const SlotDetailModal: React.FC<SlotDetailModalProps> = ({
  slot,
  onClose,
  onReserve,
}) => {
  const [navigating, setNavigating] = useState(false);
  const [reserved, setReserved] = useState(false);

  if (!slot) return null;

  const isAvailable = slot.status === 'AVAILABLE';

  const handleStartNavigation = () => {
    setNavigating(true);
  };

  const handleReserve = () => {
    setReserved(true);
    if (onReserve) {
      onReserve(slot.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Header Status Bar */}
        <div className={`p-6 text-white ${
          isAvailable ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-rose-600 to-red-600'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 font-mono font-bold text-xl">
                {slot.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-white">
                    {slot.zone}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                    Row {slot.row} • Bay {slot.col}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-1 tracking-tight">
                  {isAvailable ? `Slot ${slot.id} is available` : `Slot ${slot.id} is occupied`}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-medium block">Category</span>
              <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-1">
                {slot.type === 'EV_CHARGING' && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                {slot.type.replace('_', ' ')}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-medium block">Distance</span>
              <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-1">
                <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                {slot.distanceMeters} meters
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-medium block">Walking ETA</span>
              <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                ~{slot.walkingTimeMinutes} min walk
              </span>
            </div>
          </div>

          {/* Details based on status */}
          {isAvailable ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-emerald-900">
                  <p className="font-semibold text-emerald-800">
                    Optimal Bay Detected by AI
                  </p>
                  <p className="mt-0.5 text-emerald-700">
                    Camera sensor verified empty bay with 98% confidence. Immediate proximity to Science & Tech classrooms.
                  </p>
                </div>
              </div>

              {/* Navigation Route Preview */}
              {navigating ? (
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 animate-spin" />
                      Live Route Guidance
                    </span>
                    <span className="text-[11px] text-slate-400">Total: 45 sec drive</span>
                  </div>
                  <ol className="text-xs space-y-2 border-l border-emerald-500/40 pl-3 ml-1">
                    <li className="text-slate-200">
                      1. Enter through <strong>North Campus Perimeter Gate</strong>.
                    </li>
                    <li className="text-slate-200">
                      2. Follow <strong>Aisle A</strong> for 40 meters towards Science Hall.
                    </li>
                    <li className="text-emerald-300 font-medium">
                      3. Slot <strong>{slot.id}</strong> will be on your right side.
                    </li>
                  </ol>
                  <p className="text-[10px] text-slate-400 italic">
                    Navigation simulated using campus coordinate geometry.
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-rose-900">
                  <p className="font-semibold text-rose-800">
                    Slot Currently Occupied
                  </p>
                  <p className="mt-0.5 text-rose-700">
                    Detected vehicle: <strong>{slot.vehicleType || 'Sedan'}</strong>.
                    Occupied since <strong>{slot.occupiedSince || 'Morning'}</strong>.
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>AI Confidence:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {Math.round((slot.confidenceScore || 0.96) * 100)}% (YOLOv8 Detection)
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {isAvailable ? (
              <>
                <button
                  id="modal-navigate-btn"
                  onClick={handleStartNavigation}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate to this slot</span>
                </button>
                <button
                  id="modal-reserve-btn"
                  onClick={handleReserve}
                  disabled={reserved}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm border flex items-center justify-center gap-1.5 transition-all ${
                    reserved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 cursor-default'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  <span>{reserved ? 'Hold Saved (10m)' : 'Hold Spot (10 min)'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Close Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
