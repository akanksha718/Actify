"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
    href,
    title,
    icon: Icon,
}: any) {
    const pathname = usePathname();

    const active = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-4 rounded-2xl px-6 py-4 transition-all

            ${
                active
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-slate-500 hover:bg-violet-50"
            }`}
        >
            <Icon size={22} />

            <span className="font-semibold text-lg">
                {title}
            </span>
        </Link>
    );
}