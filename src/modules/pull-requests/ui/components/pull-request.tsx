"use client";

import type { Doc, Id } from "@convex/_generated/dataModel";
import { GitMerge, GitPullRequest, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface PullRequestProps {
  pullRequest: Doc<"pullRequests">;
  currentUserId: string;
  onEdit: (pr: Doc<"pullRequests">) => void;
  onDelete: (id: Id<"pullRequests">) => void;
  isDeleting?: boolean;
}

export const PullRequest = ({
  pullRequest,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: PullRequestProps) => {
  const isAuthor = pullRequest.authorId === currentUserId;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        {pullRequest.merged ? (
          <GitMerge aria-label="Zusammengeführt" className="text-closed" />
        ) : (
          <GitPullRequest aria-label="Offen" className="text-open" />
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="hover:underline">
          <Link href={`/pulls/${pullRequest._id}`}>{pullRequest.title}</Link>
        </ItemTitle>
      </ItemContent>
      {!pullRequest.merged && isAuthor && (
        <ItemActions>
          <Button
            aria-label="Pull Request bearbeiten"
            disabled={isDeleting}
            onClick={() => onEdit(pullRequest)}
            size="icon"
            variant="outline"
          >
            <Pencil aria-hidden="true" />
          </Button>
          <Button
            aria-label="Pull Request löschen"
            disabled={isDeleting}
            loading={isDeleting}
            onClick={() => onDelete(pullRequest._id)}
            size="icon"
            variant="outline"
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
};
