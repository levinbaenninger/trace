import { GitMerge, GitPullRequest } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MergeRateCardProps {
  mergeRate: number;
  merged: number;
  open: number;
}

export const MergeRateCard = ({
  mergeRate,
  merged,
  open,
}: MergeRateCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pull Request Mergerate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fortschritt</span>
            <span className="font-medium">{mergeRate}%</span>
          </div>
          <Progress value={mergeRate} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Gemergt</span>
          </div>
          <span className="text-sm font-medium">{merged}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Offen</span>
          </div>
          <span className="text-sm font-medium">{open}</span>
        </div>
      </CardContent>
    </Card>
  );
};
