"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { AlertCircle, Calendar } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { User, UserBadge } from "@/components/user-display";
import { api } from "../../../../../convex/_generated/api";

interface IssueCardProps {
  title?: string;
  children: ReactNode;
}

const IssueCard = ({ title = "Issue", children }: IssueCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};

interface IssueProps {
  preloadedIssue: Preloaded<typeof api.issues.get.default>;
}

export const Issue = ({ preloadedIssue }: IssueProps) => {
  const issue = usePreloadedQuery(preloadedIssue);
  const createdAt = new Date(issue._creationTime);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-2xl">{issue.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{Intl.DateTimeFormat().format(createdAt)}</span>
              </div>
              <User showAvatar userId={issue.authorId} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Beschreibung</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {issue.description}
          </p>
        </div>

        {issue.labels.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1">Labels</h3>
            <div className="flex gap-2 flex-wrap">
              {issue.labels.map((label) => (
                <Badge key={label} variant="outline">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {issue.assignees.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1">Zugewiesen an</h3>
            <div className="flex gap-2 flex-wrap">
              {issue.assignees.map((assignee) => (
                <UserBadge key={assignee} userId={assignee} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const IssueLoading = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

interface IssueErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const IssueError = ({ reset }: IssueErrorProps) => {
  return (
    <IssueCard>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            Das Issue konnte nicht geladen werden. Bitte versuche es erneut.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="outline">
            Erneut versuchen
          </Button>
        </EmptyContent>
      </Empty>
    </IssueCard>
  );
};
