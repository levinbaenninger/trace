import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { PullRequestDetail } from "@/modules/pull-requests/ui/views/pull-request";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  params: Promise<{ id: Id<"pullRequests"> }>;
}

const PullRequestDetailPage = async ({ params }: Props) => {
  const { isAuthenticated } = await auth();
  const { id } = await params;

  if (!isAuthenticated) {
    return null;
  }

  const preloadedPullRequest = await preloadQuery(
    api.pullRequests.get.default,
    { id },
    { token: await getToken() }
  );

  return (
    <div className="container mx-auto p-4">
      <PullRequestDetail preloadedPullRequest={preloadedPullRequest} />
    </div>
  );
};

export default PullRequestDetailPage;
