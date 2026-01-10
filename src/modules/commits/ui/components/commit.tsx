"use client";

import { EyeIcon, GitCommit } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface CommitProps {
  commit: Doc<"commits">;
}

export const Commit = ({ commit }: CommitProps) => {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <GitCommit />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{commit.message}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button asChild size="sm" variant="outline">
          <Link href={`/pulls/${commit.pullRequestId}`}>
            <EyeIcon />
            Pull Request ansehen
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
};
