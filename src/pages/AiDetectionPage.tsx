import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Camera, 
  Scan, 
  Sliders, 
  Grid, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Sparkles,
  Zap,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AiDetectionPage: React.FC = () => {
  // Interactive simulator states
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showSlotPolygons, setShowSlotPolygons] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.85);
  const [activeCamera, setActiveCamera] = useState<'CAM-01' | 'CAM-02'>('CAM-01');
  const [activePipelineStep, setActivePipelineStep] = useState<number>(3); // 1 to 5
  const [isSimulatingCarEvent, setIsSimulatingCarEvent] = useState(false);
  const [simulatedSlotA02Occupied, setSimulatedSlotA02Occupied] = useState(false);

  // Simulated bounding box vehicles for CAM-01 (Zone A)
  const baseVehicles = [
    { id: 'v1', slot: 'A01', label: 'Sedan', conf: 0.97, x: 75, y: 110, w: 90, h: 140, color: '#f43f5e' },
    { id: 'v3', slot: 'A03', label: 'SUV', conf: 0.95, x: 295, y: 110, w: 95, h: 145, color: '#f43f5e' },
    { id: 'v6', slot: 'A06', label: 'Van', conf: 0.98, x: 625, y: 110, w: 95, h: 145, color: '#f43f5e' },
    { id: 'v7', slot: 'A07', label: 'Sedan', conf: 0.96, x: 75, y: 310, w: 90, h: 140, color: '#f43f5e' },
    { id: 'v8', slot: 'A08', label: 'Hatchback', conf: 0.94, x: 185, y: 310, w: 88, h: 138, color: '#f43f5e' },
    { id: 'v10', slot: 'A10', label: 'Compact', conf: 0.96, x: 405, y: 310, w: 85, h: 135, color: '#f43f5e' },
    { id: 'v12', slot: 'A12', label: 'Sedan', conf: 0.98, x: 625, y: 310, w: 90, h: 140, color: '#f43f5e' },
  ];

  // Dynamic vehicles list
  const vehicles = simulatedSlotA02Occupied
    ? [...baseVehicles, { id: 'v2', slot: 'A02', label: 'Sedan (Arrived)', conf: 0.96, x: 185, y: 110, w: 88, h: 138, color: '#f43f5e' }]
    : baseVehicles;

  // Filter by confidence threshold
  const detectedVehicles = vehicles.filter((v) => v.conf >= confidenceThreshold);

  // 12 slot ROIs for CAM-01
  const slotROIs = [
    { id: 'A01', x: 70, y: 100, w: 100, h: 160 },
    { id: 'A02', x: 180, y: 100, w: 100, h: 160 },
    { id: 'A03', x: 290, y: 100, w: 100, h: 160 },
    { id: 'A04', x: 400, y: 100, w: 100, h: 160 },
    { id: 'A05', x: 510, y: 100, w: 100, h: 160 },
    { id: 'A06', x: 620, y: 100, w: 100, h: 160 },

    { id: 'A07', x: 70, y: 300, w: 100, h: 160 },
    { id: 'A08', x: 180, y: 300, w: 100, h: 160 },
    { id: 'A09', x: 290, y: 300, w: 100, h: 160 },
    { id: 'A10', x: 400, y: 300, w: 100, h: 160 },
    { id: 'A11', x: 510, y: 300, w: 100, h: 160 },
    { id: 'A12', x: 620, y: 300, w: 100, h: 160 },
  ];

  const handleSimulateCarArrival = () => {
    setIsSimulatingCarEvent(true);
    setTimeout(() => {
      setSimulatedSlotA02Occupied(!simulatedSlotA02Occupied);
      setIsSimulatingCarEvent(false);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* HEADER & PROTOTYPE DISCLAIMER */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <Cpu className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                AI Detection Engine & Computer Vision Pipeline
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Demonstrating the YOLOv8 object detection inference and spatial slot classification pipeline.
            </p>
          </div>

          {/* REQUIRED PROTOTYPE NOTICE BANNER */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 max-w-md">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-800">
                C29 Prototype Simulation Notice:
              </strong>
              This is a simulated demo environment for the C29 presentation. The camera feed and telemetry are generated demonstration models showing how the proposed edge system functions.
            </div>
          </div>
        </div>

        {/* 3 SPECIFIED METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
              AI Model
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
              YOLO-based Object Detection
            </span>
            <span className="text-xs text-slate-500">
              YOLOv8s custom fine-tuned on campus vehicle dataset
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-700 uppercase tracking-wider font-semibold block">
              Detection Status
            </span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Active
            </span>
            <span className="text-xs text-emerald-600">
              Sub-second inference (28ms per 640x640 frame)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
              Confidence
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono">
              96%
            </span>
            <span className="text-xs text-slate-500">
              mAP@50 score across 12,400 test validation frames
            </span>
          </div>
        </div>
      </div>

      {/* 5-STAGE DETECTION PIPELINE VISUALIZER */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            5-Stage Detection Lifecycle
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any step to inspect the data transformation from raw CCTV pixels to live dashboard availability.
          </p>
        </div>

        {/* 5 Step Indicator Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { id: 1, title: '1. Camera Feed', desc: 'RTSP IP CCTV 1080p', icon: Camera },
            { id: 2, title: '2. Captured Frame', desc: 'Frame sampling & CLAHE', icon: Scan },
            { id: 3, title: '3. AI Vehicle Detection', desc: 'YOLOv8 Bounding Boxes', icon: Cpu },
            { id: 4, title: '4. Slot Classification', desc: 'IoU Polygon Intersection', icon: Grid },
            { id: 5, title: '5. Final Availability', desc: 'Redis & WebSocket sync', icon: CheckCircle2 },
          ].map((step) => {
            const isSelected = activePipelineStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                id={`pipeline-step-${step.id}`}
                onClick={() => setActivePipelineStep(step.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`p-1.5 rounded-md ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className={`text-xs font-bold ${
                    isSelected ? 'text-emerald-900' : 'text-slate-800'
                  }`}>
                    {step.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {step.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Info Box */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              Active Stage Details: Stage {activePipelineStep}
            </span>
            {activePipelineStep === 1 && (
              <p>Capturing wide-angle campus parking RTSP video stream from Pole-Mounted IP camera at 30 FPS.</p>
            )}
            {activePipelineStep === 2 && (
              <p>Keyframe sampling every 2.5s. CLAHE contrast equalization eliminates morning sun glare and tree shadows.</p>
            )}
            {activePipelineStep === 3 && (
              <p>YOLOv8s processes 640x640 tensor. Outputs class labels (car, suv, truck) with coordinates [x, y, w, h] and confidences.</p>
            )}
            {activePipelineStep === 4 && (
              <p>Calculates Shapely Polygon Intersection-over-Union (IoU) between vehicle box and slot ROI. Overlap &gt; 0.40 = OCCUPIED.</p>
            )}
            {activePipelineStep === 5 && (
              <p>Publishes JSON status array to campus Redis state store. Web client receives sub-200ms reactive update.</p>
            )}
          </div>
          <span className="text-[10px] text-slate-400 px-2 py-1 rounded bg-slate-800 border border-slate-700 whitespace-nowrap">
            Pipeline Latency: ~142ms
          </span>
        </div>
      </div>

      {/* SIMULATED CAMERA PREVIEW WITH BOUNDING BOXES */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
        {/* Stream Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
              SIMULATED CAMERA STREAM
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-mono text-slate-300">
              Node: {activeCamera} (North Lot Overhead)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              YOLOv8 Active
            </span>
          </div>

          {/* Interactive Stream Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showBoundingBoxes
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Bounding Boxes ({showBoundingBoxes ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={() => setShowSlotPolygons(!showSlotPolygons)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showSlotPolygons
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Slot ROIs ({showSlotPolygons ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={handleSimulateCarArrival}
              disabled={isSimulatingCarEvent}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSimulatingCarEvent ? 'animate-spin' : ''}`} />
              <span>
                {simulatedSlotA02Occupied ? 'Simulate Car Leaving A02' : 'Simulate Car Parking in A02'}
              </span>
            </button>
          </div>
        </div>

        {/* Confidence Threshold Slider Control */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 font-medium">Confidence Filter Threshold:</span>
            <span className="font-mono font-bold text-emerald-400">
              {Math.round(confidenceThreshold * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[10px] text-slate-500">50%</span>
            <input
              type="range"
              min="0.50"
              max="0.98"
              step="0.01"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">98%</span>
          </div>
        </div>

        {/* Simulated Camera Feed Display Canvas/SVG */}
        <div className="relative w-full aspect-16/9 max-h-[520px] rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center select-none">
          {/* SVG Overlay representing the parking camera view */}
          <svg 
            viewBox="0 0 790 490" 
            className="w-full h-full object-contain"
          >
            {/* Asphalt Background and parking lot texture */}
            <rect x="0" y="0" width="790" height="490" fill="#0f172a" />
            
            {/* Roadway markings and drive lane */}
            <line x1="20" y1="280" x2="770" y2="280" stroke="#334155" strokeWidth="2" strokeDasharray="10,10" />
            <text x="395" y="275" fill="#475569" fontSize="11" textAnchor="middle" fontFamily="monospace">
              CENTRAL CAMPUS DRIVE AISLE (EASTBOUND)
            </text>

            {/* Render Slot ROIs (Polygons) */}
            {showSlotPolygons && slotROIs.map((slot) => {
              // Check if any detected vehicle overlaps this slot
              const isOccupied = detectedVehicles.some((v) => v.slot === slot.id);

              return (
                <g key={slot.id}>
                  {/* Slot Border */}
                  <rect
                    x={slot.x}
                    y={slot.y}
                    width={slot.w}
                    height={slot.h}
                    fill={isOccupied ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)'}
                    stroke={isOccupied ? '#f43f5e' : '#10b981'}
                    strokeWidth="1.5"
                    strokeDasharray={isOccupied ? 'none' : '4,2'}
                    rx="6"
                  />
                  {/* Slot Label Tag */}
                  <rect
                    x={slot.x + 6}
                    y={slot.y + 6}
                    width="44"
                    height="18"
                    fill={isOccupied ? '#f43f5e' : '#10b981'}
                    rx="3"
                  />
                  <text
                    x={slot.x + 28}
                    y={slot.y + 19}
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {slot.id}
                  </text>

                  {/* Status Indicator text on slot bottom */}
                  <text
                    x={slot.x + slot.w / 2}
                    y={slot.y + slot.h - 10}
                    fill={isOccupied ? '#fda4af' : '#6ee7b7'}
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                  </text>
                </g>
              );
            })}

            {/* Render AI Vehicle Bounding Boxes */}
            {showBoundingBoxes && detectedVehicles.map((v) => (
              <g key={v.id}>
                {/* Vehicle graphic placeholder */}
                <rect
                  x={v.x + 4}
                  y={v.y + 4}
                  width={v.w - 8}
                  height={v.h - 8}
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="1"
                  rx="8"
                />
                <circle cx={v.x + v.w / 2} cy={v.y + v.h / 2} r="14" fill="#334155" />
                <text
                  x={v.x + v.w / 2}
                  y={v.y + v.h / 2 + 4}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  CAR
                </text>

                {/* YOLO Bounding Box */}
                <rect
                  x={v.x}
                  y={v.y}
                  width={v.w}
                  height={v.h}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  rx="4"
                />

                {/* Corner crosshairs to look like authentic computer vision */}
                <path
                  d={`M ${v.x} ${v.y + 15} L ${v.x} ${v.y} L ${v.x + 15} ${v.y}`}
                  stroke="#38bdf8"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d={`M ${v.x + v.w} ${v.y + 15} L ${v.x + v.w} ${v.y} L ${v.x + v.w - 15} ${v.y}`}
                  stroke="#38bdf8"
                  strokeWidth="4"
                  fill="none"
                />

                {/* YOLO Detection Label Pill */}
                <rect
                  x={v.x}
                  y={v.y - 20}
                  width="85"
                  height="18"
                  fill="#0284c7"
                  rx="3"
                />
                <text
                  x={v.x + 42}
                  y={v.y - 7}
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {v.label}: {Math.round(v.conf * 100)}%
                </text>
              </g>
            ))}

            {/* Camera OSD (On-Screen Display) */}
            <text x="25" y="35" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
              ● REC [RTSP://192.168.1.104/live] 1080P 30FPS
            </text>
            <text x="765" y="35" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">
              INFERENCE: YOLOv8s @ 28ms
            </text>
          </svg>

          {/* Watermark Prototype Tag */}
          <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded bg-black/70 border border-slate-700 text-[10px] text-slate-300 font-mono">
            C29 Capstone Prototype Simulation • Synthetic Video Frame
          </div>
        </div>

        {/* Technical Explanation footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-400">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-slate-200 block mb-1">
              Intersection over Union (IoU)
            </span>
            Calculates the geometric intersection between detected vehicle boundaries and pre-calibrated parking stall coordinates.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-slate-200 block mb-1">
              Homography Transformation
            </span>
            Compensates for the 35° tilt perspective of pole-mounted cameras to avoid false positives on adjacent spots.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-slate-200 block mb-1">
              Edge Tensor Acceleration
            </span>
            Runs on campus-hosted edge microservers (NVIDIA Jetson / x86 GPU) without sending heavy raw video over external cloud APIs.
          </div>
        </div>
      </div>
    </div>
  );
};
