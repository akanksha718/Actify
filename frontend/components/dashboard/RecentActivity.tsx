"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import ReportCard from "./ReportCard";
import MapToggle from "./Maptoggle";

import type { Report } from "@/types/report";

export default function RecentActivity({ setLen }: any) {
  const { getToken } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const token = await getToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reports/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: {
          success: boolean;
          reports: Report[];
        } = await response.json();

        setReports(data.reports);
        setLen(data.reports.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, [getToken]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading reports...
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          No Reports Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Upload your first civic issue to
          start tracking it.
        </p>
      </div>
    );
  }


  return (
    <section className="mt-16">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-5xl font-bold">
            My Reports
          </h2>

          <p className="text-gray-400 text-xl mt-2">
            Monitor your civic reports
          </p>

        </div>

        {/* <MapToggle /> */}

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