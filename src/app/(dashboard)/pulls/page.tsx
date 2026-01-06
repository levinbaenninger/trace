import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { PullRequests } from "@/modules/pull-requests/ui/views/pull-requests";
import { api } from "../../../../convex/_generated/api";

const PullRequestsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const preloadedPullRequests = await preloadQuery(
    api.pullRequests.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <div className="container mx-auto p-4">
      <PullRequests preloadedPullRequests={preloadedPullRequests} />
    </div>
  );
};

export default PullRequestsPage;
