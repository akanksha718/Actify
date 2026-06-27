import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

import {
    FileText,
    CircleCheckBig,
    TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex">

            <Sidebar />

            <main className="flex-1 p-10">

                <Navbar />

                <div className="grid lg:grid-cols-3 gap-8 mt-10">

                    <StatsCard
                        title="Total Reports"
                        value={9}
                        icon={FileText}
                        color="bg-violet-600"
                    />

                    <StatsCard
                        title="Resolved"
                        value={2}
                        icon={CircleCheckBig}
                        color="bg-emerald-500"
                    />

                    <StatsCard
                        title="Impact XP"
                        value={45}
                        icon={TrendingUp}
                        color="bg-pink-500"
                    />

                </div>

                <RecentActivity />

            </main>

        </div>
    );
}