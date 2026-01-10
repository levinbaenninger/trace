"use client";

import { PullRequestsError } from "@/modules/pull-requests/ui/views/pull-requests";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const PullRequestsErrorPage = ({ error, reset }: Props) => {
  return <PullRequestsError error={error} reset={reset} />;
};

export default PullRequestsErrorPage;
