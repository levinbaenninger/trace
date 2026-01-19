"use client";

import type { Doc } from "@convex/_generated/dataModel";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useIsMobile } from "@/hooks/use-mobile";

interface CommitProps {
  commit: Doc<"commits">;
  isLast?: boolean;
}

export const Commit = ({ commit, isLast = false }: CommitProps) => {
  const isMobile = useIsMobile();
  const date = new Date(commit._creationTime);

  const formattedTime = date.toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="relative flex gap-4 pb-4 last:pb-0">
      <div className="relative flex items-center py-6">
        {!isLast && (
          <div
            className="absolute left-1/2 w-0.5 -translate-x-1/2 bg-border"
            style={{
              top: "50%",
              bottom: "calc(-1rem - 1.5rem - 0.375rem)",
              marginTop: "0.375rem",
            }}
          />
        )}

        <div className="relative z-10 flex size-3 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
          <div className="size-1.5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex-1">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>{commit.message}</ItemTitle>
            <ItemDescription>
              {formattedDate} um {formattedTime}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              asChild
              size={isMobile ? "icon-sm" : "sm"}
              variant="outline"
            >
              <Link href={`/pulls/${commit.pullRequestId}`}>
                <EyeIcon aria-hidden="true" />
                <span className="sr-only md:not-sr-only">
                  Pull Request ansehen
                </span>
              </Link>
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};
