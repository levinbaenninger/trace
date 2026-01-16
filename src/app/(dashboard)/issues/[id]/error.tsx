"use client";

import { IssueError } from "@/modules/issues/ui/views/issue";

interface IssueErrorPageProps {
  reset: () => void;
}

const IssueErrorPage = ({ reset }: IssueErrorPageProps) => {
  return <IssueError reset={reset} />;
};

export default IssueErrorPage;
