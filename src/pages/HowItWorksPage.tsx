import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockParkingData';
import { 
  Camera, 
  Film, 
  Sliders, 
  Scan, 
  Grid, 
  Database, 
  Smartphone, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PageId } from '../types';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(4); // default YOLO open

  // Helper icon map
  const getIcon = (name: string) => {
    switch (name) {
      case 'Camera': return <Camera className="w-6 h-6 text-blue-600" />;
      case 'Film': return <Film className="w-6 h-6 text-purple-600" />;
      case 'Sliders': return <Sliders className="w-6 h-6 text-cyan-600" />;
      case 'Scan': return <Scan className="w-6 h-6 text-emerald-600" />;
      case 'Grid': return <Grid className="w-6 h-6 text-amber-600" />;
      case 'Database': return <Database className="w-6 h-6 text-indigo-600" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-rose-600" />;
      default: return <Cpu className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Introduction */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Complete Technical Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How SmartPark Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From a single elevated security camera to your smartphone screen in under 2 seconds.
          Here is how computer vision detects empty parking spots step-by-step.
        </p>
      </div>

      {/* Visual Pipeline Summary Flowchart Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-4">
          Pipeline Flowchart Architecture
        </span>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <React.Fragment key={step.stepNumber}>
              <div 
                onClick={() => setExpandedStep(step.stepNumber)}
                className={`px-3 py-2 rounded-xl cursor-pointer transition-all border ${
                  expandedStep === step.stepNumber
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md scale-105'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span className="font-bold text-emerald-400 mr-1.5">{step.stepNumber}.</span>
                <span>{step.title}</span>
              </div>
              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <span className="text-slate-600 hidden lg:inline font-bold">➔</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP-BY-STEP VERTICAL TIMELINE CARDS */}
      <div className="space-y-6 relative">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const isExpanded = expandedStep === step.stepNumber;
          const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

          return (
            <div key={step.stepNumber} className="relative">
              {/* Vertical connecting line */}
              {!isLast && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-200 -z-10 hidden sm:block" />
              )}

              <div 
                id={`how-step-card-${step.stepNumber}`}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Clickable Header */}
                <div 
                  onClick={() => setExpandedStep(isExpanded ? null : step.stepNumber)}
                  className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Step Icon Badge */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      {getIcon(step.iconName)}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800">
                          STEP {step.stepNumber}
                        </span>
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                          {step.techStack}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {step.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div className="p-2 rounded-lg text-slate-400 hover:text-slate-600">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    <p className="text-slate-700">
                      {step.detailedDesc}
                    </p>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                      <span className="font-semibold text-slate-800 block">
                        Why this approach matters for college parking:
                      </span>
                      {step.stepNumber === 1 && (
                        <p className="text-slate-600">
                          Traditional systems require drilling holes into every asphalt stall to install $300 battery-operated magnetic induction pucks. A single high-resolution IP camera covers 25 to 50 parking stalls with zero ground disruption.
                        </p>
                      )}
                      {step.stepNumber === 2 && (
                        <p className="text-slate-600">
                          Processing 30 frames every second burns unnecessary GPU electricity. Because cars do not park or leave within milliseconds, sampling keyframes every 2.5 seconds saves 95% computing power while remaining completely real-time.
                        </p>
                      )}
                      {step.stepNumber === 3 && (
                        <p className="text-slate-600">
                          Cameras installed on building roofs or poles view spots at an angle. Homography mathematically stretches the perspective into a clean top-down grid so distant slots are measured as accurately as nearby ones.
                        </p>
                      )}
                      {step.stepNumber === 4 && (
                        <p className="text-slate-600">
                          YOLOv8 runs lightweight convolutional neural networks capable of detecting sedans, SUVs, trucks, and motorcycles even in rain, overcast weather, or with partial tree leaf obstruction.
                        </p>
                      )}
                      {step.stepNumber === 5 && (
                        <p className="text-slate-600">
                          Object detection tells us WHERE vehicles are; slot classification checks if that vehicle is inside the boundaries of Stall A01 or A02 using polygon geometry (Intersection-over-Union).
                        </p>
                      )}
                      {step.stepNumber === 6 && (
                        <p className="text-slate-600">
                          Statuses are synced to campus message brokers. This allows campus digital LED roadway signs and web applications to refresh simultaneously.
                        </p>
                      )}
                      {step.stepNumber === 7 && (
                        <p className="text-slate-600">
                          Students driving toward campus can open SmartPark on their mobile phones, see the green available bays in Zone A or B, and immediately drive to the open spot without circling.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Downward connecting arrow icon for mobile */}
              {!isLast && (
                <div className="flex justify-center my-2 sm:hidden text-slate-400">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer Callout */}
      <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">
            See the pipeline in simulated real-time
          </h3>
          <p className="text-xs text-emerald-800 mt-1">
            Switch to the AI Detection page to view the simulated camera preview and toggle vehicle bounding boxes.
          </p>
        </div>
        <button
          onClick={() => onNavigate('detection')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
        >
          <span>Open AI Detection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
