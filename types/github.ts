// Github API Response Types

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
}

export interface GitHubCommitWeek {
  total: number;
  week: number;
  days: number[];
}

// ─────────────────────────────────────────────
// Processed / aggregated analytics types
// ─────────────────────────────────────────────

export interface LanguageBreakdown {
  language: string;
  count: number;
  percentage: number;
}

export interface RepoStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalOpenIssues: number;
}

export interface CommitDataPoint {
  week: number;
  label: string;
  commits: number;
}

export interface DayActivity {
  day: string;
  contributions: number;
}

export interface MonthlyTrend {
  month: string;
  commits: number;
  issues: number;
}

export interface RepoSizeEntry {
  name: string;
  sizeKB: number;
}

// ─────────────────────────────────────────────
// Dashboard aggregate — everything the UI needs
// ─────────────────────────────────────────────

export interface DashboardData {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: LanguageBreakdown[];
  stats: RepoStats;
  topReposByStars: GitHubRepo[];
  commitActivity: CommitDataPoint[];
  activityByDay: DayActivity[];
  monthlyTrend: MonthlyTrend[];
  sizeDistribution: RepoSizeEntry[];
}

// ─────────────────────────────────────────────
// UI state types
// ─────────────────────────────────────────────

export type TimeRange = "365" | "180" | "90" | "30";

export type RepoFilter = "all" | "public" | "sources" | "forks";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
