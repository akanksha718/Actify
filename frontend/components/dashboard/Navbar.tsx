"use client";

import { useEffect, useState } from "react";
import { RotateCw, Plus, Menu } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface NavbarProps {
    setXpp: any;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
    setXpp,
    setOpenSidebar,
}: NavbarProps) {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const [xp, setXp] = useState<number>(0);
    const [loadingXp, setLoadingXp] = useState(true);


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
                setXpp(data.xp);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingXp(false);
            }
        };

        fetchXP();
    }, [isLoaded, user]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Hi,
                    <span className="text-violet-600">
                        {" "}
                        {user?.firstName || "Citizen"}
                    </span>
                </h1>

                <p className="mt-2 text-base text-slate-400 sm:text-lg lg:text-xl">
                    Your Impact:
                    <span className="font-bold text-violet-600">
                        {" "}
                        {loadingXp ? "..." : `${xp} XP`}
                    </span>
                </p>
            </div>

            {/* Right */}
            <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end gap-3">
                <Button
                    size="lg"
                    className="rounded-2xl px-5"
                >
                    <Link
                        href="/analysis"
                        className="flex items-center gap-2 text-white"
                    >
                        <Plus size={18} />
                        New Report
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setOpenSidebar(true)}
                >
                    <Menu size={22} />
                </Button>
            </div>
        </div>
    );
}