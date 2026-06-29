"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Trophy, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      toast.error(event.message || "Something went wrong");
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      toast.error(
        event.reason?.message ||
          event.reason ||
          "Unexpected error occurred"
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleRejection
      );
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="relative grid min-h-screen lg:grid-cols-2">

        {/* Left */}
        <div className="hidden lg:flex flex-col justify-between px-16 py-12">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 backdrop-blur shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                AI Powered Civic Platform
              </span>
            </div>

            <h1 className="mt-8 text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Actify
              </span>
            </h1>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Become a Community Hero
            </h2>

            <p className="mt-8 max-w-lg text-xl leading-9 text-slate-600">
              Report potholes, broken streetlights, garbage, water leakage and
              other civic issues using AI. Earn XP, badges and help improve your
              city.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <FeatureCard
              icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
              title="Instant Reports"
              description="Capture an image and submit issues within seconds."
            />

            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-yellow-500" />}
              title="Earn Rewards"
              description="Gain XP, climb the leaderboard and unlock badges."
            />

            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-blue-500" />}
              title="Verified AI"
              description="AI analyzes images before creating reports."
            />

            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-purple-500" />}
              title="Smart Tracking"
              description="Track issue progress in real-time."
            />

          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6">

          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {icon}

      <h3 className="mt-4 text-xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default Layout;