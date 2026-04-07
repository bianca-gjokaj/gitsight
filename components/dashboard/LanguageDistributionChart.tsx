'use client';

import { DashCard, ChartContainer } from "../ui";
import { DoughnutChart } from "../charts";
import { CHART_PALETTE } from "@/lib/constants";
import type { LanguageBreakdown } from "@/types";
import type { ChartData, TooltipItem } from "chart.js";

interface LanguageDistributionChartProps {
  languages: LanguageBreakdown[];
}

export default function LanguageDistributionChart({
  languages,
}: LanguageDistributionChartProps) {
  const topLang = languages[0];

  const chartData: ChartData<"doughnut"> = {
    labels: languages.map((l) => l.language),
    datasets: [
      {
        data: languages.map((l) => l.count),
        backgroundColor: CHART_PALETTE.slice(0, languages.length),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <DashCard title="Language Distribution" subtitle="Across all repos">
      <div className="relative">
        <ChartContainer height="sm">
          <DoughnutChart
            data={chartData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx: TooltipItem<"doughnut">) => {
                      const lang = languages[ctx.dataIndex];
                      return `${lang.language}: ${lang.count} repos (${lang.percentage}%)`;
                    },
                  },
                },
              },
            }}
          />
        </ChartContainer>

        {topLang && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-xl font-bold text-primary leading-tight">
              {topLang.percentage}%
            </p>
            <p className="text-xs text-muted">{topLang.language}</p>
          </div>
        )}
      </div>
    </DashCard>
  );
}