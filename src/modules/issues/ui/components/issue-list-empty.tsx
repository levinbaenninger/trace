import { AlertCircleIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const IssueListEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Noch keine Issues</EmptyTitle>
        <EmptyDescription>Erstelle ein Issue, um zu beginnen.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
