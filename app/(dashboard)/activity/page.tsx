'use client';

import { Spinner, ErrorBanner, EmptyState, SectionHeader, DashCard, DashboardGrid, ChartContainer } from "@/components/ui";
import { LineChart, BarChart } from "@/components/charts";
import { useGitHub } from "@/providers";
import { BRAND_COLORS } from "@/lib/constants";

export default function ActivityPage () {
  const { data, loading, error } = useGitHub();

  if (loading) return <Spinner message="Loading activity..." />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <EmptyState />;

  const { commitActivity, monthlyTrend, activityByDay } = data;
  const sampled = commitActivity.filter((_, i) => i % 4 === 0);

  const weeklyData = {
    labels: sampled.map((d) => d.label),
    datasets: [{
      label: 'Commits',
      data: sampled.map((d) => d.commits),
      borderColor: BRAND_COLORS.orange,
      backgroundColor: BRAND_COLORS.orange + '20',
      fill: true, tension: 0.4,
      pointRadius: 4, pointHoverRadius: 7,
      pointBackgroundColor: BRAND_COLORS.orange, borderWidth: 2.5,
    }],
  };

  const monthlyData = {
    labels: monthlyTrend.map((d) => d.month),
    datasets: [
      {
        label: "Commits",
        data: monthlyTrend.map((d) => d.commits),
        borderColor: BRAND_COLORS.teal,
                backgroundColor: BRAND_COLORS.teal + "15",
        fill: true, tension: 0.4,
        pointRadius: 4, pointHoverRadius: 7,
        pointBackgroundColor: BRAND_COLORS.teal, borderWidth: 2.5,
      },
      {
        label: "Issues",
        data: monthlyTrend.map((d) => d.issues),
        borderColor: BRAND_COLORS.rose,
        backgroundColor: BRAND_COLORS.rose + "15",
        fill: true, tension: 0.4,
        pointRadius: 4, pointHoverRadius: 7,
        pointBackgroundColor: BRAND_COLORS.rose, borderWidth: 2.5,
      },
    ],
  };

  const dayData = {
    labels: activityByDay.map((d) => d.day),
    datasets: [{
      label: "Contributions",
      data: activityByDay.map((d) => d.contributions),
      backgroundColor: activityByDay.map((_, i) =>
        i === 0 || i === 6 ? BRAND_COLORS.rose + "80" : BRAND_COLORS.teal + "cc"
      ),
      borderRadius: 8,
      borderSkipped: false as const,
      barPercentage: 0.55,
    }],
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title="Activity Overview"
        subtitle={`Commit and contribution patterns for ${data.user.name || data.user.login}`}
      />

      {/* Weekly commits — full width */}
      <DashboardGrid columns="grid-cols-1">
        <DashCard title="Weekly Commit Activity" subtitle="Commits per week over the past year">
          <ChartContainer height="lg">
            <LineChart data={weeklyData} />
          </ChartContainer>
        </DashCard>
      </DashboardGrid>

      {/* Monthly trends + day of week */}
      <DashboardGrid columns="grid-cols-[2fr_1fr]">
        <DashCard title="Monthly Trends" subtitle="Commits and issues by month">
          <ChartContainer height="lg">
            <LineChart data={monthlyData} showLegend />
          </ChartContainer>
        </DashCard>

        <DashCard title="Day of Week" subtitle="Contribution patterns">
          <ChartContainer height="lg">
            <BarChart data={dayData} />
          </ChartContainer>
        </DashCard>
      </DashboardGrid>

      {/* Summary stats */}
      <DashCard title="Activity Summary">
        <div className="grid grid-cols-3 gap-6 py-2">
          {[
            { label: "Total Weekly Avg", value: Math.round(commitActivity.reduce((s, d) => s + d.commits, 0) / 52) },
            { label: "Peak Week", value: Math.max(...commitActivity.map((d) => d.commits)) },
            { label: "Most Active Day", value: activityByDay.sort((a, b) => b.contributions - a.contributions)[0]?.day },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-heading">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </DashCard>
    </div>
  );
}



