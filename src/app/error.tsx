"use client";

import { ErrorPage } from "@/components/error-page";

interface DefaultErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const DefaultErrorPage = ({ error, reset }: DefaultErrorPageProps) => {
  return <ErrorPage error={error} reset={reset} />;
};

export default DefaultErrorPage;
