"use client";

import { DashboardLayout } from "@/components/layout";
import { useGitHub } from "@/providers";
import { useState, useEffect } from "react";
import { TimeRange } from "@/types";


const DEFAULT_USERNAME = "torvalds";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loadUser } = useGitHub();
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [timeRange, setTimeRange] = useState<TimeRange>("365");
  

  // Load default user if no data yet
  useEffect(() => {
    if (!data) {
      loadUser(DEFAULT_USERNAME);
    }
  }, [data, loadUser]);

  return (
    <DashboardLayout
      dark={dark}
      onToggleTheme={() => setDark((d) => !d)}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      onSearch={loadUser}
      avatarUrl={data?.user?.avatar_url}
    >
      {children}
    </DashboardLayout>
  );
}