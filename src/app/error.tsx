"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ups! Etwas ist schiefgelaufen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut
            oder kontaktiere den Support, wenn das Problem weiterhin besteht.
          </p>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-1 font-medium text-sm [&[data-panel-open]>svg]:rotate-180">
              <ChevronDownIcon className="size-4 transition-transform duration-200" />
              Fehlerdetails
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted p-2 text-xs">
                {error.message}
                {error.digest && `\nError ID: ${error.digest}`}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={reset} variant="default">
            Erneut versuchen
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
