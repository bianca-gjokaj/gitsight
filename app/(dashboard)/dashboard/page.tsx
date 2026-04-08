"use client";

import { useState } from "react";
import { Spinner, ErrorBanner, EmptyState, DashboardGrid } from "@/components/ui";
import {
  DashboardHeader,
  StatsCards,
  LanguageDistributionChart,
  ActivityByDayChart,
  StarsVsForksChart,
  CommitTrendMini,
  SizeDistributionChart,
  CommitActivityChart,
  ContributionTrendsChart,
  TopLanguagesList,
  QuickStats,
  TopReposChart,
  RepoList,
} from "@/components/dashboard";
import { useGitHub } from "@/providers";
import type { RepoFilter } from "@/types";

export default function DashboardPage() {
  const { data, loading, error } = useGitHub();
  const [repoFilter, setRepoFilter] = useState<RepoFilter>("all");

  if (loading) return <Spinner message="Fetching GitHub data…" />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <EmptyState />;

  return (
    <div className="animate-fade-in">
      <DashboardHeader
        user={data.user}
        activeFilter={repoFilter}
        onFilterChange={setRepoFilter}
      />

      <StatsCards stats={data.stats} user={data.user} />

      <DashboardGrid columns="grid-cols-5">
        <LanguageDistributionChart languages={data.languages} />
        <ActivityByDayChart activityByDay={data.activityByDay} />
        <StarsVsForksChart repos={data.repos} />
        <CommitTrendMini monthlyTrend={data.monthlyTrend} />
        <SizeDistributionChart sizeDistribution={data.sizeDistribution} />
      </DashboardGrid>

      <DashboardGrid columns="grid-cols-[2fr_1.2fr_1fr_1fr]">
        <CommitActivityChart commitActivity={data.commitActivity} />
        <ContributionTrendsChart monthlyTrend={data.monthlyTrend} />
        <TopLanguagesList languages={data.languages} />
        <QuickStats
          user={data.user}
          stats={data.stats}
          languageCount={data.languages.length}
        />
      </DashboardGrid>

      <DashboardGrid columns="grid-cols-[1fr_2fr]">
        <TopReposChart repos={data.topReposByStars} />
        <RepoList repos={data.repos} languages={data.languages} />
      </DashboardGrid>
    </div>
  );
}