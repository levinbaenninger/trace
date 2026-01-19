"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";

interface CommentsSectionProps {
  pullRequestId: Id<"pullRequests">;
  currentUserId: string;
  users: FunctionReturnType<typeof api.users.list.default>;
  preloadedComments: Preloaded<typeof api.comments.list.default>;
}

export const CommentsSection = ({
  pullRequestId,
  currentUserId,
  users,
  preloadedComments,
}: CommentsSectionProps) => {
  const comments = usePreloadedQuery(preloadedComments);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              comment={comment}
              currentUserId={currentUserId}
              key={comment._id}
              users={users}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            Noch keine Kommentare vorhanden. Sei der Erste!
          </p>
        )}
      </div>

      <CommentForm pullRequestId={pullRequestId} />
    </div>
  );
};

export const CommentsSectionLoading = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>

      <Skeleton className="h-28 w-full rounded-lg" />
    </div>
  );
};
