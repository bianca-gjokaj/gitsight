interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-xs font-semibold
        transition-all duration-150 border-none cursor-pointer
        ${
          active
            ? "bg-primary text-white"
            : "bg-transparent text-muted border border-border hover:text-heading"
        }
      `}
    >
      {label}
    </button>
  );
}