"use client";

import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  imageUrl?: string | null;
  xp: number;
  level: number;
  reports: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`);

        const data = await res.json();

        if (data.success) {
          setUsers(data.leaderboard);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-6 mb-12">
          <div className="h-20 w-20 rounded-3xl bg-amber-50 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-amber-500" />
          </div>

          <div>
            <h1 className="text-5xl font-bold">
              Community Leaderboard
            </h1>

            <p className="text-2xl text-gray-400 mt-2">
              Top contributors
            </p>
          </div>
        </div>

        {/* Users */}

        <div className="space-y-5">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">

                <div className="flex items-center gap-6">

                  <div className="h-16 w-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-bold">
                    {user.rank}
                  </div>

                  <img
                    src={user.imageUrl || "/avatar.png"}
                    className="h-16 w-16 rounded-full object-cover"
                    alt={user.name}
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.name}
                    </h2>

                    <p className="text-gray-400">
                      Level {user.level}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-3xl font-bold text-indigo-600">
                    {user.xp} XP
                  </h3>

                  <p className="text-gray-400">
                    {user.reports} Reports
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}