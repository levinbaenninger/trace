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
import { useIsMobile } from "@/hooks/use-mobile";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface CommitProps {
  commit: Doc<"commits">;
}

export const Commit = ({ commit }: CommitProps) => {
  const isMobile = useIsMobile();

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <GitCommit aria-label="Commit" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{commit.message}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button asChild size={isMobile ? "icon-sm" : "sm"} variant="outline">
          <Link href={`/pulls/${commit.pullRequestId}`}>
            <EyeIcon aria-hidden="true" />
            <span className="sr-only md:not-sr-only">Pull Request ansehen</span>
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
};
