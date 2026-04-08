"use client";

import { DashCard } from "@/components/ui";
import { CHART_PALETTE } from "@/lib/constants";
import type { LanguageBreakdown } from "@/types";

interface TopLanguagesListProps { languages: LanguageBreakdown[]; }

export default function TopLanguagesList({ languages }: TopLanguagesListProps) {
  const subset = languages.slice(0, 6);

  return (
    <DashCard title="Top Languages">
      <div className="flex flex-col gap-3">
        {subset.map((lang, i) => (
          <div key={lang.language}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-heading">{lang.language}</span>
              <span className="text-muted">{lang.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashCard>
  );
}

