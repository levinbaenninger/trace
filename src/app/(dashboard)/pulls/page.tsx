import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { getToken } from "@/lib/auth";
import { PullRequests } from "@/modules/pull-requests/ui/views/pull-requests";
import { api } from "../../../../convex/_generated/api";

const PullRequestsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const token = await getToken();

  const [preloadedPullRequests, preloadedUsers] = await Promise.all([
    preloadQuery(api.pullRequests.list.default, {}, { token }),
    preloadQuery(api.users.list.default, {}, { token }),
  ]);

  return (
    <PullRequests
      preloadedPullRequests={preloadedPullRequests}
      preloadedUsers={preloadedUsers}
    />
  );
};

export default PullRequestsPage;
