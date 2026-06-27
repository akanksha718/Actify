"use client";

import { reports } from "@/lib/reports";
import ReportCard from "./ReportCard";
import MapToggle from "./Maptoggle";

export default function RecentActivity() {
  return (
    <section className="mt-16">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-5xl font-bold">
            Recent Activity
          </h2>

          <p className="text-gray-400 text-xl mt-2">
            Monitor your contributions in real-time
          </p>

        </div>

        <MapToggle />

      </div>

      <div className="space-y-8">

        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
          />
        ))}

      </div>

    </section>
  );
}