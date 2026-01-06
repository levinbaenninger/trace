import { AlertCircleIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const CommitListEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Noch keine Commits</EmptyTitle>
        <EmptyDescription>
          Commits werden erstellt, wenn Pull Requests merged werden.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
