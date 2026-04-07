'use client';

import { BookOpen, Star, GitFork, Users } from 'lucide-react';
import { StatCard, DashboardGrid } from '../ui';
import { BRAND_COLORS } from '@/lib/constants';
import type { RepoStats, GitHubUser } from '@/types';

interface StatsCardsProps {
  stats: RepoStats;
  user: GitHubUser;
}

export default function StatsCards ({ stats, user }: StatsCardsProps) {
  return (
    <DashboardGrid columns='grid-cols-4'>
      <StatCard label='Total Repositories' value={user.public_repos} Icon={BookOpen} color={BRAND_COLORS.orange}/>
      <StatCard label='Total Stars' value={stats.totalStars} Icon={Star} color={BRAND_COLORS.gold}/>
      <StatCard label='Total Forks' value={stats.totalForks} Icon={GitFork} color={BRAND_COLORS.teal}/>
      <StatCard label='Followers' value={user.followers} Icon={Users} color={BRAND_COLORS.lavender}/>
    </DashboardGrid>
  );
}