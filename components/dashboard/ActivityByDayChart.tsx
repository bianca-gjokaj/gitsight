'use client';

import { DashCard, ChartContainer } from "../ui";
import { BarChart } from "../charts";
import { BRAND_COLORS } from "@/lib/constants";
import type { DayActivity } from "@/types";

interface ActivityByDayChartProps {
  activityByDay: DayActivity[];
}

export default function activityByDayChart({ activityByDay}: ActivityByDayChartProps){
  const chartData = {
    labels: activityByDay.map((d) => d.day),
    datasets: [{
      label: 'Contributions',
      data: activityByDay.map((d) => d.contributions),
      backgroundColor: activityByDay.map((_, i) => 
        i === 0 || i === 6 ? BRAND_COLORS.rose + '80' : BRAND_COLORS.teal + 'cc'
      ),
      borderRadius: 6,
      borderSkipped: false as const,
      barPercentage: 0.55,
    }],
  };

  return (
    <DashCard title="Activity by Day" subtitle="Weekly patter">
      <ChartContainer height="sm">
        <BarChart data={chartData} xFontSize={11}/>
      </ChartContainer>
    </DashCard>
  );
}
