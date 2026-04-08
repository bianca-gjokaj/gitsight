"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import type { TimeRange } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  dark: boolean;
  onToggleTheme: () => void;
  activeNav: string;
  onNavChange: (id: string) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
  onSearch: (username: string) => void;
  avatarUrl?: string;
}

export default function DashboardLayout({
  children,
  dark,
  onToggleTheme,
  activeNav,
  onNavChange,
  timeRange,
  onTimeRangeChange,
  onSearch,
  avatarUrl,
}: DashboardLayoutProps) {
  return (
    <div
      className={`
        flex min-h-screen font-sans
        bg-background text-body
        transition-colors duration-300
        ${dark ? "dark" : ""}
      `}
    >
      <Sidebar
        activeNav={activeNav}
        onNavChange={onNavChange}
        dark={dark}
        onToggleTheme={onToggleTheme}
      />

      <div className="ml-[72px] flex-1 flex flex-col min-h-screen">
        <Header
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
          onSearch={onSearch}
          avatarUrl={avatarUrl}
        />
        <main className="flex-1 px-8 py-6 pb-10">{children}</main>
      </div>
    </div>
  );
}