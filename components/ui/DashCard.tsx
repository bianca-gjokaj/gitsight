interface DashCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DashCard({
  title,
  subtitle,
  children,
  className = "",
}: DashCardProps) {
  return (
    <div
      className={`rounded-lg p-card flex flex-col bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-200 ${className}`}
>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-heading">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}