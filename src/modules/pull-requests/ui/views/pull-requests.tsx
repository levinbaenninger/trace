"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { AlertCircle, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { useConfirm } from "@/hooks/use-confirm";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type { Doc, Id } from "../../../../../convex/_generated/dataModel";
import type {
  CreatePullRequestErrors,
  RemovePullRequestErrors,
  UpdatePullRequestErrors,
} from "../../../../../convex/pullRequests/_lib/errors";
import {
  getCreatePullRequestErrorMessage,
  getRemovePullRequestErrorMessage,
  getUpdatePullRequestErrorMessage,
} from "../../errors";
import type {
  CreatePullRequest,
  UpdatePullRequest,
} from "../../schemas/pull-request.schema";
import { PullRequest } from "../components/pull-request";
import { PullRequestForm } from "../components/pull-request-form";

interface PullRequestsCardProps {
  actionsDisabled?: boolean;
  onCreateClick?: () => void;
  children: ReactNode;
}

const PullRequestsCard = ({
  actionsDisabled = false,
  onCreateClick,
  children,
}: PullRequestsCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pull Requests</CardTitle>
        <CardDescription>
          Der Weg von einer Idee oder einem Problem hin zu einer Lösung.
        </CardDescription>
        <CardAction>
          <Button
            disabled={actionsDisabled}
            onClick={onCreateClick}
            size={isMobile ? "icon-sm" : "sm"}
          >
            <Plus />
            <span className="sr-only md:not-sr-only">
              Neuen Pull Request erstellen
            </span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

interface PullRequestsProps {
  preloadedPullRequests: Preloaded<typeof api.pullRequests.list.default>;
  preloadedUsers: Preloaded<typeof api.users.list.default>;
  preloadedCurrentUserId: Preloaded<typeof api.users.getCurrentUserId.default>;
}

export const PullRequests = ({
  preloadedPullRequests,
  preloadedUsers,
  preloadedCurrentUserId,
}: PullRequestsProps) => {
  const pullRequests = usePreloadedQuery(preloadedPullRequests);
  const users = usePreloadedQuery(preloadedUsers);
  const currentUserId = usePreloadedQuery(preloadedCurrentUserId);
  const createPullRequest = useMutation(api.pullRequests.create.default);
  const updatePullRequest = useMutation(api.pullRequests.update.default);
  const removePullRequest = useMutation(api.pullRequests.remove.default);

  const [ConfirmDialog, confirm] = useConfirm(
    "Pull Request löschen",
    "Bist du sicher, dass du diesen Pull Request löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.",
    "Löschen",
    "Abbrechen"
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPR, setEditingPR] = useState<Doc<"pullRequests"> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<"pullRequests"> | null>(null);

  const handleSubmit = async (data: CreatePullRequest | UpdatePullRequest) => {
    setIsSubmitting(true);
    try {
      if (editingPR) {
        await updatePullRequest({
          id: editingPR._id,
          ...data,
          issueIds: data.issueIds as Id<"issues">[],
        });
      } else {
        await createPullRequest({
          ...data,
          issueIds: data.issueIds as Id<"issues">[],
        });
      }

      return true;
    } catch (error) {
      if (editingPR) {
        const parsedError = parseError<UpdatePullRequestErrors>(error);
        toast.error(getUpdatePullRequestErrorMessage(parsedError));
      } else {
        const parsedError = parseError<CreatePullRequestErrors>(error);
        toast.error(getCreatePullRequestErrorMessage(parsedError));
      }

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: Id<"pullRequests">) => {
    const confirmed = await confirm();
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await removePullRequest({ id });
    } catch (error) {
      const parsedError = parseError<RemovePullRequestErrors>(error);
      toast.error(getRemovePullRequestErrorMessage(parsedError));
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (pr: Doc<"pullRequests">) => {
    setEditingPR(pr);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPR(null);
  };

  const isEmpty = pullRequests.length === 0;

  return (
    <>
      <ConfirmDialog />
      <PullRequestsCard onCreateClick={() => setIsFormOpen(true)}>
        {isEmpty && <PullRequestsEmpty />}

        <div className="space-y-2">
          {pullRequests.map((pr) => (
            <PullRequest
              currentUserId={currentUserId}
              isDeleting={deletingId === pr._id}
              key={pr._id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              pullRequest={pr}
            />
          ))}
        </div>
      </PullRequestsCard>

      <PullRequestForm
        isLoading={isSubmitting}
        onOpenChange={handleFormClose}
        onSubmit={handleSubmit}
        open={isFormOpen}
        pullRequest={editingPR ?? undefined}
        users={users}
      />
    </>
  );
};

const PullRequestsEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle />
        </EmptyMedia>
        <EmptyTitle>Noch keine Pull Requests</EmptyTitle>
        <EmptyDescription>
          Erstelle ein Pull Request, um zu beginnen.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export const PullRequestsLoading = () => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-1/2" />
        <CardAction>
          <Skeleton className={cn(isMobile ? "size-8" : "h-8 w-24")} />
        </CardAction>
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

interface PullRequestsErrorProps {
  reset: () => void;
}

export const PullRequestsError = ({ reset }: PullRequestsErrorProps) => {
  return (
    <PullRequestsCard actionsDisabled>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            Die Pull Requests konnten nicht geladen werden. Bitte versuche es
            erneut.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="outline">
            Erneut versuchen
          </Button>
        </EmptyContent>
      </Empty>
    </PullRequestsCard>
  );
};
