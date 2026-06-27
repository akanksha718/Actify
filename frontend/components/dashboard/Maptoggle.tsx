"use client";

import { List, Map } from "lucide-react";

export default function MapToggle() {
  return (
    <div className="bg-white rounded-2xl p-2 flex shadow-sm">

      <button className="px-6 py-3 rounded-xl bg-violet-600 text-white flex items-center gap-2">
        <List size={18} />
        List
      </button>

      <button className="px-6 py-3 rounded-xl text-gray-500 flex items-center gap-2">
        <Map size={18} />
        Map
      </button>

    </div>
  );
}