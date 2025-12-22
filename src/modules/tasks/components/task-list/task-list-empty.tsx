import { AlertCircleIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const TaskListEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>No tasks yet</EmptyTitle>
        <EmptyDescription>Create one above to get started.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
