import { CompletionRateCard } from "./completion-rate-card";
import { MergeRateCard } from "./merge-rate-card";

interface ProgressSectionProps {
  issuesTotal: number;
  issuesClosed: number;
  issuesOpen: number;
  pullRequestsTotal: number;
  pullRequestsMerged: number;
  pullRequestsOpen: number;
}

export const ProgressSection = ({
  issuesTotal,
  issuesClosed,
  issuesOpen,
  pullRequestsTotal,
  pullRequestsMerged,
  pullRequestsOpen,
}: ProgressSectionProps) => {
  const issueCompletionRate =
    issuesTotal > 0 ? Math.round((issuesClosed / issuesTotal) * 100) : 0;

  const prMergeRate =
    pullRequestsTotal > 0
      ? Math.round((pullRequestsMerged / pullRequestsTotal) * 100)
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CompletionRateCard
        closed={issuesClosed}
        completionRate={issueCompletionRate}
        open={issuesOpen}
      />
      <MergeRateCard
        merged={pullRequestsMerged}
        mergeRate={prMergeRate}
        open={pullRequestsOpen}
      />
    </div>
  );
};
