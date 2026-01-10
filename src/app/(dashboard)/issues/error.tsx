"use client";

import { IssuesError } from "@/modules/issues/ui/views/issues";

interface IssuesErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const IssuesErrorPage = ({ error, reset }: IssuesErrorPageProps) => {
  return <IssuesError error={error} reset={reset} />;
};

export default IssuesErrorPage;
