import type { ChartOptions, TooltipOptions, ChartType } from 'chart.js';

// Build shared tooltip styling that adapts to dark/light mode

export function tooltipStyle<T extends ChartType>(dark: boolean): Partial<TooltipOptions<T>> {
  return {
    backgroundColor: dark ? "#2a2a3e" : "#ffffff",
    titleColor: dark ? "#e8e8f0" : "#1a1a2e",
    bodyColor: dark ? "#bbb" : "#666",
    borderColor: dark ? "#3a3a4e" : "#eee",
    borderWidth: 1,
    cornerRadius: 10,
    padding: 12,
    titleFont: {
      family: "'DM Sans', sans-serif",
      weight: 600,
      size: 12,
    },
    bodyFont: {
      family: "'DM Sans', sans-serif",
      size: 11,
    },
  };
}

// Common Axis Styling For Category/Linear scales
export function axisStyle(dark: boolean) {
  const textColor = dark ? '#8888a0' : '#999';
  const gridColor = dark ? '#2a2a3e' : '#f0f0f0';
  return { textColor, gridColor };
}

// Build Standard xy scale options
export function standardScales (
  dark: boolean,
  options?: {
    hideXGrid?: boolean;
    hideYGrid?: boolean;
    xFontSize?: number;
    yFontSize?: number;
    maxRotation?: number;
  }
) : ChartOptions<'bar' | 'line' | 'scatter'>['scales'] {
  const {textColor, gridColor} = axisStyle(dark);
  return {
    x: {
      grid: {display: !(options?.hideXGrid ?? true), color: gridColor},
      ticks: {
        color: textColor,
        font: { size: options?.xFontSize ?? 10 },
        maxRotation: options?.maxRotation ?? 0,
      },
    },
    y: {
      grid: {display: !(options?.hideYGrid ?? false), color: gridColor},
      ticks: {
        color: textColor,
        font: { size: options?.yFontSize ?? 10 },
      },
    },
  };
}