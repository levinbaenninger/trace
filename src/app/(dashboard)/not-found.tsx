import { FileQuestion } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const DashboardNotFoundPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seite nicht gefunden</CardTitle>
        <CardDescription>
          Die Ressource, die du suchst, existiert nicht oder wurde verschoben.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion />
            </EmptyMedia>
            <EmptyTitle>Nicht gefunden</EmptyTitle>
            <EmptyDescription>
              Diese Seite konnte leider nicht gefunden werden.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild size="sm" variant="outline">
              <Link href="/">Zur Startseite</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
};

export default DashboardNotFoundPage;
