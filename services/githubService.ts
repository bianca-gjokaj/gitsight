import { GITHUB_API_BASE, MAX_REPOS_PER_PAGE } from "@/lib/constants";
import type { GitHubUser, GitHubRepo, GitHubCommitWeek } from "../types/github";

// Shared Request Helpers
const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  //token injected server-side via the API route
};

async function ghFetch<T>(path:string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE}${path}`, { headers });

  if (res.status === 404) {
    throw new Error('User not found. Please check the username.');
  }
  if (res.status ===403) {
    const reset = res.headers.get('X-RateLimit-Reset');
    const resetTime = reset 
    ? new Date(Number(reset) * 1000) .toLocaleTimeString()
    :'soon';
    throw new Error(`Github API rate limit exceeded. Resets at ${resetTime}.`);
  }
  if (!res.ok) {
    throw new Error(`Github API error (${res.status}). Try again later.`);
  }
  return res.json() as Promise<T>;
}

// ---------------  Public Service Functions

// Fetch a single github user profile
export async function fetchUser(username:string): Promise<GitHubUser> {
  return ghFetch<GitHubUser>(`/users/${username}`);
}

// Fetch all public repositories for a user
export async function fetchRepos(username:string): Promise<GitHubRepo[]> {
  return ghFetch<GitHubRepo[]>(`/users/${username}/repos?per_page=${MAX_REPOS_PER_PAGE} &sort=updated`);
}

// Fetch weekly commit activity for single repo : returns null when github hasnt computed stats yet (202 status)
export async function fetchCommitActivity (
  owner: string,
  repo: string,
): Promise<GitHubCommitWeek[] | null> {
  const res = await fetch (
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`,
    {headers}
  );
  // Github return 202 whil computing - treats it as unavailable
  if (res.status === 202) return null;
  if (!res.ok) return null;
  return res.json() as Promise<GitHubCommitWeek[]>;
}