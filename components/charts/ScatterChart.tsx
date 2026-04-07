'use client';

import { Scatter } from 'react-chartjs-2';
import '@/lib/chartSetup';
import { tooltipStyle, axisStyle } from '@/lib/chartConfig';  
import type { ChartData, ChartOptions } from 'chart.js';

interface ScatterChartProps {
  data: ChartData<'scatter'>;
  dark?: boolean;
  xLabel?: string;
  yLabel?: string;
  tooltipCallback?: (dataIndex: number) => string;
  options?: Partial<ChartOptions<'scatter'>>;
}

export default function ScatterChart({
  data,
  dark = false,
  xLabel = 'X',
  yLabel = 'Y',
  tooltipCallback,
  options: extraOptions,
}: ScatterChartProps) {
  const { textColor, gridColor } = axisStyle(dark);

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipStyle<'scatter'>(dark),
        callbacks: tooltipCallback
        ? { 
          label: (ctx) => tooltipCallback(ctx.dataIndex),
        }
        : undefined,
      },
    },
    scales: {
      x: {
        title: { display: true, text: xLabel, color: textColor, font: { size: 11}},
        grid: { color: gridColor },
        ticks: { color: textColor, font: {size: 10} },
      },
      y: {
        title: { display: true, text: yLabel, color: textColor, font: { size: 11}},
        grid: { color: gridColor },
        ticks: { color: textColor, font: {size: 10} },
      }
    },
    ...extraOptions,
  };

  return <Scatter data={data} options={options} />;
}
