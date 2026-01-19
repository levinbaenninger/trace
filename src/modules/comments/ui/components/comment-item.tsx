"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import type {
  DeleteCommentErrors,
  UpdateCommentErrors,
} from "../../../../../convex/comments/_lib/errors";
import {
  getDeleteCommentErrorMessage,
  getUpdateCommentErrorMessage,
} from "../../errors";

interface CommentItemProps {
  comment: {
    _id: Id<"comments">;
    _creationTime: number;
    authorId: string;
    content: string;
  };
  currentUserId: string;
  users: FunctionReturnType<typeof api.users.list.default>;
}

export const CommentItem = ({
  comment,
  currentUserId,
  users,
}: CommentItemProps) => {
  const deleteComment = useMutation(api.comments.remove.default);
  const updateComment = useMutation(api.comments.update.default);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const author = users?.find((u) => u.clerkId === comment.authorId);
  const displayName = author?.firstName || "Anonym";
  const isAuthor = comment.authorId === currentUserId;

  const form = useForm({
    defaultValues: {
      content: comment.content,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateComment({ id: comment._id, content: value.content });
        setIsEditing(false);
      } catch (error) {
        const parsedError = parseError<UpdateCommentErrors>(error);
        toast.error(getUpdateCommentErrorMessage(parsedError));
      }
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteComment({ id: comment._id });
    } catch (error) {
      const parsedError = parseError<DeleteCommentErrors>(error);
      toast.error(getDeleteCommentErrorMessage(parsedError));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldValue("content", comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.reset();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const createdAt = new Date(comment._creationTime);

  return (
    <Card className="gap-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {author?.imageUrl && (
                <AvatarImage alt={displayName} src={author.imageUrl} />
              )}
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              <CardDescription className="text-xs">
                {Intl.DateTimeFormat("de-CH", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(createdAt)}
              </CardDescription>
            </div>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex gap-1">
              <Button
                className="h-8 w-8"
                disabled={isDeleting || isEditing}
                loading={isEditing}
                onClick={handleEdit}
                size="icon"
                variant="ghost"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                className="h-8 w-8"
                disabled={isDeleting || isEditing}
                loading={isDeleting}
                onClick={handleDelete}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <form onSubmit={handleSaveEdit}>
            <form.Field name="content">
              {(field) => (
                <div className="space-y-3">
                  <Textarea
                    className="min-h-25 resize-none"
                    disabled={form.state.isSubmitting}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      disabled={form.state.isSubmitting}
                      onClick={handleCancelEdit}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Abbrechen
                    </Button>
                    <Button
                      disabled={
                        form.state.isSubmitting || !field.state.value.trim()
                      }
                      size="sm"
                      type="submit"
                    >
                      {form.state.isSubmitting
                        ? "Wird gespeichert..."
                        : "Speichern"}
                    </Button>
                  </div>
                </div>
              )}
            </form.Field>
          </form>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
        )}
      </CardContent>
    </Card>
  );
};
