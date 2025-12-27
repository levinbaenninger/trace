import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TasksViewError = () => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading tasks</AlertTitle>
          <AlertDescription>
            Failed to load your tasks. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
