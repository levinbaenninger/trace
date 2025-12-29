"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTaskSchema } from "../../schemas/task.schema";

interface TaskFormProps {
  disabled?: boolean;
  isLoading?: boolean;
  onSubmit: (text: string) => Promise<void>;
}

export const TaskForm = ({ disabled, isLoading, onSubmit }: TaskFormProps) => {
  const form = useForm({
    defaultValues: {
      text: "",
    },
    validators: {
      onSubmit: createTaskSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.text);
      form.reset();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  disabled={disabled || isLoading}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={
                    disabled
                      ? "Maximale Anzahl an Aufgaben erreicht"
                      : "Neue Aufgabe hinzufügen..."
                  }
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="text"
        />
      </FieldGroup>
      <Button
        disabled={disabled || isLoading}
        loading={isLoading}
        type="submit"
      >
        Hinzufügen
      </Button>
    </form>
  );
};
