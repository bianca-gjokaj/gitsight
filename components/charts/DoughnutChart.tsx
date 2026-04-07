"use client";

import { Doughnut } from "react-chartjs-2";
import "@/lib/chartSetup";
import { tooltipStyle } from "@/lib/chartConfig"; 
import type { ChartData, ChartOptions } from "chart.js";

interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  dark?: boolean;
  cutout?: string;
  options?: ChartOptions<"doughnut">;
}

export default function DoughnutChart({
  data,
  dark = false,
  cutout = "62%",
  options: extraOptions,
}: DoughnutChartProps) {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle<'doughnut'>(dark),
    },
    ...extraOptions,
  };

  return <Doughnut data={data} options={options} />;
}
