"use client";

import { api } from "@convex/_generated/api";
import { GetIssueErrors } from "@convex/issues/_lib/errors";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { AlertCircle, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
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
import { User } from "@/modules/users/ui/components/user";
import { UserBadge } from "@/modules/users/ui/components/user-badge";
import { parseError } from "@/utils/error/parse";
import { getGetIssueErrorMessage } from "../../errors";

interface IssueCardProps {
  title?: string | ReactNode;
  metadata?: ReactNode;
  children: ReactNode;
}

const IssueCard = ({ title = "Issue", children, metadata }: IssueCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle>{title}</CardTitle>
            {metadata}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};

interface IssueProps {
  preloadedIssue: Preloaded<typeof api.issues.get.default>;
  preloadedUsers: Preloaded<typeof api.users.list.default>;
}

export const Issue = ({ preloadedIssue, preloadedUsers }: IssueProps) => {
  const issue = usePreloadedQuery(preloadedIssue);
  const users = usePreloadedQuery(preloadedUsers);
  const createdAt = new Date(issue._creationTime);

  return (
    <IssueCard
      metadata={
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{Intl.DateTimeFormat("de-CH").format(createdAt)}</span>
          </div>
          <User showAvatar userId={issue.authorId} users={users} />
        </div>
      }
      title={issue.title}
    >
      <div>
        <h3 className="font-medium mb-2">Beschreibung</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {issue.description}
        </p>
      </div>

      {issue.labels.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Labels</h3>
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
          <h3 className="font-medium mb-2">Zugewiesen an</h3>
          <div className="flex gap-2 flex-wrap">
            {issue.assignees.map((assignee) => (
              <UserBadge key={assignee} userId={assignee} users={users} />
            ))}
          </div>
        </div>
      )}
    </IssueCard>
  );
};

export const IssueLoading = () => {
  return (
    <IssueCard
      metadata={
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      }
      title={<Skeleton className="h-8 w-2/3" />}
    >
      <div>
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>

      <div>
        <Skeleton className="h-5 w-16 mb-2" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      <div>
        <Skeleton className="h-5 w-28 mb-2" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </IssueCard>
  );
};

interface IssueErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const IssueError = ({ error, reset }: IssueErrorProps) => {
  const parsedError = parseError<GetIssueErrors>(error);

  if (
    parsedError.code === "ISSUE_NOT_FOUND" ||
    error.message.includes("ArgumentValidationError")
  ) {
    notFound();
  }

  return (
    <IssueCard>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            {getGetIssueErrorMessage(parsedError)}
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
