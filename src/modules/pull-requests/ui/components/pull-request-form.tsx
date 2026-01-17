"use client";

import { useForm } from "@tanstack/react-form";
import { useQuery } from "convex/react";
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
import { UserMultiSelect } from "@/components/user-select";
import { api } from "../../../../../convex/_generated/api";
import type { Doc } from "../../../../../convex/_generated/dataModel";
import { PREDEFINED_LABELS } from "../../../../../convex/issues/_lib/constants";
import {
  type CreatePullRequest,
  createPullRequestSchema,
  type UpdatePullRequest,
  updatePullRequestSchema,
} from "../../schemas/pull-request.schema";

interface PullRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreatePullRequest | UpdatePullRequest) => Promise<void>;
  isLoading?: boolean;
  pullRequest?: Doc<"pullRequests">;
  users: FunctionReturnType<typeof api.users.list.default>;
}

const labelOptions = PREDEFINED_LABELS.map((label) => ({
  label,
  value: label,
}));

export const PullRequestForm = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  pullRequest,
  users,
}: PullRequestFormProps) => {
  const issues = useQuery(api.issues.list.default);

  const issueOptions =
    issues?.map((issue) => ({
      label: `#${issue._id.slice(-6)} - ${issue.title}`,
      value: issue._id,
    })) ?? [];

  const form = useForm({
    defaultValues: {
      title: pullRequest?.title ?? "",
      description: pullRequest?.description ?? "",
      issueIds: pullRequest?.issueIds.map(String) ?? [],
      labels: pullRequest?.labels ?? [],
      assignees: pullRequest?.assignees ?? [],
      reviewers: pullRequest?.reviewers ?? [],
    },
    validators: {
      onChange: pullRequest ? updatePullRequestSchema : createPullRequestSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
      onOpenChange(false);
      form.reset();
    },
  });

  useEffect(() => {
    if (pullRequest) {
      form.setFieldValue("title", pullRequest.title);
      form.setFieldValue("description", pullRequest.description);
      form.setFieldValue("issueIds", pullRequest.issueIds.map(String));
      form.setFieldValue("labels", pullRequest.labels);
      form.setFieldValue("assignees", pullRequest.assignees);
      form.setFieldValue("reviewers", pullRequest.reviewers);
    }
  }, [pullRequest, form]);

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
      description={
        pullRequest
          ? "Pull Request aktualisieren"
          : "Neuen Pull Request erstellen"
      }
      onOpenChange={handleClose}
      open={open}
      title={pullRequest ? "Pull Request bearbeiten" : "Pull Request erstellen"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FieldSet>
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
                    placeholder="Titel des Pull Requests eingeben..."
                    value={field.state.value}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
            name="title"
          />

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
                    placeholder="Beschreibung des Pull Requests eingeben..."
                    value={field.state.value}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
            name="description"
          />

          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Verbundene Issues *
                  </FieldLabel>
                  <MultiSelect
                    aria-invalid={isInvalid}
                    defaultValue={field.state.value}
                    disabled={isLoading}
                    onValueChange={(value) => field.handleChange(value)}
                    options={issueOptions}
                    placeholder="Issues auswählen..."
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
            name="issueIds"
          />

          <form.Field
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Labels</FieldLabel>
                <MultiSelect
                  defaultValue={field.state.value}
                  disabled={isLoading}
                  onValueChange={(value) => field.handleChange(value)}
                  options={labelOptions}
                  placeholder="Labels auswählen..."
                />
              </Field>
            )}
            name="labels"
          />

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

          <form.Field
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Reviewer</FieldLabel>
                <UserMultiSelect
                  disabled={isLoading}
                  onChange={(value) => field.handleChange(value)}
                  placeholder="Reviewer auswählen..."
                  users={users}
                  value={field.state.value}
                />
              </Field>
            )}
            name="reviewers"
          />
        </FieldSet>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              Abbrechen
            </Button>
          </DialogClose>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            {pullRequest ? "Aktualisieren" : "Erstellen"}
          </Button>
        </DialogFooter>
      </form>
    </ResponsiveDialog>
  );
};
