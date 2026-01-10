"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { AlertCircle, Calendar, GitMerge } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, UserBadge } from "@/components/user-display";
import { Issue } from "@/modules/issues/ui/components/issue";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type { MergePullRequestErrors } from "../../../../../convex/pullRequests/_lib/errors";
import { getMergePullRequestErrorMessage } from "../../errors";
import { MergeDialog } from "../components/merge-dialog";

interface Props {
  preloadedPullRequest: Preloaded<typeof api.pullRequests.get.default>;
}

export const PullRequest = ({ preloadedPullRequest }: Props) => {
  const pullRequest = usePreloadedQuery(preloadedPullRequest);
  const mergePullRequest = useMutation(api.pullRequests.merge.default);

  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  const handleMerge = async () => {
    setIsMerging(true);
    try {
      await mergePullRequest({ id: pullRequest._id });
      toast.success("Pull Request erfolgreich gemerged");
      setIsMergeDialogOpen(false);
    } catch (error) {
      const parsedError = parseError<MergePullRequestErrors>(error);
      toast.error(getMergePullRequestErrorMessage(parsedError));
    } finally {
      setIsMerging(false);
    }
  };

  const createdAt = new Date(pullRequest._creationTime);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl">{pullRequest.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{Intl.DateTimeFormat().format(createdAt)}</span>
                </div>
                <User showAvatar userId={pullRequest.authorId} />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-1">Beschreibung</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {pullRequest.description}
            </p>
          </div>

          {pullRequest.issues.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Verbundene Issues</h3>
              <div className="space-y-2">
                {pullRequest.issues.map((issue) => (
                  <Issue issue={issue} key={issue._id} />
                ))}
              </div>
            </div>
          )}

          {pullRequest.labels.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1">Labels</h3>
              <div className="flex gap-2 flex-wrap">
                {pullRequest.labels.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {pullRequest.assignees.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1">Zuweisen an</h3>
              <div className="flex gap-2 flex-wrap">
                {pullRequest.assignees.map((assignee) => (
                  <UserBadge key={assignee} userId={assignee} />
                ))}
              </div>
            </div>
          )}

          {pullRequest.reviewers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1">Reviewer</h3>
              <div className="flex gap-2 flex-wrap">
                {pullRequest.reviewers.map((reviewer) => (
                  <UserBadge key={reviewer} userId={reviewer} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
        {!pullRequest.merged && (
          <>
            <Separator />
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setIsMergeDialogOpen(true)}
                size="lg"
              >
                <GitMerge className="h-4 w-4 mr-2" />
                Pull Request mergen
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      <MergeDialog
        isLoading={isMerging}
        issueCount={pullRequest.issueIds.length}
        onConfirm={handleMerge}
        onOpenChange={setIsMergeDialogOpen}
        open={isMergeDialogOpen}
      />
    </>
  );
};

export const PullRequestLoading = () => {
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

interface PullRequestErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const PullRequestError = ({ reset }: PullRequestErrorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pull Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>Fehler beim Laden</EmptyTitle>
            <EmptyDescription>
              Der Pull Request konnte nicht geladen werden. Bitte versuche es
              erneut.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={reset} variant="outline">
              Erneut versuchen
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
};
