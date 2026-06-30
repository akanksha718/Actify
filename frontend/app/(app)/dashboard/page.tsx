// "use client";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";
// import StatsCard from "@/components/dashboard/StatsCard";
// import RecentActivity from "@/components/dashboard/RecentActivity";

// import {
//     FileText,
//     CircleCheckBig,
//     TrendingUp,
// } from "lucide-react";
// import { useState } from "react";

// export default function DashboardPage() {
//     const [xpp, setXpp] = useState<number>(0);
//     const [len, setLen] = useState<number>(0);
//     return (
//         <div className="flex p-2">

//             {/* <Sidebar /> */}

//             <main className="flex-1 p-5">

//                 {/* <Navbar setXpp={setXpp} /> */}

//                 <div className="grid lg:grid-cols-3 gap-1 mt-5">

//                     <StatsCard
//                         title="Total Reports"
//                         value={len}
//                         icon={FileText}
//                         color="bg-violet-600"
//                     />

//                     <StatsCard
//                         title="Resolved"
//                         value={0}
//                         icon={CircleCheckBig}
//                         color="bg-emerald-500"
//                     />

//                     <StatsCard
//                         title="Impact XP"
//                         value={xpp}
//                         icon={TrendingUp}
//                         color="bg-pink-500"
//                     />

//                 </div>

//                 <RecentActivity setLen={setLen} />

//             </main>

//         </div>
//     );
// }