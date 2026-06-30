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
    <section className="mt-10 sm:mt-14 lg:mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            My Reports
          </h2>
          <p className="mt-2 text-base text-gray-400 sm:text-lg lg:text-xl">
            Monitor your civic reports
          </p>

        </div>

        {/* <MapToggle /> */}

      </div>

      <div className="space-y-6 lg:space-y-8">

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