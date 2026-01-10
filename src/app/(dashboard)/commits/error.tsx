"use client";

import { CommitsError } from "@/modules/commits/ui/views/commits";

interface CommitsErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const CommitsErrorPage = ({ error, reset }: CommitsErrorPageProps) => {
  return <CommitsError error={error} reset={reset} />;
};

export default CommitsErrorPage;
