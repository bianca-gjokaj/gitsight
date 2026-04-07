'use client';

import { Line } from 'react-chartjs-2';
import '@/lib/chartSetup';
import { tooltipStyle, standardScales, axisStyle } from '@/lib/chartConfig';
import type { ChartData, ChartOptions } from 'chart.js';

interface LineChartProps {
  data: ChartData<'line'>;
  dark?: boolean;
  showLegend?: boolean;
  hideXAxis?: boolean;
  options?: Partial<ChartOptions<'line'>>;
}

export default function LineChart ({
  data,
  dark = false,
  showLegend = false,
  hideXAxis = false,
  options: extraOptions,
}: LineChartProps ) {
  const { textColor, gridColor } = axisStyle(dark);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: showLegend
        ? {
          display: true,
          position: 'top' as const,
          align: 'end' as const,
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 16,
            font: { size: 11 },
          },
        }
      : { display: false },
        tooltip: tooltipStyle<"line">(dark)
    },
    scales: hideXAxis
    ? {
      x: { display: false },
      y: {
        grid: { color: gridColor},
        ticks: { color: textColor, font: { size: 9 } },
      },
    }
    : (standardScales(dark)),
    ...extraOptions,
  };

  return <Line data={data} options={options} />;
}