'use client';

import { DashCard, ChartContainer } from "../ui";
import { BarChart } from "../charts";
import { CHART_PALETTE } from "@/lib/constants";
import type { RepoSizeEntry } from "@/types";

interface SizeDistributionChartProps { sizeDistribution: RepoSizeEntry[]; }

export default function SizeDistributionChart ({ sizeDistribution }: SizeDistributionChartProps) {
  const subset = sizeDistribution.slice(0, 6);
  const chartData = {
    labels: subset.map((r) => r.name.length > 8 ? r.name.slice(0, 8) + '\u2026' : r.name),
    datasets: [{
      data: subset.map((r) => r.sizeKB),
      backgroundColor: CHART_PALETTE.slice(0, subset.length),
      borderRadius: 4, 
      borderSkipped: false as const,
      barPercentage: 0.5,
    }],
  };

  return (
    <DashCard title="Size Distribution" subtitle="MB per repo">
      <ChartContainer height="sm">
        <BarChart data={chartData} xFontSize={8} maxRotation={45}/>
      </ChartContainer>
    </DashCard>
  );
}
