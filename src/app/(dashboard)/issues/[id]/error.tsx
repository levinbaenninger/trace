"use client";

import { IssueError } from "@/modules/issues/ui/views/issue";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const IssueErrorPage = ({ error, reset }: Props) => {
  return <IssueError error={error} reset={reset} />;
};

export default IssueErrorPage;
