import React from "react";
import { CheckCircle2, Trophy } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full  grid lg:grid-cols-2 bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-between p-9 bg-slate-50">
        <div>
          <h1 className="text-7xl font-extrabold leading-tight text-black">
            <div>Actify</div>
            <span className="text-gray-600 text-3xl font-semibold">
              Become a Community Hero
            </span>
            <br />
          </h1>

          <p className="mt-12 text-2xl text-slate-700 max-w-xl">
            Join thousands of citizens making a difference.
          </p>

          <p className="mt-3 text-2xl text-slate-700 max-w-xl">
            Report issues, earn XP, and transform your city.
          </p>
        </div>

        <div className="flex gap-20 pb-10">
          <div>
            <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="font-bold text-2xl text-blue-950">Instant Reports</h3>
            <p className="text-slate-500 mt-2">
              Snap and submit issues in seconds
            </p>
          </div>

          <div>
            <Trophy className="h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="font-bold text-2xl text-blue-950">Earn Rewards</h3>
            <p className="text-slate-500 mt-2">
              Get recognized for your impact
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;