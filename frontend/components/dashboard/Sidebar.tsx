"use client";

import Link from "next/link";

import {
    LayoutDashboard,
    FileText,
    Trophy,
    Heart,
    Settings,
    Zap,
    Star,
    Shield
} from "lucide-react";

import SidebarItem from "./SidebarItem";

const menu = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Reports",
        href: "/reports",
        icon: FileText,
    },
    {
        title: "Leaderboard",
        href: "/leaderboard",
        icon: Trophy,
    },
    {
        title: "Gig Workers",
        href: "/workers",
        icon: Zap,
    },
    {
        title: "NGO Help",
        href: "/ngo",
        icon: Heart,
    },
    {
        title: "Rewards",
        href: "/rewards",
        icon: Star,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-72 min-h-screen bg-white border-r">

            <div className="px-8 py-10 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center">

                    <Shield className="text-white" />

                </div>

                <h1 className="text-3xl font-bold">
                    Actify
                </h1>

            </div>

            <nav className="space-y-2 px-5">

                {menu.map((item) => (
                    <SidebarItem
                        key={item.title}
                        {...item}
                    />
                ))}

            </nav>

        </aside>
    );
}