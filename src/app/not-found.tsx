import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Seite nicht gefunden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="default">
            <Link href="/">Zur Startseite</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
