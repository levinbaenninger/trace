"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";

import { AlertCircle } from "lucide-react";
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
import { CommitItem } from "../components/commit-item";
import { CommitListEmpty } from "../components/commit-list-empty";

interface Props {
  preloadedCommits: Preloaded<typeof api.commits.list.default>;
}

export const Commits = ({ preloadedCommits }: Props) => {
  const commits = usePreloadedQuery(preloadedCommits);

  const isEmpty = commits.length === 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Commits</CardTitle>
        <CardDescription>
          Eine zeitliche Übersicht über alles, was wir erfolgreich abgeschlossen
          haben.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEmpty && <CommitListEmpty />}

        <div className="space-y-2">
          {commits.map((commit) => (
            <CommitItem commit={commit} key={commit._id} />
          ))}
        </div>
      </CardContent>
    </Card>
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
  error: Error & { digest?: string };
  reset: () => void;
}

export const CommitsError = ({ reset }: CommitsErrorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Commits</CardTitle>
        <CardDescription>
          Eine zeitliche Übersicht über alles, was wir erfolgreich abgeschlossen
          haben.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>Fehler beim Laden</EmptyTitle>
            <EmptyDescription>
              Die Commits konnten nicht geladen werden. Bitte versuche es
              erneut.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={reset} variant="outline">
              Erneut versuchen
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
};
