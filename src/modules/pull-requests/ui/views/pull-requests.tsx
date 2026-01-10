"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { AlertCircle, Plus } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirm } from "@/hooks/use-confirm";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { PullRequestsEmpty } from "../components/pull-requests-empty";

interface PullRequestsProps {
  preloadedPullRequests: Preloaded<typeof api.pullRequests.list.default>;
}

export const PullRequests = ({ preloadedPullRequests }: PullRequestsProps) => {
  const pullRequests = usePreloadedQuery(preloadedPullRequests);
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
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingPR, setEditingPR] = useState<Doc<"pullRequests"> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<"pullRequests"> | null>(null);

  const handleCreate = async (data: CreatePullRequest) => {
    setIsCreating(true);
    try {
      // Convert string IDs back to Id<"issues">
      await createPullRequest({
        ...data,
        issueIds: data.issueIds as Id<"issues">[],
      });
    } catch (error) {
      const parsedError = parseError<CreatePullRequestErrors>(error);
      toast.error(getCreatePullRequestErrorMessage(parsedError));
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (data: UpdatePullRequest) => {
    if (!editingPR) return;

    setIsUpdating(true);
    try {
      await updatePullRequest({
        id: editingPR._id,
        ...data,
        issueIds: data.issueIds as Id<"issues">[],
      });
      setEditingPR(null);
    } catch (error) {
      const parsedError = parseError<UpdatePullRequestErrors>(error);
      toast.error(getUpdatePullRequestErrorMessage(parsedError));
    } finally {
      setIsUpdating(false);
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

  const isMobile = useIsMobile();
  const isEmpty = pullRequests.length === 0;

  return (
    <>
      <ConfirmDialog />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pull Requests</CardTitle>
          <CardDescription>
            Der Weg von einer Idee oder einem Problem hin zu einer Lösung.
          </CardDescription>
          <CardAction>
            {!isMobile ? (
              <Button onClick={() => setIsFormOpen(true)} size="sm">
                <Plus className="h-4 w-4" />
                Neuen Pull Request erstellen
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => setIsFormOpen(true)} size="icon-sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Neuen Pull Request erstellen</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEmpty && <PullRequestsEmpty />}

          <div className="space-y-2">
            {pullRequests.map((pr) => (
              <PullRequest
                isDeleting={deletingId === pr._id}
                key={pr._id}
                onDelete={handleDelete}
                onEdit={handleEdit}
                pullRequest={pr}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <PullRequestForm
        isLoading={isCreating || isUpdating}
        onOpenChange={handleFormClose}
        onSubmit={editingPR ? handleUpdate : handleCreate}
        open={isFormOpen}
        pullRequest={editingPR ?? undefined}
      />
    </>
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
          {!isMobile ? (
            <Skeleton className="h-9 w-24" />
          ) : (
            <Skeleton className="size-9" />
          )}
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
  error: Error & { digest?: string };
  reset: () => void;
}

export const PullRequestsError = ({ reset }: PullRequestsErrorProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pull Requests</CardTitle>
        <CardDescription>
          Der Weg von einer Idee oder einem Problem hin zu einer Lösung.
        </CardDescription>
        <CardAction>
          {!isMobile ? (
            <Button disabled size="sm">
              <Plus className="h-4 w-4" />
              Neuen Pull Request erstellen
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled size="icon-sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Neuen Pull Request erstellen</p>
              </TooltipContent>
            </Tooltip>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
