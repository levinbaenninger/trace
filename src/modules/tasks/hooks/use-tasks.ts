import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export const useTasks = () => {
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const handleCreate = async (text: string) => {
    try {
      await createTask({ text });
    } catch {
      toast.error("Failed to create task");
    }
  };

  const handleToggle = async (id: Id<"tasks">) => {
    try {
      await toggleTask({ id });
    } catch {
      toast.error("Failed to toggle task");
    }
  };

  const handleDelete = async (id: Id<"tasks">) => {
    try {
      await removeTask({ id });
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return {
    tasks,
    handleCreate,
    handleToggle,
    handleDelete,
  };
};
