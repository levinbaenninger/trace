"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import {
  Activity,
  CheckCircle2,
  GitCommit,
  GitMerge,
  GitPullRequest,
  ListTodo,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { ErrorCard } from "@/components/error-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/components/user-display";
import { api } from "../../../../../convex/_generated/api";

interface Props {
  preloadedStats: Preloaded<typeof api.stats.get.default>;
}

export const Stats = ({ preloadedStats }: Props) => {
  const stats = usePreloadedQuery(preloadedStats);

  const issueCompletionRate =
    stats.issues.total > 0
      ? Math.round((stats.issues.closed / stats.issues.total) * 100)
      : 0;

  const prMergeRate =
    stats.pullRequests.total > 0
      ? Math.round((stats.pullRequests.merged / stats.pullRequests.total) * 100)
      : 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.issues.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.issues.open} open, {stats.issues.closed} closed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pullRequests.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pullRequests.open} open, {stats.pullRequests.merged} merged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.commits.total}</div>
            <p className="text-xs text-muted-foreground">Total merged work</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.topContributors.length}
            </div>
            <p className="text-xs text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>
      </div>

      {/* Issue & PR Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Issue Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{issueCompletionRate}%</span>
              </div>
              <Progress value={issueCompletionRate} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Closed</span>
              </div>
              <span className="text-sm font-medium">{stats.issues.closed}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Open</span>
              </div>
              <span className="text-sm font-medium">{stats.issues.open}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="h-5 w-5" />
              Pull Request Merge Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{prMergeRate}%</span>
              </div>
              <Progress value={prMergeRate} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <GitMerge className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Merged</span>
              </div>
              <span className="text-sm font-medium">
                {stats.pullRequests.merged}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitPullRequest className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Open</span>
              </div>
              <span className="text-sm font-medium">
                {stats.pullRequests.open}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Labels */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New Issues</span>
              </div>
              <Badge variant="secondary">{stats.recentActivity.issues}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New Pull Requests</span>
              </div>
              <Badge variant="secondary">
                {stats.recentActivity.pullRequests}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New Commits</span>
              </div>
              <Badge variant="secondary">{stats.recentActivity.commits}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Label Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(stats.labels).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No labels used yet
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.labels)
                  .sort(([, a], [, b]) => b - a)
                  .map(([label, count]) => (
                    <div
                      className="flex items-center justify-between"
                      key={label}
                    >
                      <Badge variant="outline">{label}</Badge>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.topContributors.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contributors yet</p>
          ) : (
            <div className="space-y-4">
              {stats.topContributors.map((contributor, index) => (
                <div
                  className="flex items-center justify-between"
                  key={contributor.authorId}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                      #{index + 1}
                    </div>
                    <User userId={contributor.authorId} />
                  </div>
                  <Badge variant="secondary">
                    {contributor.count} contributions
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const StatsLoading = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
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
