import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "@/lib/auth";
import {
  PullRequests,
  PullRequestsError,
} from "@/modules/pull-requests/ui/views/pull-requests";
import { api } from "../../../../convex/_generated/api";

const PullRequestsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedPullRequests = await preloadQuery(
    api.pullRequests.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <ErrorBoundary fallback={<PullRequestsError />}>
      <PullRequests preloadedPullRequests={preloadedPullRequests} />
    </ErrorBoundary>
  );
};

export default PullRequestsPage;
