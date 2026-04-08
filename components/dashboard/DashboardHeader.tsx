"use client";

import { SectionHeader, FilterPill } from "@/components/ui";
import { REPO_FILTERS } from "@/lib/constants";
import type { GitHubUser, RepoFilter } from "@/types";

interface DashboardHeaderProps {
  user: GitHubUser;
  activeFilter: RepoFilter;
  onFilterChange: (filter: RepoFilter) => void;
}

export default function DashboardHeader({
  user, activeFilter, onFilterChange,
}: DashboardHeaderProps) {
  return (
    <SectionHeader
      title={`${user.name || user.login}\u2019s Analytics`}
      subtitle={user.bio || undefined}
    >
      {REPO_FILTERS.map((filter) => (
        <FilterPill
          key={filter.value}
          label={filter.label}
          active={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value as RepoFilter)}
        />
      ))}
    </SectionHeader>
  );
}