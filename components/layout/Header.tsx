'use client';

import { useState } from "react";
import { Search, Bell } from 'lucide-react'
import { IconButton } from "../ui";
import { TIME_RANGE_OPTIONS } from "@/lib/constants";
import type { TimeRange } from "@/types";
import Image from "next/image";

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
  onSearch: (username: string) => void;
  avatarUrl?: string;
  defaultUsername?: string;
}

export default function Header ({
  timeRange,
  onTimeRangeChange,
  onSearch,
  avatarUrl,
  defaultUsername = 'torvalds',
}: HeaderProps) {
  const [inputValue, setInputValue] = useState(defaultUsername);

  const handleSubmit = () => {
    if (inputValue.trim()) onSearch(inputValue.trim());
  };

  return (
    <header className="sticky top-0 z-40 h-16 px-8 flex items-center gap-4 border-b border-border bg-card-elevated">
      <h1 className="text-lg font-semibold text-heading">Dashboard</h1>

      <div className="flex-1"/>

      {/* Search */}
      <div className="relative flex items-center">
        <Search
        size={16}
        className="absolute left-3 text-muted pointer-events-none"
        />
        <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Github Username..."
        className="w-56 pl-9 pr-3 py-2 rounded-md text-sm border border-border bg-card text-heading placeholder-muted outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
        />
        <button
        onClick={handleSubmit}
        className="ml-2 px-4 py-2 rounded-md text-sm font-semibold bg-primary text-white border-none cursor-pointer hover:bg-primary-hover active:scale-[0.97] transition-all duration-150"
        >
          Analyze
        </button>
      </div>

      {/* Time Range */}
      <select 
      value={(timeRange)}
      onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
      className="
      px-3 py-2 rounded-md text-xs border border-border bg-card text-heading cursor-pointer outline-none
      "
      >
        {TIME_RANGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.value}
          </option>
        ))}
      </select>

      {/* Notification */}
      <IconButton badge title="Notifications">
        <Bell size={16}/>
      </IconButton>

      {/* Avatar */}
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-md border-2 border-primary object-cover"
        />
      )}
    </header>
  );
}