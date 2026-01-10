import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { PullRequest } from "@/modules/pull-requests/ui/views/pull-request";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

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

  const [preloadedPullRequest, preloadedUsers] = await Promise.all([
    preloadQuery(api.pullRequests.get.default, { id }, { token }),
    preloadQuery(api.users.list.default, {}, { token }),
  ]);

  return (
    <PullRequest
      preloadedPullRequest={preloadedPullRequest}
      preloadedUsers={preloadedUsers}
    />
  );
};

export default PullRequestPage;
