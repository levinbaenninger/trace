"use client";

import { PullRequestError } from "@/modules/pull-requests/ui/views/pull-request";

interface PullRequestErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const PullRequestErrorPage = ({ error, reset }: PullRequestErrorPageProps) => {
  return <PullRequestError error={error} reset={reset} />;
};

export default PullRequestErrorPage;
