"use client";

import { PullRequestError } from "@/modules/pull-requests/ui/views/pull-request";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const PullRequestErrorPage = ({ error, reset }: Props) => {
  return <PullRequestError error={error} reset={reset} />;
};

export default PullRequestErrorPage;
