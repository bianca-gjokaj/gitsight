"use client";

import { DashCard, ChartContainer } from "@/components/ui";
import { LineChart } from "@/components/charts";
import { BRAND_COLORS } from "@/lib/constants";
import type { CommitDataPoint } from "@/types";

interface CommitActivityChartProps { commitActivity: CommitDataPoint[]; }

export default function CommitActivityChart({ commitActivity }: CommitActivityChartProps) {
  const sampled = commitActivity.filter((_, i) => i % 4 === 0);
  const chartData = {
    labels: sampled.map((d) => d.label),
    datasets: [{
      label: "Commits",
      data: sampled.map((d) => d.commits),
      borderColor: BRAND_COLORS.orange,
      backgroundColor: BRAND_COLORS.orange + "20",
      fill: true, tension: 0.4,
      pointRadius: 3, pointHoverRadius: 6,
      pointBackgroundColor: BRAND_COLORS.orange, borderWidth: 2.5,
    }],
  };

  return (
    <DashCard title="Commit Activity" subtitle="Weekly commits over the past year">
      <ChartContainer height="md">
        <LineChart data={chartData} />
      </ChartContainer>
    </DashCard>
  );
}
