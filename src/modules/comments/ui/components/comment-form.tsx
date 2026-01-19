"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { ArrowUpIcon } from "lucide-react";
import { toast } from "sonner";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import type { CreateCommentErrors } from "../../../../../convex/comments/_lib/errors";
import { getCreateCommentErrorMessage } from "../../errors";

interface CommentFormProps {
  pullRequestId: Id<"pullRequests">;
}

export const CommentForm = ({ pullRequestId }: CommentFormProps) => {
  const createComment = useMutation(api.comments.create.default);

  const form = useForm({
    defaultValues: {
      content: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await createComment({
          pullRequestId,
          content: value.content,
        });
        form.reset();
      } catch (error) {
        const parsedError = parseError<CreateCommentErrors>(error);
        toast.error(getCreateCommentErrorMessage(parsedError));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <form.Field name="content">
        {(field) => (
          <InputGroup>
            <InputGroupTextarea
              disabled={form.state.isSubmitting}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Schreibe einen Kommentar..."
              value={field.state.value}
            />
            <InputGroupAddon align="block-end" className="justify-end">
              <InputGroupButton
                className="rounded-full"
                disabled={form.state.isSubmitting || !field.state.value.trim()}
                size="icon-xs"
                type="submit"
                variant="default"
              >
                <ArrowUpIcon />
                <span className="sr-only">
                  {form.state.isSubmitting
                    ? "Wird gesendet..."
                    : "Kommentar senden"}
                </span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        )}
      </form.Field>
    </form>
  );
};
