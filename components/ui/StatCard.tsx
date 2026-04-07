import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  Icon: LucideIcon;
  color: string;
}

export default function StatCard ({ label, value, Icon, color}: StatCardProps) {
  const displayValue = 
  typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="rounded-lg p-card flex items-center gap-4 bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-default"
    >
      <div className="w-11 h-11 rounded-md flex items-center justify-center shrink-0" style={{backgroundColor: `${color}18`, color}}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-heading mt-0.5 leading-tight">
          {displayValue}
        </p>
      </div>
    </div>
  );
}