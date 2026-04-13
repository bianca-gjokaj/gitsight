"use client";

import { useState, useMemo } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Spinner, ErrorBanner, EmptyState, SectionHeader, DashCard } from "@/components/ui";
import { useGitHub } from "@/providers";
import { CHART_PALETTE } from "@/lib/constants";

export default function ReposPage() {
  const { data, loading, error } = useGitHub();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"stars" | "forks" | "updated">("stars");

  const filtered = useMemo(() => {
    if (!data) return [];
    let repos = [...data.repos];

    if (search.trim()) {
      const q = search.toLowerCase();
      repos = repos.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false) ||
          (r.language?.toLowerCase().includes(q) ?? false)
      );
    }

    repos.sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortBy === "forks") return b.forks_count - a.forks_count;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return repos;
  }, [data, search, sortBy]);

  const langColor = (lang: string | null): string => {
    if (!lang || !data) return "#999";
    const idx = data.languages.findIndex((l) => l.language === lang);
    return idx >= 0 ? CHART_PALETTE[idx % CHART_PALETTE.length] : "#999";
  };

  if (loading) return <Spinner message="Fetching repositories…" />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <EmptyState />;

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title={`${data.repos.length} Repositories`}
        subtitle={`${data.user.name || data.user.login}\u2019s public repositories`}
      >
        {/* Sort selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1.5 rounded-md text-xs border border-border bg-card text-heading cursor-pointer outline-none"
        >
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
          <option value="updated">Recently Updated</option>
        </select>
      </SectionHeader>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search repositories…"
          className="w-full max-w-md px-4 py-2 rounded-md text-sm border border-border bg-card text-heading placeholder-muted outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Repo grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((repo) => (
          <DashCard key={repo.id} title={repo.name} subtitle={repo.description || "No description"}>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4 text-xs text-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: langColor(repo.language) }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-warning">
                  <Star size={13} /> {repo.stargazers_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={13} /> {repo.forks_count.toLocaleString()}
                </span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                title="Open on GitHub"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </DashCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">No repositories match your search.</p>
      )}
    </div>
  );
}
