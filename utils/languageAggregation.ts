import type {GitHubRepo, LanguageBreakdown} from "../types";
import { MAX_LANGUAGES } from "@/lib/constants";

// Aggregate language usage across repos into a ranked distribution. Each language's percentage is relative to the total repos that declare a language.

export function aggregateLanguages(
  repos: GitHubRepo[],
  max: number = MAX_LANGUAGES
) : LanguageBreakdown[] {
  const counts : Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

return Object.entries(counts)
.sort(([, a], [, b]) => b - a)
.slice(0, max)
.map(([language, count]) => ({
  language,
  count,
  percentage: total > 0 ? Math.round((count / total) * 100) : 0,
}));
}