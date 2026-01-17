"use client";

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
import { api } from "../../../../../convex/_generated/api";
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

      <div className="space-y-2">
        {commits.map((commit) => (
          <Commit commit={commit} key={commit._id} />
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
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Item key={index} variant="outline">
              <Skeleton className="size-8" />
              <ItemContent>
                <Skeleton className="h-4 w-1/2" />
              </ItemContent>
              <ItemActions>
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
              </ItemActions>
            </Item>
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
