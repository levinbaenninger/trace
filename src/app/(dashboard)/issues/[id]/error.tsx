"use client";

import { IssueError } from "@/modules/issues/ui/views/issue";

interface IssueErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const IssueErrorPage = ({ error, reset }: IssueErrorPageProps) => {
  return <IssueError error={error} reset={reset} />;
};

export default IssueErrorPage;
