"use client";

import { ErrorPage } from "@/components/error-page";

interface GlobalProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalProps) => {
  return (
    <html lang="de-CH">
      <body className="dark antialiased">
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
};

export default GlobalError;
