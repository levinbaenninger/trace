"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { UserMultiSelect } from "@/components/user-select";
import type { Doc } from "../../../../../convex/_generated/dataModel";
import { PREDEFINED_LABELS } from "../../../../../convex/issues/_lib/constants";
import {
  type CreateIssue,
  createIssueSchema,
  updateIssueSchema,
} from "../../schemas/issue.schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateIssue) => Promise<void>;
  isLoading?: boolean;
  issue?: Doc<"issues">;
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
}: Props) => {
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
      await onSubmit(value);
      onOpenChange(false);
      form.reset();
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
        <FieldGroup>
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Titel
                  </label>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Beschreibung
                  </label>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                <label className="text-sm font-medium">Labels auswählen</label>
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
        </FieldGroup>

        <FieldGroup>
          <form.Field
            children={(field) => (
              <Field>
                <label className="text-sm font-medium">Zuweisen</label>
                <UserMultiSelect
                  disabled={isLoading}
                  onChange={(value) => field.handleChange(value)}
                  placeholder="Zuweisen..."
                  value={field.state.value}
                />
              </Field>
            )}
            name="assignees"
          />
        </FieldGroup>

        <div className="flex justify-end gap-2">
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            variant="outline"
          >
            Abbrechen
          </Button>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            {issue ? "Aktualisieren" : "Erstellen"}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
};
