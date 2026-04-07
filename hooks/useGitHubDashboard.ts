'use client';

import { useState, useCallback } from 'react';
import { fetchUser, fetchRepos } from '@/services';
import {
  aggregateLanguages,
  computeRepoStats,
  getTopReposByStars,
  generateCommitActivity,
  generateDayActivity,
  generateMonthlyTrend,
  getRepoSizeDistribution
} from '@/utils';
import type { DashboardData } from '@/types';

interface UseGitHubDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string;
  loadUser: (username: string) => Promise<void>;
}

// Github Data Fetching and Transformation: returns assembled DashboardData ready for rendering
export function useGitHubDashboard() : UseGitHubDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUser = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');

    try {
      // fetch user profile and repos concurrently
      const [user, repos] = await Promise.all([
        fetchUser(trimmed),
        fetchRepos(trimmed),
      ]);

      // Transform raw data into chart-ready structures
      const languages = aggregateLanguages(repos);
      const stats = computeRepoStats(repos);
      const topReposByStars = getTopReposByStars(repos);
      const commitActivity = generateCommitActivity(repos.length);
      const activityByDay = generateDayActivity(repos.length);
      const monthlyTrend = generateMonthlyTrend(repos.length);
      const sizeDistribution = getRepoSizeDistribution(repos);

      setData({
        user,
        repos,
        languages,
        stats,
        topReposByStars,
        commitActivity,
        activityByDay,
        monthlyTrend,
        sizeDistribution,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occured.';
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {data, loading, error, loadUser};
}


