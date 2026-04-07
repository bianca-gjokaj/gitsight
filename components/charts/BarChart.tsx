'use client';


import { Bar } from 'react-chartjs-2';
import '@/lib/chartSetup';
import { tooltipStyle, standardScales } from '@/lib/chartConfig';
import type { ChartData, ChartOptions } from 'chart.js';

interface BarChartProps {
  data: ChartData<'bar'>;
  dark?: boolean;
  horizontal?: boolean;
  hideXGrid?: boolean;
  hideYGrid?: boolean;
  xFontSize?: number;
  yFontSize?: number;
  maxRotation?: number;
  options?: Partial<ChartOptions<'bar'>>;
}

export default function BarChart ({
  data,
  dark = false,
  horizontal = false,
  hideXGrid = true,
  hideYGrid = false,
  xFontSize,
  yFontSize,
  maxRotation,
  options: extraOptions,
}: BarChartProps) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ('y' as const) : ('x' as const),
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle<'bar'>(dark),
    },
    scales: standardScales(dark, { hideXGrid, hideYGrid, xFontSize, yFontSize, maxRotation }),
    ...extraOptions,
  };

  return <Bar data={data} options={options} />;
}