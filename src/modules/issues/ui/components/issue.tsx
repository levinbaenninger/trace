"use client";

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
import type { Doc, Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  issue: Doc<"issues">;
  onEdit?: (issue: Doc<"issues">) => void;
  onDelete?: (id: Id<"issues">) => void;
  isDeleting?: boolean;
}

export const Issue = ({ issue, onEdit, onDelete, isDeleting }: Props) => {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        {issue.status === "open" ? (
          <CircleDot className="text-green-600" />
        ) : (
          <CircleCheck className="text-indigo-500" />
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="hover:underline">
          <Link href={`/issues/${issue._id}`}>{issue.title}</Link>
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        {onEdit && (
          <Button
            disabled={isDeleting}
            loading={isDeleting}
            onClick={() => onEdit(issue)}
            size="icon"
            variant="outline"
          >
            <Pencil />
          </Button>
        )}
        {onDelete && (
          <Button
            disabled={isDeleting}
            loading={isDeleting}
            onClick={() => onDelete(issue._id)}
            size="icon"
            variant="outline"
          >
            <Trash2 />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
};
