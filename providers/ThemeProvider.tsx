"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface ThemeContextValue {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  dark: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
const [dark, setDark] = useState(() => {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("theme");

  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});

useEffect(() => {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}, [dark]);

  // Sync class and localStorage whenever dark changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
