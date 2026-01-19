"use client";

import { api } from "@convex/_generated/api";
import type { Doc, Id } from "@convex/_generated/dataModel";
import type {
  CreateIssueErrors,
  RemoveIssueErrors,
  UpdateIssueErrors,
} from "@convex/issues/_lib/errors";
import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { AlertCircle, AlertCircleIcon, Plus } from "lucide-react";
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
import {
  getCreateIssueErrorMessage,
  getRemoveIssueErrorMessage,
  getUpdateIssueErrorMessage,
} from "../../errors";
import type { CreateIssue, UpdateIssue } from "../../schemas/issue.schema";
import { Issue } from "../components/issue";
import { IssueForm } from "../components/issue-form";

interface IssuesCardProps {
  actionsDisabled?: boolean;
  onCreateClick?: () => void;
  children: ReactNode;
}

const IssuesCard = ({
  actionsDisabled = false,
  onCreateClick,
  children,
}: IssuesCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues</CardTitle>
        <CardDescription>
          Alles, was uns im Basislehrjahr beschäftigt hat, von Modulen bis zu
          konkreten Problemen.
        </CardDescription>
        <CardAction>
          <Button
            disabled={actionsDisabled}
            onClick={onCreateClick}
            size={isMobile ? "icon-sm" : "sm"}
          >
            <Plus />
            <span className="sr-only md:not-sr-only">
              Neues Issue erstellen
            </span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

interface IssuesProps {
  preloadedIssues: Preloaded<typeof api.issues.list.default>;
  preloadedUsers: Preloaded<typeof api.users.list.default>;
  preloadedCurrentUserId: Preloaded<typeof api.users.getCurrentUserId.default>;
}

export const Issues = ({
  preloadedIssues,
  preloadedUsers,
  preloadedCurrentUserId,
}: IssuesProps) => {
  const issues = usePreloadedQuery(preloadedIssues);
  const users = usePreloadedQuery(preloadedUsers);
  const currentUserId = usePreloadedQuery(preloadedCurrentUserId);
  const createIssue = useMutation(api.issues.create.default);
  const updateIssue = useMutation(api.issues.update.default);
  const removeIssue = useMutation(api.issues.remove.default);

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm(
    "Issue löschen",
    "Bist du sicher, dass du dieses Issue löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.",
    "Löschen",
    "Abbrechen"
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Doc<"issues"> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<"issues"> | null>(null);

  const handleSubmit = async (data: CreateIssue | UpdateIssue) => {
    setIsSubmitting(true);
    try {
      if (editingIssue) {
        await updateIssue({ id: editingIssue._id, ...data });
      } else {
        await createIssue(data);
      }

      return true;
    } catch (error) {
      if (editingIssue) {
        const parsedError = parseError<UpdateIssueErrors>(error);
        toast.error(getUpdateIssueErrorMessage(parsedError));
      } else {
        const parsedError = parseError<CreateIssueErrors>(error);
        toast.error(getCreateIssueErrorMessage(parsedError));
      }

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: Id<"issues">) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await removeIssue({ id });
    } catch (error) {
      const parsedError = parseError<RemoveIssueErrors>(error);
      toast.error(getRemoveIssueErrorMessage(parsedError));
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (issue: Doc<"issues">) => {
    setEditingIssue(issue);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingIssue(null);
  };

  const isEmpty = issues.length === 0;

  return (
    <>
      <ConfirmDeleteDialog />
      <IssuesCard onCreateClick={() => setIsFormOpen(true)}>
        {isEmpty && <IssuesEmpty />}

        <div className="space-y-2">
          {issues.map((issue) => (
            <Issue
              currentUserId={currentUserId}
              isDeleting={deletingId === issue._id}
              issue={issue}
              key={issue._id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </IssuesCard>

      <IssueForm
        isLoading={isSubmitting}
        issue={editingIssue ?? undefined}
        onOpenChange={handleFormClose}
        onSubmit={handleSubmit}
        open={isFormOpen}
        users={users}
      />
    </>
  );
};

const IssuesEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Noch keine Issues</EmptyTitle>
        <EmptyDescription>Erstelle ein Issue, um zu beginnen.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export const IssuesLoading = () => {
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

interface IssuesErrorProps {
  reset: () => void;
}

export const IssuesError = ({ reset }: IssuesErrorProps) => {
  return (
    <IssuesCard actionsDisabled>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Fehler beim Laden</EmptyTitle>
          <EmptyDescription>
            Die Issues konnten nicht geladen werden. Bitte versuche es erneut.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="outline">
            Erneut versuchen
          </Button>
        </EmptyContent>
      </Empty>
    </IssuesCard>
  );
};
