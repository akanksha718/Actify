"use client";

import {
  Calendar,
  Shield,
  MapPin,
  ArrowRight,
  Zap,
} from "lucide-react";

import { Report } from "@/types/report";
import ReportStatus from "./ReportStatus";

interface Props {
  report: Report;
}

export default function ReportCard({ report }: Props) {
  return (
    <div className="bg-white rounded-[35px] p-8 shadow-sm hover:shadow-lg transition-all">

      <div className="flex justify-between items-center">

        <div className="flex gap-6">

          <div className="w-28 h-28 rounded-3xl bg-gray-100 flex items-center justify-center">

            <MapPin className="text-gray-400" size={40} />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {report.title}
            </h2>

            <div className="flex gap-6 mt-5 text-gray-500">

              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {report.date}
              </span>

              <span className="flex items-center gap-2">
                <Shield size={18} />
                {report.category}
              </span>

              <span className="flex items-center gap-2 text-violet-600 font-semibold">
                <Zap size={18} />
                {report.severity}
              </span>

            </div>

          </div>

        </div>

        <div className="flex gap-5 items-center">

          <ReportStatus status={report.status} />

          <button className="bg-violet-600 text-white rounded-2xl px-6 py-4 font-semibold hover:bg-violet-700">

            FAST TRACK

          </button>

          <button className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">

            <ArrowRight />

          </button>

        </div>

      </div>

    </div>
  );
}