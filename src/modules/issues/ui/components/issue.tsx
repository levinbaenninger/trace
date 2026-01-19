"use client";

import type { Doc, Id } from "@convex/_generated/dataModel";
import { CircleCheck, CircleDot, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface IssueProps {
  issue: Doc<"issues">;
  currentUserId: string;
  onEdit?: (issue: Doc<"issues">) => void;
  onDelete?: (id: Id<"issues">) => void;
  isDeleting?: boolean;
}

export const Issue = ({
  issue,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: IssueProps) => {
  const isAuthor = issue.authorId === currentUserId;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        {issue.status === "open" ? (
          <CircleDot aria-label="Offen" className="text-open" />
        ) : (
          <CircleCheck aria-label="Geschlossen" className="text-closed" />
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="hover:underline">
          <Link href={`/issues/${issue._id}`}>{issue.title}</Link>
        </ItemTitle>
      </ItemContent>
      {isAuthor && (
        <ItemActions>
          {onEdit && (
            <Button
              aria-label="Issue bearbeiten"
              disabled={isDeleting}
              loading={isDeleting}
              onClick={() => onEdit(issue)}
              size="icon"
              variant="outline"
            >
              <Pencil aria-hidden="true" />
            </Button>
          )}
          {onDelete && (
            <Button
              aria-label="Issue löschen"
              disabled={isDeleting}
              loading={isDeleting}
              onClick={() => onDelete(issue._id)}
              size="icon"
              variant="outline"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          )}
        </ItemActions>
      )}
    </Item>
  );
};
