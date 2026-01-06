"use client";

import { ErrorState } from "@/components/error-state";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const PullRequestDetailError = ({ error, reset }: Props) => {
  return (
    <ErrorState
      message="Fehler beim Laden der Pull Request-Details. Bitte versuche es erneut."
      reset={reset}
      title="Fehler beim Laden der Pull Request-Details"
    />
  );
};

export default PullRequestDetailError;
