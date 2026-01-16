"use client";

import { PullRequestError } from "@/modules/pull-requests/ui/views/pull-request";

interface PullRequestErrorPageProps {
  reset: () => void;
}

const PullRequestErrorPage = ({ reset }: PullRequestErrorPageProps) => {
  return <PullRequestError reset={reset} />;
};

export default PullRequestErrorPage;
