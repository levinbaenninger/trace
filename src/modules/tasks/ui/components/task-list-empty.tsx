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
        <EmptyTitle>Noch keine Aufgaben</EmptyTitle>
        <EmptyDescription>
          Erstelle eine Aufgabe oben, um zu beginnen.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
