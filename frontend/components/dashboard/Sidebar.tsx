"use client";

import Link from "next/link";

import {
    FileText,
    Trophy,
    Heart,
    Settings,
    Zap,
    Star,
    Shield,
    X,
    PanelTopClose,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import SidebarItem from "./SidebarItem";

const menu = [
    {
        title: "My Reports",
        href: "/dashboard/me",
        icon: FileText,
    },
    {
        title:"Community Reports",
        href: "/dashboard/Community",
        icon: PanelTopClose

    },
    {
        title: "Leaderboard",
        href: "/dashboard/leaderboard",
        icon: Trophy,
    },
    {
        title: "Rewards",
        href: "/dashboard/rewards",
        icon: Star,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

interface SidebarProps {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
    openSidebar,
    setOpenSidebar,
}: SidebarProps) {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setOpenSidebar(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                ${openSidebar
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            />

            {/* Sidebar */}
         
            <aside
    className={`fixed top-0 right-0 z-50 h-screen
    w-[85%] sm:w-80 lg:w-96
    bg-white border-l shadow-2xl
    transform transition-transform duration-300 ease-in-out
    flex flex-col
    ${openSidebar ? "translate-x-0" : "translate-x-full"}`}
>
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-5 border-b">
        <h1 className="text-2xl font-bold">Actify</h1>

        <button
            onClick={() => setOpenSidebar(false)}
            className="rounded-lg p-2 hover:bg-slate-100 transition"
        >
            <X size={24} />
        </button>
    </div>

    {/* Menu */}
    <nav className="flex-1 space-y-2 px-5 py-6 overflow-y-auto">
        {menu.map((item) => (
            <SidebarItem
                key={item.title}
                {...item}
            />
        ))}
    </nav>

    {/* Bottom User Section */}
    <div className="mt-auto border-t px-5 py-4">
        <div className="flex items-center gap-3">
            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "h-10 w-10",
                    },
                }}
            />
            <div>
                <p className="font-medium">Account</p>
                <p className="text-sm text-gray-500">
                    Manage your profile
                </p>
            </div>
        </div>
    </div>
</aside>
        </>
    );
}