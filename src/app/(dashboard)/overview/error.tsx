"use client";

import { OverviewError } from "@/modules/overview/ui/views/overview";

interface OverviewErrorPageProps {
  reset: () => void;
}

const OverviewErrorPage = ({ reset }: OverviewErrorPageProps) => {
  return <OverviewError reset={reset} />;
};

export default OverviewErrorPage;
