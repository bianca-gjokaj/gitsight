'use client';

import { LayoutDashboard, BookOpen, Code2, Activity, Clock, Settings, Sun, Moon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, Code2, Activity, Clock, Settings,
};

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Sidebar({
  activeNav, onNavChange, dark, onToggleTheme,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 w-[72px] h-screen bg-sidebar flex flex-col items-center py-6 gap-1 rounded-r-xl">
      {/* Logo */}
      <div className="text-primary mb-6">
        <FaGithub size={22} />
      </div>

      {/* Nav items */}
      {NAV_ITEMS.map((item) => {
        const Icon = ICON_MAP[item.icon];
        const isActive = activeNav === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            title={item.label}
            className={`
              w-10 h-10 rounded-md flex items-center justify-center
              transition-all duration-150 border-none cursor-pointer
              ${isActive
                ? "bg-primary text-white"
                : "bg-transparent text-faint hover:text-white/80 hover:bg-white/5"
              }
            `}
          >
            {Icon && <Icon size={20} />}
          </button>
        );
      })}

      <div className="flex-1" />

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        title={dark ? "Light mode" : "Dark mode"}
        className="w-10 h-10 rounded-md flex items-center justify-center bg-transparent text-faint hover:text-white/80 hover:bg-white/5 transition-all duration-150 border-none cursor-pointer"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </aside>
  );
}
