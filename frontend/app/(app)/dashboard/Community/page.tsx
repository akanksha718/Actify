"use client"

import React from 'react'
import { Report } from "@/types/report";
import { useState, useEffect } from "react"
import CommunityCard from "@/components/dashboard/CummunityCard"
import { getToken } from '@clerk/nextjs';
import {toast} from "sonner"
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const page = () => {
    const [reports, setReports] = useState<Report[]>([]);
    useEffect(() => {

        const fetchReports = async () => {

            const token = await getToken();

            const res = await fetch(

                `${API_URL}/api/verification/feed`,

                {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }

            );

            const data = await res.json();

            setReports(data);

        };

        fetchReports();

    }, []);
    const verifyReport = async (id: string) => {

        const token = await getToken();

        const res = await fetch(

            `${API_URL}/api/verification/${id}`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            }

        );

        if (res.ok) {
            toast("Verified");

            setReports((prev) =>
                prev.filter((r) => r.id !== id)
            );

        }

    };

    return (
        <section className="mt-10 sm:mt-14 lg:mt-16">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                        Community Reports
                    </h2>
                    <p className="mt-2 text-base text-gray-400 sm:text-lg lg:text-xl">
                        Monitor the civic reports
                    </p>

                </div>

            </div>

            <div className="space-y-6 lg:space-y-8">

                {reports.map((report) => (
                    <CommunityCard

                        key={report.id}

                        report={report}

                        onVerify={verifyReport}

                    />
                ))}

            </div>

        </section>
    );
}


export default page
