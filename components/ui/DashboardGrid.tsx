interface DashboardGridProps {
  columns: string;
  children: React.ReactNode;
  className?: string;
}

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