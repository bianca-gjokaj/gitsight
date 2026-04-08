"use client";

import { Spinner, ErrorBanner, EmptyState, SectionHeader, DashCard, DashboardGrid, ChartContainer } from "@/components/ui";
import { DoughnutChart, BarChart } from "@/components/charts";
import { useGitHub } from "@/providers";
import { CHART_PALETTE } from "@/lib/constants";

export default function LanguagesPage() {
  const { data, loading, error } = useGitHub();

  if (loading) return <Spinner message="Analyzing languages…" />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <EmptyState />;

  const { languages, repos } = data;

  const doughnutData = {
    labels: languages.map((l) => l.language),
    datasets: [{
      data: languages.map((l) => l.count),
      backgroundColor: CHART_PALETTE.slice(0, languages.length),
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  const barData = {
    labels: languages.map((l) => l.language),
    datasets: [{
      label: "Repositories",
      data: languages.map((l) => l.count),
      backgroundColor: CHART_PALETTE.slice(0, languages.length),
      borderRadius: 6,
      borderSkipped: false as const,
      barPercentage: 0.6,
    }],
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title="Language Distribution"
        subtitle={`Across ${repos.length} repositories`}
      />

      <DashboardGrid columns="grid-cols-2">
        {/* Doughnut */}
        <DashCard title="Distribution" subtitle="Proportional breakdown">
          <ChartContainer height="lg">
            <DoughnutChart data={doughnutData} />
          </ChartContainer>
        </DashCard>

        {/* Bar chart */}
        <DashCard title="Repository Count" subtitle="Repos per language">
          <ChartContainer height="lg">
            <BarChart data={barData} />
          </ChartContainer>
        </DashCard>
      </DashboardGrid>

      {/* Detailed breakdown */}
      <DashCard title="Detailed Breakdown">
        <div className="space-y-4">
          {languages.map((lang, i) => {
            const langRepos = repos.filter((r) => r.language === lang.language);
            return (
              <div key={lang.language}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] }}
                    />
                    <span className="text-sm font-semibold text-heading">{lang.language}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span>{lang.count} repos</span>
                    <span>{lang.percentage}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-border mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length],
                    }}
                  />
                </div>
                {/* Repo names */}
                <div className="flex flex-wrap gap-1.5">
                  {langRepos.slice(0, 6).map((r) => (
                    <a
                      key={r.id}
                      href={r.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-0.5 rounded-full bg-card-elevated border border-border text-muted hover:text-heading transition-colors no-underline"
                    >
                      {r.name}
                    </a>
                  ))}
                  {langRepos.length > 6 && (
                    <span className="text-xs px-2 py-0.5 text-muted">+{langRepos.length - 6} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DashCard>
    </div>
  );
}
