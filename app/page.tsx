"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
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
import { useGitHubDashboard } from "@/hooks";
import type { TimeRange, RepoFilter } from "@/types";

const DEFAULT_USERNAME = "torvalds";

export default function DashboardPage() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [timeRange, setTimeRange] = useState<TimeRange>("365");
  const [repoFilter, setRepoFilter] = useState<RepoFilter>("all");
  const { data, loading, error, loadUser } = useGitHubDashboard();

  useEffect(() => {
    loadUser(DEFAULT_USERNAME);
  }, [loadUser]);

  return (
    <DashboardLayout
      dark={dark}
      onToggleTheme={() => setDark((d) => !d)}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      onSearch={loadUser}
      avatarUrl={data?.user.avatar_url}
    >
      {loading && <Spinner message="Fetching GitHub data…" />}
      {error && !loading && <ErrorBanner message={error} />}
      {!data && !loading && !error && <EmptyState />}

      {data && !loading && (
        <div className="animate-fade-in">
          <DashboardHeader
            user={data.user}
            activeFilter={repoFilter}
            onFilterChange={setRepoFilter}
          />

          <StatsCards stats={data.stats} user={data.user} />

          {/* Row 1: 5 compact chart cards */}
          <DashboardGrid columns="grid-cols-5">
            <LanguageDistributionChart languages={data.languages} />
            <ActivityByDayChart activityByDay={data.activityByDay} />
            <StarsVsForksChart repos={data.repos} />
            <CommitTrendMini monthlyTrend={data.monthlyTrend} />
            <SizeDistributionChart sizeDistribution={data.sizeDistribution} />
          </DashboardGrid>

          {/* Row 2: wider charts + sidebar lists */}
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

          {/* Row 3: top repos + recent repos */}
          <DashboardGrid columns="grid-cols-[1fr_2fr]">
            <TopReposChart repos={data.topReposByStars} />
            <RepoList repos={data.repos} languages={data.languages} />
          </DashboardGrid>
        </div>
      )}
    </DashboardLayout>
  );
}

