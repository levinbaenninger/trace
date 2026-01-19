"use client";

import { api } from "@convex/_generated/api";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { AlertCircle, AlertCircleIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Commit } from "../components/commit";

interface CommitsCardProps {
  children: ReactNode;
}

const CommitsCard = ({ children }: CommitsCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Commits</CardTitle>
        <CardDescription>
          Eine zeitliche Übersicht über alles, was wir erfolgreich abgeschlossen
          haben.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

interface CommitsProps {
  preloadedCommits: Preloaded<typeof api.commits.list.default>;
}

export const Commits = ({ preloadedCommits }: CommitsProps) => {
  const commits = usePreloadedQuery(preloadedCommits);

  const isEmpty = commits.length === 0;

  return (
    <CommitsCard>
      {isEmpty && <CommitsEmpty />}

      <div className="space-y-0">
        {commits.map((commit, index) => (
          <Commit
            commit={commit}
            isLast={index === commits.length - 1}
            key={commit._id}
          />
        ))}
      </div>
    </CommitsCard>
  );
};

const CommitsEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Noch keine Commits</EmptyTitle>
        <EmptyDescription>
          Commits werden erstellt, wenn Pull Requests merged werden.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export const CommitsLoading = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="relative flex gap-4 pb-4 last:pb-0" key={index}>
              {/* Timeline column skeleton */}
              <div className="relative flex items-center py-6">
                {/* Line going down (except for last item) */}
                {index < 2 && (
                  <div
                    className="absolute left-1/2 w-0.5 -translate-x-1/2 bg-border"
                    style={{
                      top: "50%",
                      bottom: "calc(-1rem - 1.5rem - 0.375rem)",
                      marginTop: "0.375rem",
                    }}
                  />
                )}
                {/* Dot skeleton */}
                <Skeleton className="size-3 rounded-full" />
              </div>

              {/* Item content skeleton */}
              <div className="flex-1">
                <Item variant="outline">
                  <ItemContent>
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-32" />
                  </ItemContent>
                  <ItemActions>
                    <Skeleton className="h-8 w-8 md:w-32" />
                  </ItemActions>
                </Item>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface CommitsErrorProps {
  reset: () => void;
}

export const CommitsError = ({ reset }: CommitsErrorProps) => {
  return (
    <CommitsCard>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            Die Commits konnten nicht geladen werden. Bitte versuche es erneut.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="outline">
            Erneut versuchen
          </Button>
        </EmptyContent>
      </Empty>
    </CommitsCard>
  );
};
