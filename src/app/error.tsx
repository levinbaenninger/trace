"use client";

import { ErrorPage } from "@/components/error-page";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const DefaultErrorPage = ({ error, reset }: Props) => {
  return <ErrorPage error={error} reset={reset} />;
};

export default DefaultErrorPage;
