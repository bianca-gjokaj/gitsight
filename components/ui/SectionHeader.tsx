interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // right-side actions slot
}

export default function SectionHeader({
  title,
  subtitle,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-section">
      <div>
        <h2 className="text-lg font-semibold text-heading">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
