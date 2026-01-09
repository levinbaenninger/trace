"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de-CH">
      <body className="dark antialiased">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Ups! Etwas ist schiefgelaufen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es
                erneut oder kontaktiere den Support, wenn das Problem weiterhin
                besteht.
              </p>

              <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted p-2 text-xs">
                {error.message}
                {error.digest && `\nError ID: ${error.digest}`}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </CardContent>
            <CardFooter className="gap-2">
              <Button onClick={reset} size="sm" variant="default">
                Erneut versuchen
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
