"use client";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title?: string;
  message?: string;
  reset?: () => void;
}

export const ErrorState = ({
  title = "Etwas ist schiefgelaufen",
  message = "Bitte versuche es erneut.",
  reset,
}: Props) => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{message}</span>
              {reset && (
                <Button onClick={reset} size="sm" variant="outline">
                  Erneut versuchen
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
