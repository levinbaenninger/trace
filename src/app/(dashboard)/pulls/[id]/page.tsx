import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "@/lib/auth";
import {
  PullRequest,
  PullRequestError,
} from "@/modules/pull-requests/ui/views/pull-request";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  params: Promise<{ id: Id<"pullRequests"> }>;
}

const PullRequestDetailPage = async ({ params }: Props) => {
  const { isAuthenticated } = await auth();
  const { id } = await params;

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedPullRequest = await preloadQuery(
    api.pullRequests.get.default,
    { id },
    { token: await getToken() }
  );

  return (
    <ErrorBoundary fallback={<PullRequestError />}>
      <PullRequest preloadedPullRequest={preloadedPullRequest} />
    </ErrorBoundary>
  );
};

export default PullRequestDetailPage;
