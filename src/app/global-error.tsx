"use client";

import { ErrorPage } from "@/components/error-page";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalErrorPage = ({ error, reset }: GlobalErrorPageProps) => {
  return (
    <html lang="de-CH">
      <body className="dark antialiased">
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
};

export default GlobalErrorPage;
