"use client";

import { OverviewError } from "@/modules/overview/ui/views/overview";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const OverviewErrorPage = ({ error, reset }: Props) => {
  return <OverviewError error={error} reset={reset} />;
};

export default OverviewErrorPage;
