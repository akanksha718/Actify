export type ReportStatus = "OPEN" | "IN_PROGRESS" | "FIXED";

export type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface Report {
  id: string;

  imageUrl: string;

  category: string;
  confidence: number;

  severity: Severity;

  description: string | null;

  department: string;

  address: string;

  latitude: number;
  longitude: number;

  status: ReportStatus;

  verificationCount: number;

  priorityScore: number;

  createdAt: string;
}



import { AIAnalysis } from "./analysis";
import { UserLocation } from "./location";

export interface ReportData extends AIAnalysis {
  imageUrl: string;
  location: UserLocation;
}