"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState } from "@/components/error-state";
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
  CreateIssueErrors,
  RemoveIssueErrors,
  UpdateIssueErrors,
} from "../../../../../convex/issues/_lib/errors";
import {
  getCreateIssueErrorMessage,
  getRemoveIssueErrorMessage,
  getUpdateIssueErrorMessage,
} from "../../errors";
import type { CreateIssue, UpdateIssue } from "../../schemas/issue.schema";
import { Issue } from "../components/issue";
import { IssueForm } from "../components/issue-form";
import { IssueListEmpty } from "../components/issue-list-empty";

interface Props {
  preloadedIssues: Preloaded<typeof api.issues.list.default>;
}

export const Issues = ({ preloadedIssues }: Props) => {
  const issues = usePreloadedQuery(preloadedIssues);
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
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Doc<"issues"> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<"issues"> | null>(null);

  const handleCreate = async (data: CreateIssue) => {
    setIsCreating(true);
    try {
      await createIssue(data);
    } catch (error) {
      const parsedError = parseError<CreateIssueErrors>(error);
      toast.error(getCreateIssueErrorMessage(parsedError));
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (data: UpdateIssue) => {
    if (!editingIssue) return;

    setIsUpdating(true);
    try {
      await updateIssue({ id: editingIssue._id, ...data });
      setEditingIssue(null);
    } catch (error) {
      const parsedError = parseError<UpdateIssueErrors>(error);
      toast.error(getUpdateIssueErrorMessage(parsedError));
    } finally {
      setIsUpdating(false);
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

  const isMobile = useIsMobile();
  const isEmpty = issues.length === 0;

  return (
    <>
      <ConfirmDeleteDialog />
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
          <CardDescription>
            Alles, was uns im Basislehrjahr beschäftigt hat, von Modulen bis zu
            konkreten Problemen.
          </CardDescription>
          <CardAction>
            {!isMobile ? (
              <Button onClick={() => setIsFormOpen(true)} size="sm">
                <Plus />
                Neues Issue erstellen
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => setIsFormOpen(true)} size="icon-sm">
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Neues Issue erstellen</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEmpty && <IssueListEmpty />}

          <div className="space-y-2">
            {issues.map((issue) => (
              <Issue
                isDeleting={deletingId === issue._id}
                issue={issue}
                key={issue._id}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <IssueForm
        isLoading={isCreating || isUpdating}
        issue={editingIssue ?? undefined}
        onOpenChange={handleFormClose}
        onSubmit={editingIssue ? handleUpdate : handleCreate}
        open={isFormOpen}
      />
    </>
  );
};

export const IssuesError = () => {
  return (
    <ErrorState
      message="Fehler beim Laden der Issues. Bitte versuche es erneut."
      title="Fehler beim Laden der Issues"
    />
  );
};
