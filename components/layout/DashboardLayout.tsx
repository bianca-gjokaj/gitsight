"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { TimeRange } from "@/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timeRange, setTimeRange] = useState<TimeRange>("365");

  return (
    <div className="flex min-h-screen font-sans bg-background text-body transition-colors duration-300">
      <Sidebar />
      <div className="ml-[72px] flex-1 flex flex-col min-h-screen">
        <Header timeRange={timeRange} onTimeRangeChange={setTimeRange}/>
        <main className="flex-1 px-8 py-6 pb-10">{children}</main>
      </div>
    </div>
  );
}