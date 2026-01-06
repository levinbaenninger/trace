"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";

import { ErrorState } from "@/components/error-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export const CommitsError = () => {
  return (
    <ErrorState
      message="Bitte versuche es erneut."
      title="Fehler beim Laden der Commits"
    />
  );
};
