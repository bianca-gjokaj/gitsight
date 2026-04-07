'use client';

import { DashCard, ChartContainer } from "../ui";
import { ScatterChart } from "../charts";
import { BRAND_COLORS } from "@/lib/constants";
import type { GitHubRepo } from "@/types";

interface StarsVsForksChartProps { repos: GitHubRepo[];}

export default function StarsVsForksChart({repos}: StarsVsForksChartProps) {
  const subset = repos.slice(0, 30);
  const chartData = {
    datasets: [{
      label: "Repos",
      data: subset.map((r) => ({ x: r.stargazers_count, y: r.fork_counts})),
      backgroundColor: BRAND_COLORS.orange + 'aa',
      pointRadius: 6,
      pointHoverRadius: 10,
    }],
  };

  return (
    <DashCard title="Stars Vs Forks" subtitle="Repository correlation">
      <ChartContainer height="sm">
        <ScatterChart 
        data={chartData}
        xLabel="Stars"
        yLabel="Forks"
        tooltipCallback={(i) => {
          const r = subset[i];
          return r ? `${r.name}: ${r.stargazers_count}\u2605 / ${r.fork_counts} forks` : '';
        }}
        />
      </ChartContainer>
    </DashCard>
  )
}