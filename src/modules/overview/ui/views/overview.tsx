"use client";

import { ErrorCard } from "@/components/error-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Hero } from "../components/hero";
import { Workflow } from "../components/workflow";

export const Overview = () => {
  return (
    <div className="space-y-6">
      <Hero />
      <Workflow />
    </div>
  );
};

export const OverviewLoading = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export const OverviewError = () => {
  return (
    <ErrorCard
      message="Fehler beim Laden der Übersicht. Bitte versuche es erneut."
      title="Fehler beim Laden der Übersicht"
    />
  );
};
