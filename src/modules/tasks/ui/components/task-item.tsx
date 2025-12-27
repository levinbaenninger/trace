"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  id: Id<"tasks">;
  text: string;
  isCompleted: boolean;
  isDeleting?: boolean;
  onToggle: (id: Id<"tasks">) => void;
  onDelete: (id: Id<"tasks">) => void;
}

export const TaskItem = ({
  id,
  text,
  isCompleted,
  isDeleting,
  onToggle,
  onDelete,
}: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
      <Checkbox
        checked={isCompleted}
        id={id}
        onCheckedChange={() => onToggle(id)}
      />
      <label
        className={`flex-1 cursor-pointer ${
          isCompleted ? "text-muted-foreground line-through" : ""
        }`}
        htmlFor={id}
      >
        {text}
      </label>
      <Button
        className="h-8 w-8 text-destructive hover:text-destructive"
        disabled={isDeleting}
        loading={isDeleting}
        onClick={() => onDelete(id)}
        size="icon"
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
