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

    onVerify: (id: string) => void;

}

export default function CummunityCard({
    report,
    onVerify
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

            <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">

                {/* IMAGE */}

                <img
                    src={report.imageUrl}
                    alt={report.category}
                    className="h-56 w-full rounded-2xl object-cover sm:h-72 lg:h-40 lg:w-40 lg:rounded-3xl"
                />

                {/* INFO */}

                <div className="flex-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        <div>
                            <h2 className="text-2xl font-bold capitalize sm:text-3xl">
                                {report.category}
                            </h2>

                            <div className="mt-3 flex items-start gap-2 text-sm text-gray-500 sm:text-base">

                                <MapPin size={18} />

                                {report.address}

                            </div>

                        </div>

                        <ReportStatus
                            status={report.status}
                        />

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">

                        {report.description}

                    </p>

                    {/* BADGES */}

                    <div className="mt-6 flex flex-wrap gap-3">

                        <span
                            className={`rounded-full px-3 py-2 text-sm font-semibold sm:px-4 ${severityColors[report.severity]}`}
                        >
                            {report.severity}
                        </span>

                        <span className="rounded-full px-3 py-2 text-sm font-semibold sm:px-4">

                            {(report.confidence * 100).toFixed(
                                0
                            )}
                            % Confidence

                        </span>

                        <span className="rounded-full px-3 py-2 text-sm font-semibold sm:px-4">

                            {report.department}

                        </span>

                    </div>

                    {/* FOOTER */}

                    <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 lg:grid-cols-4">

                        <div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">

                                <Calendar size={16} />

                                Reported

                            </div>

                            <p className="mt-2 text-sm font-semibold sm:text-base">
                                {new Date(
                                    report.createdAt
                                ).toLocaleDateString()}
                            </p>

                        </div>

                        <div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">

                                <CheckCircle2 size={16} />

                                Verifications

                            </div>

                            <p className="mt-2 text-sm font-semibold sm:text-base">
                                {report.verificationCount}
                            </p>

                        </div>

                        <div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">

                                <Building2 size={16} />

                                Priority

                            </div>

                            <p className="mt-2 text-sm font-semibold sm:text-base">
                                {report.priorityScore}
                            </p>

                        </div>

                        <div className="col-span-2 flex justify-end lg:col-span-1">

                            {/* <button className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-700 sm:h-12 sm:w-12">

                <ArrowRight size={22} />

              </button> */}
                            <div className="col-span-2 flex justify-end lg:col-span-1">

                                <button

                                    onClick={() => onVerify(report.id)}

                                    className="rounded-xl bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition"

                                >

                                    Verify Report

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}