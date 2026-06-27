"use client";

import { RotateCw, Plus } from "lucide-react";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-6xl font-bold">

                    Hi,

                    <span className="text-violet-600">
                        {" "}Akanksha!
                    </span>

                </h1>

                <p className="mt-2 text-xl text-slate-400">

                    Your Impact:

                    <span className="text-violet-600 font-bold">
                        {" "}45 XP
                    </span>

                </p>

            </div>

            <div className="flex gap-4">

                <button className="w-16 h-16 rounded-2xl bg-white shadow">

                    <RotateCw />

                </button>

                <button className="bg-black text-white rounded-2xl px-8 flex items-center gap-3">

                    <Plus />

                    New Report

                </button>

            </div>

        </div>
    );
}