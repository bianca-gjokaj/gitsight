"use client";

import { DashCard } from "@/components/ui";
import { BRAND_COLORS } from "@/lib/constants";
import type { GitHubUser, RepoStats } from "@/types";

interface QuickStatsProps { user: GitHubUser; stats: RepoStats; languageCount: number; }

export default function QuickStats({ user, stats, languageCount }: QuickStatsProps) {
  const items = [
    { label: "Public Gists", value: user.public_gists, color: BRAND_COLORS.sage },
    { label: "Following", value: user.following, color: BRAND_COLORS.sky },
    { label: "Watchers", value: stats.totalWatchers, color: BRAND_COLORS.gold },
    { label: "Languages", value: languageCount, color: BRAND_COLORS.lavender },
  ];

  return (
    <DashCard title="Quick Stats">
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-heading">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </DashCard>
  );
}
