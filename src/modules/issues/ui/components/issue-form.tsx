"use client";

import { useForm } from "@tanstack/react-form";
import type { FunctionReturnType } from "convex/server";
import { useEffect } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserMultiSelect } from "@/modules/users/ui/components/user-select";
import { api } from "../../../../../convex/_generated/api";
import type { Doc } from "../../../../../convex/_generated/dataModel";
import { PREDEFINED_LABELS } from "../../../../../convex/issues/_lib/constants";
import {
  type CreateIssue,
  createIssueSchema,
  type UpdateIssue,
  updateIssueSchema,
} from "../../schemas/issue.schema";

interface IssueFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateIssue | UpdateIssue) => Promise<boolean>;
  isLoading?: boolean;
  issue?: Doc<"issues">;
  users: FunctionReturnType<typeof api.users.list.default>;
}

const labelOptions = PREDEFINED_LABELS.map((label) => ({
  label,
  value: label,
}));

export const IssueForm = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  issue,
  users,
}: IssueFormProps) => {
  const isMobile = useIsMobile();

  const form = useForm({
    defaultValues: {
      title: issue?.title ?? "",
      description: issue?.description ?? "",
      labels: issue?.labels ?? [],
      assignees: issue?.assignees ?? [],
    },
    validators: {
      onChange: issue ? updateIssueSchema : createIssueSchema,
    },
    onSubmit: async ({ value }) => {
      const success = await onSubmit(value);
      if (success) {
        onOpenChange(false);
        form.reset();
      }
    },
  });

  useEffect(() => {
    if (issue) {
      form.setFieldValue("title", issue.title);
      form.setFieldValue("description", issue.description);
      form.setFieldValue("labels", issue.labels);
      form.setFieldValue("assignees", issue.assignees);
    }
  }, [issue, form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <ResponsiveDialog
      description={issue ? "Issue aktualisieren" : "Neues Issue erstellen"}
      onOpenChange={handleClose}
      open={open}
      title={issue ? "Issue bearbeiten" : "Issue erstellen"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Titel *</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      disabled={isLoading}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Titel des Issues eingeben..."
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="title"
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Beschreibung *</FieldLabel>
                    <Textarea
                      aria-invalid={isInvalid}
                      className="min-h-[100px]"
                      disabled={isLoading}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Beschreibung des Issues eingeben..."
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="description"
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Labels</FieldLabel>
                  <MultiSelect
                    defaultValue={field.state.value}
                    disabled={isLoading}
                    hideSelectAll={true}
                    onValueChange={(value) => field.handleChange(value)}
                    options={labelOptions}
                    placeholder="Labels auswählen..."
                    searchable={!isMobile}
                  />
                </Field>
              )}
              name="labels"
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Zuweisen an</FieldLabel>
                  <UserMultiSelect
                    disabled={isLoading}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Zuweisen an..."
                    users={users}
                    value={field.state.value}
                  />
                </Field>
              )}
              name="assignees"
            />
          </FieldGroup>
        </FieldSet>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              Abbrechen
            </Button>
          </DialogClose>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            {issue ? "Aktualisieren" : "Erstellen"}
          </Button>
        </DialogFooter>
      </form>
    </ResponsiveDialog>
  );
};
