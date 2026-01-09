import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";

import { getToken } from "@/lib/auth";
import { Commits, CommitsError } from "@/modules/commits/ui/views/commits";
import { api } from "../../../../convex/_generated/api";

const CommitsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const preloadedCommits = await preloadQuery(
    api.commits.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <ErrorBoundary fallback={<CommitsError />}>
      <Commits preloadedCommits={preloadedCommits} />
    </ErrorBoundary>
  );
};

export default CommitsPage;
