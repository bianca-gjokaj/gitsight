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

export interface GitHubRepos {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  fork_counts: number;
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

// Processed / Aggregated Analytics Types

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

// Dashboard Aggregate - What UI Needs

export interface DashboardData {
  user: GitHubUser;
  repos: GitHubRepos[];
  languages: LanguageBreakdown[];
  stats: RepoStats;
  topReposByStars: GitHubRepos[];
  commitActivity: CommitDataPoint[];
  activityByDay: DayActivity[];
  monthlyTrend: MonthlyTrend[];
  sizeDistribution: RepoSizeEntry[];
}

// UI State Types
export type TimeRange = '365' | '180' | '30';

export type RepoFilter = 'all' | 'public' | 'sources' | 'forks';

export interface NavItem {
  id: string;
  label: string;
  icon: string; //lucide-react icon 
}