"use client";

import {
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Report } from "@/types/report";
import ReportStatus from "./ReportStatus";

interface Props {
  report: Report;
}

export default function ReportCard({
  report,
}: Props) {
  const severityColors = {
    LOW: "bg-green-100 text-green-700",

    MEDIUM:
      "bg-yellow-100 text-yellow-700",

    HIGH: "bg-orange-100 text-orange-700",

    CRITICAL:
      "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      <div className="p-8 flex gap-8">

        {/* IMAGE */}

        <img
          src={report.imageUrl}
          alt={report.category}
          className="w-40 h-40 rounded-3xl object-cover"
        />

        {/* INFO */}

        <div className="flex-1">

          <div className="flex justify-between">

            <div>

              <h2 className="text-3xl font-bold capitalize">
                {report.category}
              </h2>

              <div className="flex items-center gap-2 mt-3 text-gray-500">

                <MapPin size={18} />

                {report.address}

              </div>

            </div>

            <ReportStatus
              status={report.status}
            />

          </div>

          {/* DESCRIPTION */}

          <p className="mt-6 text-gray-600 leading-7">

            {report.description}

          </p>

          {/* BADGES */}

          <div className="flex gap-4 mt-6 flex-wrap">

            <span
              className={`px-4 py-2 rounded-full font-semibold ${severityColors[report.severity]}`}
            >
              {report.severity}
            </span>

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">

              {(report.confidence * 100).toFixed(
                0
              )}
              % Confidence

            </span>

            <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700">

              {report.department}

            </span>

          </div>

          {/* FOOTER */}

          <div className="grid grid-cols-4 gap-8 mt-8 border-t pt-6">

            <div>

              <div className="flex items-center gap-2 text-gray-400">

                <Calendar size={16} />

                Reported

              </div>

              <p className="font-semibold mt-2">
                {new Date(
                  report.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-gray-400">

                <CheckCircle2 size={16} />

                Verifications

              </div>

              <p className="font-semibold mt-2">
                {report.verificationCount}
              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-gray-400">

                <Building2 size={16} />

                Priority

              </div>

              <p className="font-semibold mt-2">
                {report.priorityScore}
              </p>

            </div>

            <div className="flex justify-end items-center">

              <button className="w-12 h-12 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition flex items-center justify-center">

                <ArrowRight size={22} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}