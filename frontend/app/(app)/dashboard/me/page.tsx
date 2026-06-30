"use client"

import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useState, useEffect } from "react"
import { FileText, CircleCheckBig, TrendingUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const page = () => {
    const [len, setLen] = useState<number>(0);
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const [xp, setXp] = useState<number>(0);
    const [loadingXp, setLoadingXp] = useState(true);
    const [resolved, setResolved] = useState(0);


    useEffect(() => {
        if (!isLoaded || !user) return;

        const fetchXP = async () => {
            try {
                const token = await getToken();

                const res = await fetch(
                    `${API_URL}/api/users/${user?.id}/xp`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    const error = await res.text();

                    console.log("Status:", res.status);
                    console.log("Response:", error);

                    return;
                }

                const data = await res.json();
                setXp(data.xp);

            } catch (err) {
                console.error(err);
            } finally {
                setLoadingXp(false);
            }
        };

        fetchXP();
    }, [isLoaded, user]);


    useEffect(() => {
        if (!isLoaded || !user) return;

        const fetchStats = async () => {
            try {
                const token = await getToken();

                const res = await fetch(
                    `${API_URL}/api/stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) return;

                const data = await res.json();

                setLen(data.totalReports);
                setResolved(data.resolvedReports);

            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, [isLoaded, user]);





    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-1 mt-5">

                <StatsCard
                    title="Total Reports"
                    value={len}
                    icon={FileText}
                    color="bg-violet-600"
                />

                <StatsCard
                    title="Resolved"
                    value={resolved}
                    icon={CircleCheckBig}
                    color="bg-emerald-500"
                />

                <StatsCard
                    title="Impact XP"
                    value={xp}
                    icon={TrendingUp}
                    color="bg-pink-500"
                />

            </div>
            <RecentActivity setLen={setLen} />
        </div>
    )
}

export default page
