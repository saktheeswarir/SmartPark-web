export type SlotStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export type SlotType = 'STUDENT' | 'FACULTY' | 'EV_CHARGING' | 'ACCESSIBLE';

export interface ParkingSlot {
  id: string;          // e.g. "A01"
  zone: 'Zone A' | 'Zone B';
  row: number;
  col: number;
  status: SlotStatus;
  type: SlotType;
  occupiedSince?: string;
  vehicleType?: string;
  confidenceScore?: number;
  distanceMeters: number; // distance to main academic building
  walkingTimeMinutes: number;
}

export interface ParkingAlert {
  id: string;
  timestamp: string;
  type: 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  slotId?: string;
  resolved?: boolean;
}

export interface OccupancyDataPoint {
  time: string;
  occupied: number;
  available: number;
  occupancyRate: number;
}

export interface DetectionStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  techStack: string;
  iconName: string;
}

export type PageId = 'landing' | 'live' | 'detection' | 'how-it-works' | 'admin' | 'about';
