interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  active?: boolean;
  badge?: boolean;
  className?: string;
}

export default function IconButton ({
  children,
  onClick,
  title,
  active = false, 
  badge = false,
  className = '',
}: IconButtonProps) {
  return (
    <button
    onClick={onClick}
    title={title}
    className={`relative w-10 h-10 rounded-md flex items-center justify-center border-none cursor-pointer transition-all duration-150 
      ${
        active
          ? 'bg-primary text-white'
          : 'bg-card text-muted border border-border hover:text-heading hover:bg-card-elevated'
      } ${className}
      `}
    >
      {children}
      {badge && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"/>
      )}
    </button>
  );
}