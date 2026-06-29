"use client";

import { useEffect, useState } from "react";
import { RotateCw, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Navbar({ setXpp }: any) {
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
        <div className="flex h-13 items-center justify-between">

            <div>

                <h1 className="text-4xl font-bold">
                    Hi,
                    <span className="text-violet-600">
                        {" "}
                        {user?.firstName || "Citizen"}
                    </span>
                </h1>

                <p className="mt-2 text-xl text-slate-400">
                    Your Impact:
                    <span className="text-violet-600 font-bold">
                        {" "}
                        {loadingXp ? "..." : `${xp} XP`}
                    </span>
                </p>

            </div>

            <div className="flex gap-3">

                {/* <button className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center">
                    <RotateCw />
                </button> */}

                <Button
                size="lg"
                 className="border text-white rounded-2xl px-4 flex items-center ">
                    <Link
                        href="/analysis"
                        className="group flex items-center gap-2 text-sm font-medium text-white transition hover:text-blue-600"
                    >
                        <Plus size={18} />
                        New Report

                    </Link>
                </Button>

            </div>

        </div>
    );
}