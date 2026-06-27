import { Report } from "@/types/report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Waterlogging",
    category: "Water",
    severity: "MEDIUM",
    status: "OPEN",
    date: "6/27/2026",
    location: "Sector 18",
  },
  {
    id: 2,
    title: "Drainage Blocked",
    category: "Water",
    severity: "HIGH",
    status: "OPEN",
    date: "6/26/2026",
    location: "Civil Lines",
  },
  {
    id: 3,
    title: "Garbage Dump",
    category: "Waste",
    severity: "LOW",
    status: "RESOLVED",
    date: "6/24/2026",
    location: "Model Town",
  },
];