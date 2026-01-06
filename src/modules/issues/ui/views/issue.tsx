"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserBadge } from "@/components/user-display";
import { api } from "../../../../../convex/_generated/api";

interface Props {
  preloadedIssue: Preloaded<typeof api.issues.get.default>;
}

export const Issue = ({ preloadedIssue }: Props) => {
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
