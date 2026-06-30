"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const MultiMap = dynamic(() => import("./MultiMap"), {
  ssr: false,
});

interface ReportLocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  category: string;
  severity: string;
}

export default function CommunityMap({
  reports,
}: {
  reports: ReportLocation[];
}) {
  return (
    <Card className="mb-8 rounded-3xl">
      <CardContent className="p-5">

        <h2 className="text-2xl font-bold mb-4">
          Community Report Map
        </h2>

        <div className="h-[500px] rounded-3xl overflow-hidden">

          <MultiMap reports={reports} />

        </div>

      </CardContent>
    </Card>
  );
}