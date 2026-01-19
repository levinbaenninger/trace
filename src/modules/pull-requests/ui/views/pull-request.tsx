"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery, useQuery } from "convex/react";
import { AlertCircle, Calendar, GitMerge } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
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
import {
  CommentsSection,
  CommentsSectionLoading,
} from "@/modules/comments/ui/components/comments-section";
import { Issue } from "@/modules/issues/ui/components/issue";
import { User } from "@/modules/users/ui/components/user";
import { UserBadge } from "@/modules/users/ui/components/user-badge";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type {
  GetPullRequestErrors,
  MergePullRequestErrors,
} from "../../../../../convex/pullRequests/_lib/errors";
import {
  getGetPullRequestErrorMessage,
  getMergePullRequestErrorMessage,
} from "../../errors";
import { MergeDialog } from "../components/merge-dialog";

interface PullRequestCardProps {
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  metadata?: ReactNode;
}

const PullRequestCard = ({
  title = "Pull Request",
  children,
  footer,
  metadata,
}: PullRequestCardProps) => {
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
      {footer}
    </Card>
  );
};

interface PullRequestProps {
  preloadedPullRequest: Preloaded<typeof api.pullRequests.get.default>;
  preloadedUsers: Preloaded<typeof api.users.list.default>;
  preloadedComments: Preloaded<typeof api.comments.list.default>;
  preloadedCurrentUserId: Preloaded<typeof api.users.getCurrentUserId.default>;
}

export const PullRequest = ({
  preloadedPullRequest,
  preloadedUsers,
  preloadedComments,
  preloadedCurrentUserId,
}: PullRequestProps) => {
  const pullRequest = usePreloadedQuery(preloadedPullRequest);
  const users = usePreloadedQuery(preloadedUsers);
  const currentUserId = usePreloadedQuery(preloadedCurrentUserId);
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
    <div className="flex flex-col gap-6">
      <PullRequestCard
        footer={
          !pullRequest.merged ? (
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
          ) : undefined
        }
        metadata={
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{Intl.DateTimeFormat("de-CH").format(createdAt)}</span>
            </div>
            <User showAvatar userId={pullRequest.authorId} users={users} />
          </div>
        }
        title={pullRequest.title}
      >
        <div>
          <h3 className="font-medium mb-2">Beschreibung</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {pullRequest.description}
          </p>
        </div>

        {pullRequest.issues.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Verbundene Issues</h3>
            <div className="space-y-2">
              {pullRequest.issues.map((issue) => (
                <Issue issue={issue} key={issue._id} />
              ))}
            </div>
          </div>
        )}

        {pullRequest.labels.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Labels</h3>
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
            <h3 className="font-medium mb-2">Zuweisen an</h3>
            <div className="flex gap-2 flex-wrap">
              {pullRequest.assignees.map((assignee) => (
                <UserBadge key={assignee} userId={assignee} users={users} />
              ))}
            </div>
          </div>
        )}

        {pullRequest.reviewers.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Reviewer</h3>
            <div className="flex gap-2 flex-wrap">
              {pullRequest.reviewers.map((reviewer) => (
                <UserBadge key={reviewer} userId={reviewer} users={users} />
              ))}
            </div>
          </div>
        )}
      </PullRequestCard>

      <Separator />

      <CommentsSection
        currentUserId={currentUserId}
        preloadedComments={preloadedComments}
        pullRequestId={pullRequest._id}
        users={users}
      />

      <MergeDialog
        isLoading={isMerging}
        issueCount={pullRequest.issueIds.length}
        onConfirm={handleMerge}
        onOpenChange={setIsMergeDialogOpen}
        open={isMergeDialogOpen}
      />
    </div>
  );
};

export const PullRequestLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <PullRequestCard
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
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
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
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-20 mb-2" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </PullRequestCard>

      <Separator />

      <CommentsSectionLoading />
    </div>
  );
};

interface PullRequestErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const PullRequestError = ({ error, reset }: PullRequestErrorProps) => {
  const parsedError = parseError<GetPullRequestErrors>(error);

  if (
    parsedError.code === "PULL_REQUEST_NOT_FOUND" ||
    error.message.includes("ArgumentValidationError")
  ) {
    notFound();
  }

  return (
    <PullRequestCard>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            {getGetPullRequestErrorMessage(parsedError)}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="outline">
            Erneut versuchen
          </Button>
        </EmptyContent>
      </Empty>
    </PullRequestCard>
  );
};
