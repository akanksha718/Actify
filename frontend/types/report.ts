export interface Report {
  id: number;
  title: string;
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  date: string;
  location: string;
}