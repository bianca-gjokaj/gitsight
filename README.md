# GitSight - A GitHub Analytics Dashboard

A production-grade Github analytics dashboard built with **Next.js 16**, **Typescript**, **Tailwind CSS**, and **Chart.js**. Visualizes repository statistics, language distribution, commit activity, and contribution trends for any GitHub User.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-ff6384)\

---

# Features

- **User Search** - Enter any GitHub username to load their analytics
- **Repository Statistics** - Total repos, stars, forks, followers
- **Language Distribution** - Doughnut chart of languages across repos
- **Commit Activity** - Weekly commit trends over the past year
- **Stars vs Forks** - Scatter plot showing repo correlations
- **Contribution Trends** - Monthly commits and issues overlay
- **Top Repositories** - Ranked horizontal bar chart by stars
- **Recent Repos** - Card grid with language, stars, and fork metadata
- **Light / Dark Mode** - Full theme toggle with polished palettes
- **Server-Side API Proxy** - Optional API route with token auth to avoid rate limits

---

## Architecture

```
gitsigh/
├── app/
│   ├── api/github/[username]/route.ts   # Server-side GitHub proxy
│   ├── layout.tsx                       # Root HTML layout
│   └── page.tsx                         # Main dashboard orchestrator
├── components/
│   ├── charts/                          # Reusable Chart.js wrappers
│   │   ├── BarChart.tsx
│   │   ├── DoughnutChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── ScatterChart.tsx
│   │   └── index.ts
│   ├── dashboard/                       # Domain-specific dashboard widgets
│   │   ├── ActivityByDayChart.tsx
│   │   ├── CommitActivityChart.tsx
│   │   ├── CommitTrendMini.tsx
│   │   ├── ContributionTrendsChart.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── LanguageDistributionChart.tsx
│   │   ├── QuickStats.tsx
│   │   ├── RepoList.tsx
│   │   ├── SizeDistributionChart.tsx
│   │   ├── StarsVsForksChart.tsx
│   │   ├── StatsCards.tsx
│   │   ├── TopLanguagesList.tsx
│   │   ├── TopReposChart.tsx
│   │   └── index.ts
│   ├── layout/                          # Structural layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   └── ui/                              # Generic UI primitives
│       ├── DashCard.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBanner.tsx
│       ├── Spinner.tsx
│       ├── StatCard.tsx
│       └── index.ts
├── hooks/
│   ├── useGitHubDashboard.ts            # Main data-fetching orchestrator hook
│   └── index.ts
├── lib/
│   ├── chartConfig.ts                   # Shared Chart.js tooltip/scale factories
│   ├── chartSetup.ts                    # Chart.js module registration
│   └── constants.ts                     # Colors, nav items, config values
├── services/
│   ├── githubService.ts                 # GitHub API network layer
│   └── index.ts
├── styles/
│   └── globals.css                      # Tailwind directives + custom base styles
├── types/
│   ├── github.ts                        # All TypeScript interfaces
│   └── index.ts
├── utils/
│   ├── dataTransformers.ts              # Stats, trends, size computation
│   ├── languageAggregation.ts           # Language counting and ranking
│   └── index.ts
├── .env.example
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Layer Responsibilities

| Layer | Purpose |
|---|---|
| `types/` | All TypeScript interfaces — GitHub API shapes and processed analytics models |
| `services/` | Network layer — isolated HTTP calls to the GitHub REST API |
| `utils/` | Pure functions — data aggregation, transformation, ranking (no side effects) |
| `hooks/` | React hooks — orchestrates service calls and transformation, manages loading/error state |
| `lib/` | Configuration — Chart.js registration, shared styling factories, app constants |
| `components/charts/` | Reusable Chart.js wrappers — accept generic `ChartData` props, know nothing about GitHub |
| `components/dashboard/` | Domain widgets — combine a chart component with a card wrapper and GitHub-specific data shaping |
| `components/layout/` | Structural components — Sidebar, Header, DashboardLayout shell |
| `components/ui/` | Generic primitives — DashCard, StatCard, Spinner, ErrorBanner |
| `app/` | Next.js app router — page orchestration and API routes |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd github-analytics-dashboard

# Install dependencies
npm install

# (Optional) Add a GitHub token for higher rate limits
cp .env.example .env.local
# Edit .env.local and add your token
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## GitHub API Configuration

The app works without authentication (60 requests/hour).
For higher limits:

1. Go to [GitHub Settings -> Tokens](https://github.com/settings/tokens)
2. Generate a personal access token (classic) with `public_repo` scope
3. Add it to `.env.local`;

```
GITHUB_TOKEN=ghp_your_token_here
```

The server-side API route (`/api/github/[username]`) will automatically attach this token.

---

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# or link to a Git repository for automatic deployments
vercel link
```

Set `GITHUB_TOKEN` as an environment variable in your vervel project settings.

---

## Tech Stack

- **Next.js 16** - App router, API routes, server components
- **TypeScript** - Full type safety across all layers
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Chart.js + react-chartjs-2** - Doughnut, bar, line, and scatter visualizations
- **Lucide React** - Consistent icon system
- **Github REST API** - User profiles, repositories, commit statistics

---

## License

MIT
