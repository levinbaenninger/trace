import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/components/user-display";

interface Contributor {
  authorId: string;
  count: number;
}

interface TopContributorsCardProps {
  contributors: Contributor[];
}

export const TopContributorsCard = ({
  contributors,
}: TopContributorsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Mitwirkende</CardTitle>
        <CardAction>
          <Users className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {contributors.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Noch keine Mitwirkende
          </p>
        ) : (
          <div className="space-y-4">
            {contributors.map((contributor, index) => (
              <div
                className="flex items-center justify-between"
                key={contributor.authorId}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    #{index + 1}
                  </div>
                  <User userId={contributor.authorId} />
                </div>
                <Badge variant="secondary">
                  {contributor.count} Mitwirkungen
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
