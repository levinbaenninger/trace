"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTasks } from "../hooks/use-tasks";
import { createTaskSchema } from "../schemas/task.schema";

export const TaskForm = () => {
  const { handleCreate } = useTasks();

  const form = useForm({
    defaultValues: {
      text: "",
    },
    validators: {
      onSubmit: createTaskSchema,
    },
    onSubmit: async ({ value }) => {
      await handleCreate(value.text);
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
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add a new task..."
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="text"
        />
      </FieldGroup>
      <Button type="submit">Add</Button>
    </form>
  );
};
