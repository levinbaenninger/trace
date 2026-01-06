"use client";

import { ErrorState } from "@/components/error-state";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const IssueDetailError = ({ error, reset }: Props) => {
  return (
    <ErrorState
      message="Fehler beim Laden der Issue-Details. Bitte versuche es erneut."
      reset={reset}
      title="Fehler beim Laden der Issue-Details"
    />
  );
};

export default IssueDetailError;
