// app wide constants: color palette, nav items, filter options, API config
import type { NavItem } from "../types";

// Brand Palette Used Across Charts and UI

export const BRAND_COLORS = {
  orange: "#E8734A",
  orangeLight: "#F4A261",
  teal: "#2EC4B6",
  tealDark: "#1B9E8F",
  gold: "#E9C46A",
  rose: "#E76F51",
  sage: "#8AB17D",
  lavender: "#9B8EC4",
  coral: "#FF8A80",
  sky: "#64B5F6",
  mint: "#80CBC4",
  peach: "#FFAB91",
} as const;

// Ordered Palette for chart datasets
export const CHART_PALETTE = [
  BRAND_COLORS.orange,
  BRAND_COLORS.teal,
  BRAND_COLORS.gold,
  BRAND_COLORS.rose,
  BRAND_COLORS.sage,
  BRAND_COLORS.lavender,
  BRAND_COLORS.coral,
  BRAND_COLORS.sky,
  BRAND_COLORS.mint,
  BRAND_COLORS.peach,
] as const;

// Sidebar Nav Definition
export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: '/dashboard' },
  { id: "repos", label: "Repositories", icon: "BookOpen", href: '/repos' },
  { id: "languages", label: "Languages", icon: "Code2", href: '/languages' },
  { id: "activity", label: "Activity", icon: "Activity", href: '/activity' },
  { id: "settings", label: "Settings", icon: "Settings", href: '/settings'},
];

// Time Range options
export const TIME_RANGE_OPTIONS = [
  { value: "365", label: "Last 365 days" },
  { value: "180", label: "Last 180 days" },
  { value: "90", label: "Last 90 days" },
  { value: "30", label: "Last 30 days" },
] as const;

// Repo Filters
export const REPO_FILTERS = [
  { value: "all", label: "All Repos" },
  { value: "public", label: "Public" },
  { value: "sources", label: "Sources" },
  { value: "forks", label: "Forks" },
] as const;

// API
export const GITHUB_API_BASE =
  process.env.NEXT_PUBLIC_GITHUB_API_BASE ?? "https://api.github.com";

export const MAX_REPOS_PER_PAGE = 100;
export const MAX_LANGUAGES = 8;
export const MAX_TOP_REPOS = 8;