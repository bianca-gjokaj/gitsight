"use client";

import { DashCard, ChartContainer } from "@/components/ui";
import { BarChart } from "@/components/charts";
import { CHART_PALETTE } from "@/lib/constants";
import type { GitHubRepo } from "@/types";

interface TopReposChartProps { repos: GitHubRepo[]; }

export default function TopReposChart({ repos }: TopReposChartProps) {
  const chartData = {
    labels: repos.map((r) => r.name.length > 14 ? r.name.slice(0, 14) + "\u2026" : r.name),
    datasets: [{
      label: "Stars",
      data: repos.map((r) => r.stargazers_count),
      backgroundColor: repos.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
      borderRadius: 6, borderSkipped: false as const, barPercentage: 0.6,
    }],
  };

  return (
    <DashCard title="Top Repositories" subtitle="Ranked by stars">
      <ChartContainer height="lg">
        <BarChart data={chartData} horizontal />
      </ChartContainer>
    </DashCard>
  );
}