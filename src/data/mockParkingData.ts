import { ParkingSlot, ParkingAlert, OccupancyDataPoint, DetectionStep } from '../types';

export const INITIAL_PARKING_SLOTS: ParkingSlot[] = [
  // Zone A - North Lot (Near Science & Engineering Hall)
  { id: 'A01', zone: 'Zone A', row: 1, col: 1, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '08:45 AM', vehicleType: 'White Sedan', confidenceScore: 0.97, distanceMeters: 45, walkingTimeMinutes: 1 },
  { id: 'A02', zone: 'Zone A', row: 1, col: 2, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 50, walkingTimeMinutes: 1 },
  { id: 'A03', zone: 'Zone A', row: 1, col: 3, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '09:15 AM', vehicleType: 'Blue SUV', confidenceScore: 0.95, distanceMeters: 55, walkingTimeMinutes: 1 },
  { id: 'A04', zone: 'Zone A', row: 1, col: 4, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 60, walkingTimeMinutes: 1 },
  { id: 'A05', zone: 'Zone A', row: 1, col: 5, status: 'AVAILABLE', type: 'EV_CHARGING', distanceMeters: 65, walkingTimeMinutes: 1 },
  { id: 'A06', zone: 'Zone A', row: 1, col: 6, status: 'OCCUPIED', type: 'ACCESSIBLE', occupiedSince: '08:30 AM', vehicleType: 'Silver Van', confidenceScore: 0.98, distanceMeters: 35, walkingTimeMinutes: 1 },
  
  { id: 'A07', zone: 'Zone A', row: 2, col: 1, status: 'OCCUPIED', type: 'FACULTY', occupiedSince: '08:10 AM', vehicleType: 'Black Sedan', confidenceScore: 0.96, distanceMeters: 70, walkingTimeMinutes: 2 },
  { id: 'A08', zone: 'Zone A', row: 2, col: 2, status: 'OCCUPIED', type: 'FACULTY', occupiedSince: '08:20 AM', vehicleType: 'Grey Hatchback', confidenceScore: 0.94, distanceMeters: 75, walkingTimeMinutes: 2 },
  { id: 'A09', zone: 'Zone A', row: 2, col: 3, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 80, walkingTimeMinutes: 2 },
  { id: 'A10', zone: 'Zone A', row: 2, col: 4, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '09:30 AM', vehicleType: 'Red Compact', confidenceScore: 0.96, distanceMeters: 85, walkingTimeMinutes: 2 },
  { id: 'A11', zone: 'Zone A', row: 2, col: 5, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 90, walkingTimeMinutes: 2 },
  { id: 'A12', zone: 'Zone A', row: 2, col: 6, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '09:05 AM', vehicleType: 'Dark Blue Sedan', confidenceScore: 0.98, distanceMeters: 95, walkingTimeMinutes: 2 },

  // Zone B - South Lot (Near Library & Student Center)
  { id: 'B01', zone: 'Zone B', row: 1, col: 1, status: 'OCCUPIED', type: 'FACULTY', occupiedSince: '07:55 AM', vehicleType: 'Silver Crossover', confidenceScore: 0.95, distanceMeters: 110, walkingTimeMinutes: 3 },
  { id: 'B02', zone: 'Zone B', row: 1, col: 2, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 115, walkingTimeMinutes: 3 },
  { id: 'B03', zone: 'Zone B', row: 1, col: 3, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '10:00 AM', vehicleType: 'Black Pickup', confidenceScore: 0.93, distanceMeters: 120, walkingTimeMinutes: 3 },
  { id: 'B04', zone: 'Zone B', row: 1, col: 4, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '08:00 AM', vehicleType: 'Green Hybrid', confidenceScore: 0.97, distanceMeters: 125, walkingTimeMinutes: 3 },
  { id: 'B05', zone: 'Zone B', row: 1, col: 5, status: 'AVAILABLE', type: 'EV_CHARGING', distanceMeters: 130, walkingTimeMinutes: 3 },
  { id: 'B06', zone: 'Zone B', row: 1, col: 6, status: 'AVAILABLE', type: 'ACCESSIBLE', distanceMeters: 100, walkingTimeMinutes: 2 },

  { id: 'B07', zone: 'Zone B', row: 2, col: 1, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '09:40 AM', vehicleType: 'Charcoal Sedan', confidenceScore: 0.96, distanceMeters: 140, walkingTimeMinutes: 3 },
  { id: 'B08', zone: 'Zone B', row: 2, col: 2, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 145, walkingTimeMinutes: 4 },
  { id: 'B09', zone: 'Zone B', row: 2, col: 3, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '09:10 AM', vehicleType: 'White SUV', confidenceScore: 0.99, distanceMeters: 150, walkingTimeMinutes: 4 },
  { id: 'B10', zone: 'Zone B', row: 2, col: 4, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 155, walkingTimeMinutes: 4 },
  { id: 'B11', zone: 'Zone B', row: 2, col: 5, status: 'OCCUPIED', type: 'STUDENT', occupiedSince: '08:50 AM', vehicleType: 'Red Hatchback', confidenceScore: 0.94, distanceMeters: 160, walkingTimeMinutes: 4 },
  { id: 'B12', zone: 'Zone B', row: 2, col: 6, status: 'AVAILABLE', type: 'STUDENT', distanceMeters: 165, walkingTimeMinutes: 4 }
];

export const HOURLY_OCCUPANCY_DATA: OccupancyDataPoint[] = [
  { time: '07:00 AM', occupied: 4, available: 20, occupancyRate: 17 },
  { time: '08:00 AM', occupied: 11, available: 13, occupancyRate: 46 },
  { time: '09:00 AM', occupied: 18, available: 6, occupancyRate: 75 },
  { time: '10:00 AM', occupied: 22, available: 2, occupancyRate: 92 },
  { time: '11:00 AM', occupied: 23, available: 1, occupancyRate: 96 },
  { time: '12:00 PM', occupied: 21, available: 3, occupancyRate: 88 },
  { time: '01:00 PM', occupied: 19, available: 5, occupancyRate: 79 },
  { time: '02:00 PM', occupied: 17, available: 7, occupancyRate: 71 },
  { time: '03:00 PM', occupied: 14, available: 10, occupancyRate: 58 },
  { time: '04:00 PM', occupied: 10, available: 14, occupancyRate: 42 },
  { time: '05:00 PM', occupied: 6, available: 18, occupancyRate: 25 },
  { time: '06:00 PM', occupied: 3, available: 21, occupancyRate: 13 },
];

export const SYSTEM_ALERTS: ParkingAlert[] = [
  {
    id: 'alt-1',
    timestamp: '10:14 AM',
    type: 'warning',
    title: 'High Occupancy Warning',
    message: 'Zone A reached 92% occupancy. Incoming drivers routed to Zone B South Lot.',
  },
  {
    id: 'alt-2',
    timestamp: '09:48 AM',
    type: 'info',
    title: 'Camera 01 Angle Calibration',
    message: 'Periodic auto-homography matrix verified. Perspective warp error <0.4px.',
  },
  {
    id: 'alt-3',
    timestamp: '08:35 AM',
    type: 'warning',
    title: 'EV Charging Slot Occupied',
    message: 'Slot A05 charging session active. 1 hour remaining in grace window.',
    slotId: 'A05'
  }
];

export const HOW_IT_WORKS_STEPS: DetectionStep[] = [
  {
    stepNumber: 1,
    title: 'Camera Stream',
    shortDesc: 'Mounted elevated RTSP surveillance video',
    detailedDesc: 'High-definition 1080p/4K campus security cameras mounted on light poles and building roofs capture the full parking area at an inclined 30° to 45° angle.',
    techStack: 'RTSP Stream / IP CCTV / 30 FPS',
    iconName: 'Camera'
  },
  {
    stepNumber: 2,
    title: 'Video & Image Capture',
    shortDesc: 'Frame buffer & keyframe sampling',
    detailedDesc: 'Instead of processing every frame which wastes compute, the edge worker samples keyframes at 1 frame per 2.5 seconds, reducing compute load by 95% while keeping latency under 3 seconds.',
    techStack: 'OpenCV VideoCapture / Buffer Queue',
    iconName: 'Film'
  },
  {
    stepNumber: 3,
    title: 'Pre-processing & Homography',
    shortDesc: 'Contrast normalization & perspective correction',
    detailedDesc: 'The captured frames are normalized for weather, glare, and shadows. Perspective transformation unwarps trapezoidal parking slots into standardized top-down coordinates.',
    techStack: 'OpenCV WarpPerspective / CLAHE Filter',
    iconName: 'Sliders'
  },
  {
    stepNumber: 4,
    title: 'YOLO AI Detection',
    shortDesc: 'Deep learning bounding box inference',
    detailedDesc: 'A lightweight YOLOv8 neural network trained on over 12,000 campus parking images detects vehicles (cars, SUVs, trucks, motorcycles) with bounding box coordinates and classification confidence.',
    techStack: 'YOLOv8s / PyTorch / ONNX Runtime',
    iconName: 'Scan'
  },
  {
    stepNumber: 5,
    title: 'Slot ROI Classification',
    shortDesc: 'Intersection-over-Union (IoU) mapping',
    detailedDesc: 'The system computes the polygon overlap between detected vehicle bounding boxes and pre-calibrated parking slot regions (ROI). If overlap exceeds 40%, the slot is tagged OCCUPIED.',
    techStack: 'Shapely Polygon / IoU Matrix (Threshold: 0.40)',
    iconName: 'Grid'
  },
  {
    stepNumber: 6,
    title: 'Availability Database',
    shortDesc: 'Sub-second real-time telemetry sync',
    detailedDesc: 'Classified slot statuses are written to an in-memory Redis state store and broadcast over WebSockets, updating college displays, mobile apps, and gate signs in under 250 milliseconds.',
    techStack: 'Redis Cache / WebSocket Pub-Sub',
    iconName: 'Database'
  },
  {
    stepNumber: 7,
    title: 'Student Dashboard',
    shortDesc: 'Instant navigation and spot reservation',
    detailedDesc: 'Students open the SmartPark web app to see live green/red slot maps, receive turn-by-turn guidance to the nearest free bay, and avoid morning class arrival congestion.',
    techStack: 'React / Tailwind CSS / Live Telemetry',
    iconName: 'Smartphone'
  }
];

export const C29_STUDENT_FIELD_DATA = {
  projectTitle: "SmartPark: Computer Vision Parking Optimization for Campus Mobility",
  courseCode: "C29 AI Immersion Capstone Prototype",
  studentResearcher: "Eswari Sakthi (C29 Fellow)",
  surveyDate: "Fall Campus Observational Study",
  realObservations: [
    {
      metric: "14.8 minutes",
      label: "Average Morning Parking Search Time",
      detail: "Survey of 120 commuter students during 09:30 AM – 10:30 AM arrival rush."
    },
    {
      metric: "84.2%",
      label: "Student Frustration Rate",
      detail: "Students reported arriving 25-30 minutes early solely to find an open stall."
    },
    {
      metric: "10:15 AM",
      label: "Peak Lot Congestion Time",
      detail: "North Engineering Lot reached 96% saturation 15 minutes before 10:30 AM lectures."
    },
    {
      metric: "32% Cruising Miles",
      label: "Avoidable Campus Traffic",
      detail: "Nearly 1 in 3 vehicles circling the perimeter lot were simply looking for empty spaces."
    }
  ],
  costComparison: {
    magneticSensors: "$280 - $350 per slot ($7,000+ for 24 bays) + asphalt drilling + battery maintenance",
    smartParkAI: "Single 4K camera ($180) + edge Jetson unit ($199) covering 30+ slots non-invasively",
    savingsPercentage: "92% Infrastructure Cost Reduction"
  }
};
