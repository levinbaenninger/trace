"use client";

import { CommitsError } from "@/modules/commits/ui/views/commits";

interface CommitsErrorPageProps {
  reset: () => void;
}

const CommitsErrorPage = ({ reset }: CommitsErrorPageProps) => {
  return <CommitsError reset={reset} />;
};

export default CommitsErrorPage;
