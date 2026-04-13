import type {
  GitHubRepo,
  RepoStats,
  CommitDataPoint,
  DayActivity,
  MonthlyTrend,
  RepoSizeEntry,
} from "../types";

import { MAX_TOP_REPOS } from "@/lib/constants";

// ------------Stat aggregation functions

// compute aggregate stats across all repos
export function computeRepoStats(repos: GitHubRepo[]) : RepoStats {
  return repos.reduce<RepoStats>(
    (acc, repo) => ({
      totalRepos: acc.totalRepos + 1,
      totalStars: acc.totalStars + repo.stargazers_count,
      totalForks: acc.totalForks + repo.forks_count,
      totalWatchers: acc.totalWatchers + repo.watchers_count,
      totalOpenIssues: acc.totalOpenIssues + repo.open_issues_count,
    }),
    { totalRepos: 0, totalStars: 0, totalForks: 0, totalWatchers: 0, totalOpenIssues: 0}
  );
}

// Top Repos: return N repos with the most stars, descending
export function getTopReposByStars(
  repos: GitHubRepo[],
  max: number = MAX_TOP_REPOS
) : GitHubRepo[] {
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, max);
}

// Commit Activity:
// Generate simulated weekly commit data (52 weeks).
export function generateCommitActivity(repoCount: number) : CommitDataPoint[] {
  const seed = repoCount || 1;
  return Array.from({length: 52}, (_, i) => {
    const pseudoRandom = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    return {
      week: i + 1,
      label: `W${i + 1}`,
      commits: Math.floor(pseudoRandom * 30 + (repoCount > 0 ? 5 : 0)),
    };
  });
}

// Activity by day of week
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function generateDayActivity(repoCount: number) : DayActivity[] {
  const seed = repoCount || 1;
  return DAYS.map((day, i) => {
    const pseudoRandom = ((seed * (i + 3) * 7919 + 10007) % 233280) / 233280;
    return {
      day,
      contributions: Math.floor(pseudoRandom * 40 + 5),
    };
  });
}


// Monthly Trend
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function generateMonthlyTrend(repoCount: number) : MonthlyTrend[] {
  const seed = repoCount || 1;
  return MONTHS.map((month, i) => {
    const prC = ((seed * (1 + 2) * 4801 + 31337) % 233280) / 233280;
    const prI = ((seed * (i + 7) * 6271 + 17389) % 233280) / 233280;
    return {
      month, 
      commits: Math.floor(prC * 60 + 10),
      issues: Math.floor(prI * 15),
    };
  });
}

// Return largest repos by disk size (In KB)
export function getRepoSizeDistribution (
  repos: GitHubRepo[],
  max: number = 10
) : RepoSizeEntry[] {
  return repos
  .filter((r) => r.size > 0)
  .sort((a, b) => b.size - a.size)
  .slice(0, max)
  .map((r) => ({
    name: r.name,
    sizeKB: Math.round(r.size / 1024),
  }));
}

