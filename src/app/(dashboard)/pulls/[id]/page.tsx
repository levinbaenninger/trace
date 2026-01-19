import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { getToken } from "@/lib/auth";
import { PullRequest } from "@/modules/pull-requests/ui/views/pull-request";

interface PullRequestPageProps {
  params: Promise<{ id: Id<"pullRequests"> }>;
}

const PullRequestPage = async ({ params }: PullRequestPageProps) => {
  const { isAuthenticated } = await auth();
  const { id } = await params;

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const token = await getToken();

  const [
    preloadedPullRequest,
    preloadedUsers,
    preloadedComments,
    preloadedCurrentUserId,
  ] = await Promise.all([
    preloadQuery(api.pullRequests.get.default, { id }, { token }),
    preloadQuery(api.users.list.default, {}, { token }),
    preloadQuery(api.comments.list.default, { pullRequestId: id }, { token }),
    preloadQuery(api.users.getCurrentUserId.default, {}, { token }),
  ]);

  return (
    <PullRequest
      preloadedComments={preloadedComments}
      preloadedCurrentUserId={preloadedCurrentUserId}
      preloadedPullRequest={preloadedPullRequest}
      preloadedUsers={preloadedUsers}
    />
  );
};

export default PullRequestPage;
