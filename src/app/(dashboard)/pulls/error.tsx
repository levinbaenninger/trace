"use client";

import { PullRequestsError } from "@/modules/pull-requests/ui/views/pull-requests";

interface PullRequestsErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const PullRequestsErrorPage = ({
  error,
  reset,
}: PullRequestsErrorPageProps) => {
  return <PullRequestsError error={error} reset={reset} />;
};

export default PullRequestsErrorPage;
