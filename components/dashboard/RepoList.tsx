"use client";

import { Star, GitFork } from "lucide-react";
import { DashCard } from "@/components/ui";
import { CHART_PALETTE } from "@/lib/constants";
import type { GitHubRepo, LanguageBreakdown } from "@/types";

interface RepoListProps { repos: GitHubRepo[]; languages: LanguageBreakdown[]; }

export default function RepoList({ repos, languages }: RepoListProps) {
  const langColor = (lang: string | null): string => {
    if (!lang) return "#999";
    const idx = languages.findIndex((l) => l.language === lang);
    return idx >= 0 ? CHART_PALETTE[idx % CHART_PALETTE.length] : "#999";
  };

  return (
    <DashCard title="Recent Repositories">
      <div className="grid grid-cols-2 gap-3 overflow-auto max-h-[240px] pr-1">
        {repos.slice(0, 8).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block p-3 rounded-md no-underline
              bg-card-elevated border border-border
              hover:-translate-y-0.5 transition-transform duration-150
            "
          >
            <p className="text-sm font-semibold text-heading mb-1 truncate">
              {repo.name}
            </p>
            <p className="text-xs text-muted mb-2 leading-snug line-clamp-2">
              {repo.description || "No description"}
            </p>
            <div className="flex gap-3 text-xs text-muted">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: langColor(repo.language) }} />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1 text-warning">
                <Star size={12} /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} /> {repo.forks_count}
              </span>
            </div>
          </a>
        ))}
      </div>
    </DashCard>
  );
}
