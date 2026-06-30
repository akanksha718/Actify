export interface AIAnalysis {
  category: string;
  confidence: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  recommendedDepartment: string;
  imageUrl: string;
}