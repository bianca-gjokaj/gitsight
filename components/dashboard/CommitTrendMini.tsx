"use client";

import { DashCard, ChartContainer } from "@/components/ui";
import { LineChart } from "@/components/charts";
import { BRAND_COLORS } from "@/lib/constants";
import type { MonthlyTrend } from "@/types";

interface CommitTrendMiniProps { monthlyTrend: MonthlyTrend[]; }

export default function CommitTrendMini({ monthlyTrend }: CommitTrendMiniProps) {
  const chartData = {
    labels: monthlyTrend.map((d) => d.month),
    datasets: [{
      data: monthlyTrend.map((d) => d.commits),
      borderColor: BRAND_COLORS.orange,
      backgroundColor: BRAND_COLORS.orange + "20",
      fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2,
    }],
  };

  return (
    <DashCard title="Commit Trend" subtitle="Monthly commits">
      <ChartContainer height="sm">
        <LineChart data={chartData} hideXAxis />
      </ChartContainer>
    </DashCard>
  );
}