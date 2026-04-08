interface DashboardGridProps {
  columns: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized grid wrapper for dashboard rows.
 * Enforces consistent gap (--spacing-grid) across all grid layouts.
 *
 * @param columns - Tailwind grid-cols value, e.g. "grid-cols-4" or "grid-cols-[2fr_1fr]"
 */
export default function DashboardGrid({
  columns,
  children,
  className = "",
}: DashboardGridProps) {
  return (
    <div className={`grid ${columns} gap-grid mb-section ${className}`}>
      {children}
    </div>
  );
}