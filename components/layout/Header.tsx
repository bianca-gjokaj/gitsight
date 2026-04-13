"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { IconButton } from "@/components/ui";
import { useGitHub } from "@/providers";
import { TIME_RANGE_OPTIONS, NAV_ITEMS } from "@/lib/constants";
import type { TimeRange } from "@/types";
import Image from "next/image";

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
}

export default function Header({ timeRange, onTimeRangeChange }: HeaderProps) {
  const pathname = usePathname();
  const { data, loadUser } = useGitHub();
  const [inputValue, setInputValue] = useState("torvalds");

  const handleSubmit = () => {
    if (inputValue.trim()) loadUser(inputValue.trim());
  };

  // Derive page title from current route
  const currentNav = NAV_ITEMS.find((item) => pathname.startsWith(item.href));
  const pageTitle = currentNav?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 h-16 px-8 flex items-center gap-4 border-b border-border bg-card-elevated">
      <h1 className="text-lg font-semibold text-heading">{pageTitle}</h1>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3 text-muted pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="GitHub username…"
          className="
            w-56 pl-9 pr-3 py-2 rounded-md text-sm
            border border-border bg-card text-heading
            placeholder-muted outline-none
            focus:ring-2 focus:ring-primary/30 transition-colors
          "
        />
        <button
          onClick={handleSubmit}
          className="
            ml-2 px-4 py-2 rounded-md text-sm font-semibold
            bg-primary text-white border-none cursor-pointer
            hover:bg-primary-hover active:scale-[0.97]
            transition-all duration-150
          "
        >
          Analyze
        </button>
      </div>

      {/* Time range */}
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
        className="px-3 py-2 rounded-md text-xs border border-border bg-card text-heading cursor-pointer outline-none"
      >
        {TIME_RANGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Bell */}
      <IconButton badge title="Notifications">
        <Bell size={16} />
      </IconButton>

      {/* Avatar */}
      {data?.user.avatar_url && (
        <Image
          src={data.user.avatar_url}
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-md border-2 border-primary object-cover"
        />
      )}
    </header>
  );
}