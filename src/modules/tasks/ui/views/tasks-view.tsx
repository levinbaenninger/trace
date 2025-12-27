"use client";

import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseError } from "@/utils/error/parse";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { TASK_LIMIT } from "../../../../../convex/tasks/_lib/constants";
import type {
  CreateTaskErrors,
  RemoveTaskErrors,
  ToggleTaskErrors,
} from "../../../../../convex/tasks/_lib/errors";
import {
  getCreateTaskErrorMessage,
  getRemoveTaskErrorMessage,
  getToggleTaskErrorMessage,
} from "../../utils/errors";
import { TaskForm } from "../components/task-form";
import { TaskItem } from "../components/task-item";
import { TaskListEmpty } from "../components/task-list-empty";

interface TasksViewProps {
  preloadedTasks: Preloaded<typeof api.tasks.list.default>;
}

export const TasksView = ({ preloadedTasks }: TasksViewProps) => {
  const tasks = usePreloadedQuery(preloadedTasks);
  const createTask = useMutation(api.tasks.create.default);
  const toggleTask = useMutation(api.tasks.toggle.default);
  const removeTask = useMutation(api.tasks.remove.default);

  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"tasks"> | null>(null);

  const handleCreate = async (text: string) => {
    setIsCreating(true);
    try {
      await createTask({ text });
    } catch (error) {
      const parsedError = parseError<CreateTaskErrors>(error);
      toast.error(getCreateTaskErrorMessage(parsedError));
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggle = async (id: Id<"tasks">) => {
    try {
      await toggleTask({ id });
    } catch (error) {
      const parsedError = parseError<ToggleTaskErrors>(error);
      toast.error(getToggleTaskErrorMessage(parsedError));
    }
  };

  const handleDelete = async (id: Id<"tasks">) => {
    setDeletingId(id);
    try {
      await removeTask({ id });
    } catch (error) {
      const parsedError = parseError<RemoveTaskErrors>(error);
      toast.error(getRemoveTaskErrorMessage(parsedError));
    } finally {
      setDeletingId(null);
    }
  };

  const isEmpty = tasks.length === 0;
  const taskCount = tasks.length;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>
          Tasks ({taskCount}/{TASK_LIMIT})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TaskForm
          disabled={taskCount >= TASK_LIMIT}
          isLoading={isCreating}
          onSubmit={handleCreate}
        />

        <div className="space-y-2">
          {isEmpty && <TaskListEmpty />}

          {tasks.map((task) => (
            <TaskItem
              id={task._id}
              isCompleted={task.isCompleted}
              isDeleting={deletingId === task._id}
              key={task._id}
              onDelete={handleDelete}
              onToggle={handleToggle}
              text={task.text}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
