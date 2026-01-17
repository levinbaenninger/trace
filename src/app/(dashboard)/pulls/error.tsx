"use client";

import { PullRequestsError } from "@/modules/pull-requests/ui/views/pull-requests";

interface PullRequestsErrorPageProps {
  reset: () => void;
}

const PullRequestsErrorPage = ({ reset }: PullRequestsErrorPageProps) => {
  return <PullRequestsError reset={reset} />;
};

export default PullRequestsErrorPage;
