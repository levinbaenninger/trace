"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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

interface OverviewErrorProps {
  reset: () => void;
}

export const OverviewError = ({ reset }: OverviewErrorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>Fehler beim Laden</EmptyTitle>
            <EmptyDescription>
              Die Übersicht konnte nicht geladen werden. Bitte versuche es
              erneut.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={reset} variant="outline">
              Erneut versuchen
            </Button>
          </EmptyContent>
        </Empty>
      </CardHeader>
    </Card>
  );
};
