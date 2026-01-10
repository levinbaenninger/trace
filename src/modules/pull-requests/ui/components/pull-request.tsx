"use client";

import { GitMerge, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { Doc, Id } from "../../../../../convex/_generated/dataModel";

interface PullRequestProps {
  pullRequest: Doc<"pullRequests">;
  onEdit: (pr: Doc<"pullRequests">) => void;
  onDelete: (id: Id<"pullRequests">) => void;
  isDeleting?: boolean;
}

export const PullRequest = ({
  pullRequest,
  onEdit,
  onDelete,
  isDeleting,
}: PullRequestProps) => {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <GitMerge
          className={pullRequest.merged ? "text-indigo-500" : "text-green-600"}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="hover:underline">
          <Link href={`/pulls/${pullRequest._id}`}>{pullRequest.title}</Link>
        </ItemTitle>
      </ItemContent>
      {!pullRequest.merged && (
        <ItemActions>
          <Button
            disabled={isDeleting}
            loading={isDeleting}
            onClick={() => onEdit(pullRequest)}
            size="icon"
            variant="outline"
          >
            <Pencil />
          </Button>
          <Button
            disabled={isDeleting}
            loading={isDeleting}
            onClick={() => onDelete(pullRequest._id)}
            size="icon"
            variant="outline"
          >
            <Trash2 />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
};
