"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinned } from "lucide-react";

const Map = dynamic(
  () => import("./map"),
  {
    ssr: false,
  }
);

interface Props {
  latitude: number;
  longitude: number;
  address: string;
}

export function MapCard({
  latitude,
  longitude,
  address,
}: Props) {
  return (
    <Card className="rounded-3xl border-0 bg-white/60 shadow-xl backdrop-blur-xl dark:bg-zinc-900/60">

      <CardContent className="p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Live Map
          </h2>

          <MapPinned className="text-blue-600" />

        </div>

        <div className="h-[320px] overflow-hidden rounded-2xl">

          <Map
            lat={latitude}
            lng={longitude}
            address={address}
          />

        </div>

      </CardContent>

    </Card>
  );
}