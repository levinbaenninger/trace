"use client";

import { OverviewError } from "@/modules/overview/ui/views/overview";

interface OverviewErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const OverviewErrorPage = ({ error, reset }: OverviewErrorPageProps) => {
  return <OverviewError error={error} reset={reset} />;
};

export default OverviewErrorPage;
