"use client";

import { IssuesError } from "@/modules/issues/ui/views/issues";

interface IssuesErrorPageProps {
  reset: () => void;
}

const IssuesErrorPage = ({ reset }: IssuesErrorPageProps) => {
  return <IssuesError reset={reset} />;
};

export default IssuesErrorPage;
