'use client';

import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Code2, Activity, Settings,
  Sun, Moon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useTheme } from "@/providers";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, Code2, Activity, Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { dark, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-50 w-[72px] h-screen bg-sidebar flex flex-col items-center py-6 gap-1 rounded-r-xl">
      {/* Logo — links home */}
      <Link href="/dashboard" className="text-primary mb-6 hover:opacity-80 transition-opacity">
        <FaGithub size={22} />
      </Link>

      {/* Navigation links */}
      {NAV_ITEMS.map((item) => {
        const Icon = ICON_MAP[item.icon];
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            title={item.label}
            className={`
              w-10 h-10 rounded-md flex items-center justify-center
              transition-all duration-150 no-underline
              ${isActive
                ? "bg-primary text-white"
                : "bg-transparent text-faint hover:text-white/80 hover:bg-white/5"
              }
            `}
          >
            {Icon && <Icon size={20} />}
          </Link>
        );
      })}

      <div className="flex-1" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={dark ? "Light mode" : "Dark mode"}
        className="w-10 h-10 rounded-md flex items-center justify-center bg-transparent text-faint hover:text-white/80 hover:bg-white/5 transition-all duration-150 border-none cursor-pointer"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </aside>
  );
}
