interface ChartContainerProps {
  height?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const HEIGHT_MAP = {
  sm: 'h-[160px]',
  md: 'h-[180px]',
  lg: 'h-[220px]'
} as const;

export default function ChartContainer ({
  height = 'md',
  children,
  className = '',
}: ChartContainerProps) {
  return (
    <div className={`${HEIGHT_MAP[height]} ${className}`}>
      {children}
    </div>
  );
}