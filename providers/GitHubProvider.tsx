"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useGitHubDashboard } from "@/hooks";
import type { DashboardData } from "@/types";

interface GitHubContextValue {
  data: DashboardData | null;
  loading: boolean;
  error: string;
  loadUser: (username: string) => Promise<void>;
}

const GitHubContext = createContext<GitHubContextValue>({
  data: null,
  loading: false,
  error: "",
  loadUser: async () => {},
});

export function useGitHub() {
  return useContext(GitHubContext);
}

export function GitHubProvider({ children }: { children: ReactNode }) {
  const value = useGitHubDashboard();

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  );
}