"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";

import { ErrorCard } from "@/components/error-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "../../../../../convex/_generated/api";
import { OverviewStats } from "../components/overview-stats";
import { ProgressSection } from "../components/progress-section";
import { TopContributorsCard } from "../components/top-contributors-card";

interface Props {
  preloadedStats: Preloaded<typeof api.stats.get.default>;
}

export const Stats = ({ preloadedStats }: Props) => {
  const stats = usePreloadedQuery(preloadedStats);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <OverviewStats
        commitsTotal={stats.commits.total}
        contributorsCount={stats.topContributors.length}
        issuesClosed={stats.issues.closed}
        issuesOpen={stats.issues.open}
        issuesTotal={stats.issues.total}
        pullRequestsMerged={stats.pullRequests.merged}
        pullRequestsOpen={stats.pullRequests.open}
        pullRequestsTotal={stats.pullRequests.total}
      />

      <ProgressSection
        issuesClosed={stats.issues.closed}
        issuesOpen={stats.issues.open}
        issuesTotal={stats.issues.total}
        pullRequestsMerged={stats.pullRequests.merged}
        pullRequestsOpen={stats.pullRequests.open}
        pullRequestsTotal={stats.pullRequests.total}
      />

      <TopContributorsCard contributors={stats.topContributors} />
    </div>
  );
};

export const StatsLoading = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity & Labels */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="flex items-center justify-between" key={i}>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="flex items-center justify-between" key={i}>
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-6" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="flex items-center justify-between" key={i}>
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export const StatsError = () => {
  return (
    <ErrorCard
      message="Fehler beim Laden der Statistiken. Bitte versuche es erneut."
      title="Fehler beim Laden der Statistiken"
    />
  );
};
