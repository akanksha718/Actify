import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: number;
    color: string;
    icon: LucideIcon;
}

export default function StatsCard({
    title,
    value,
    color,
    icon: Icon,
}: Props) {
    return (
        <div className="bg-white rounded-[12px] p-2 shadow-sm flex items-center gap-3">

            <div className={`w-24 h-24 rounded-3xl ${color} flex items-center justify-center`}>

                <Icon
                    size={40}
                    className="text-white"
                />

            </div>

            <div>

                <p className="uppercase text-slate-400 font-bold">

                    {title}

                </p>

                <h2 className="text-6xl font-bold mt-2">

                    {value}

                </h2>

            </div>

        </div>
    );
}