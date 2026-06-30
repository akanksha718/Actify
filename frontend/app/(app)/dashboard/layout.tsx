"use client"
import { useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const DashBoardAppLayout = ({ children }: { children: React.ReactNode }) => {
    const [xpp, setXpp] = useState<number>(0);
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex p-2">
            <main className="flex-1 p-5">
                <Navbar
                    setXpp={setXpp}
                    setOpenSidebar={setOpenSidebar}
                />

                <Sidebar
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                />
                {children}
            </main>
        </div>
    );
}

export default DashBoardAppLayout;