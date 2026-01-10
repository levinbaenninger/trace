import { CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CompletionRateCardProps {
  completionRate: number;
  closed: number;
  open: number;
}

export const CompletionRateCard = ({
  completionRate,
  closed,
  open,
}: CompletionRateCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Fertigstellungsrate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fortschritt</span>
            <span className="font-medium">{completionRate}%</span>
          </div>
          <Progress value={completionRate} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500" />
            <span className="text-sm">Abgeschlossen</span>
          </div>
          <span className="text-sm font-medium">{closed}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="size-4 text-destructive" />
            <span className="text-sm">Offen</span>
          </div>
          <span className="text-sm font-medium">{open}</span>
        </div>
      </CardContent>
    </Card>
  );
};
