"use client";

import { DashCard, ChartContainer } from "@/components/ui";
import { LineChart } from "@/components/charts";
import { BRAND_COLORS } from "@/lib/constants";
import type { MonthlyTrend } from "@/types";

interface ContributionTrendsChartProps { monthlyTrend: MonthlyTrend[]; }

export default function ContributionTrendsChart({ monthlyTrend }: ContributionTrendsChartProps) {
  const chartData = {
    labels: monthlyTrend.map((d) => d.month),
    datasets: [
      {
        label: "Commits", data: monthlyTrend.map((d) => d.commits),
        borderColor: BRAND_COLORS.teal, backgroundColor: BRAND_COLORS.teal + "15",
        fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 7,
        pointBackgroundColor: BRAND_COLORS.teal, borderWidth: 2.5,
      },
      {
        label: "Issues", data: monthlyTrend.map((d) => d.issues),
        borderColor: BRAND_COLORS.rose, backgroundColor: BRAND_COLORS.rose + "15",
        fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 7,
        pointBackgroundColor: BRAND_COLORS.rose, borderWidth: 2.5,
      },
    ],
  };

  return (
    <DashCard title="Contribution Trends" subtitle="Commits & issues by month">
      <ChartContainer height="md">
        <LineChart data={chartData} showLegend />
      </ChartContainer>
    </DashCard>
  );
}
