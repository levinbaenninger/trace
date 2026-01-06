"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Item, ItemActions, ItemContent } from "./ui/item";

const SKELETON_ITEMS = ["skeleton-1", "skeleton-2", "skeleton-3"] as const;

export const ListSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-1/2" />
          <CardAction>
            {!isMobile ? (
              <Skeleton className="h-9 w-24" />
            ) : (
              <Skeleton className="size-9" />
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {SKELETON_ITEMS.map((id) => (
              <Item key={id} variant="outline">
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
    </div>
  );
};
