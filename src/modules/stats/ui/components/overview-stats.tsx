import { CircleDot, GitCommit, GitPullRequest, Users } from "lucide-react";
import { StatCard } from "./stat-card";

interface OverviewStatsProps {
  issuesTotal: number;
  issuesOpen: number;
  issuesClosed: number;
  pullRequestsTotal: number;
  pullRequestsOpen: number;
  pullRequestsMerged: number;
  commitsTotal: number;
  contributorsCount: number;
}

export const OverviewStats = ({
  issuesTotal,
  issuesOpen,
  issuesClosed,
  pullRequestsTotal,
  pullRequestsOpen,
  pullRequestsMerged,
  commitsTotal,
  contributorsCount,
}: OverviewStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        description={`${issuesOpen} offen, ${issuesClosed} abgeschlossen`}
        icon={CircleDot}
        title="Issues"
        value={issuesTotal}
      />
      <StatCard
        description={`${pullRequestsOpen} offen, ${pullRequestsMerged} gemergt`}
        icon={GitPullRequest}
        title="Pull Requests"
        value={pullRequestsTotal}
      />
      <StatCard
        description="Commits"
        icon={GitCommit}
        title="Commits"
        value={commitsTotal}
      />
      <StatCard
        description="Aktive Mitwirkende"
        icon={Users}
        title="Mitwirkende"
        value={contributorsCount}
      />
    </div>
  );
};
