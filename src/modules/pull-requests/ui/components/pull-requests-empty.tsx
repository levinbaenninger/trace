import { AlertCircleIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const PullRequestsEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Noch keine Pull Requests</EmptyTitle>
        <EmptyDescription>
          Erstelle ein Pull Request, um zu beginnen.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
