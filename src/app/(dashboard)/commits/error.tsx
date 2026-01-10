"use client";

import { CommitsError } from "@/modules/commits/ui/views/commits";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const CommitsErrorPage = ({ error, reset }: Props) => {
  return <CommitsError error={error} reset={reset} />;
};

export default CommitsErrorPage;
