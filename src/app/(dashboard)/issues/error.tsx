"use client";

import { IssuesError } from "@/modules/issues/ui/views/issues";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const IssuesErrorPage = ({ error, reset }: Props) => {
  return <IssuesError error={error} reset={reset} />;
};

export default IssuesErrorPage;
