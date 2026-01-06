import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";

import { getToken } from "@/lib/auth";
import { Issues, IssuesError } from "@/modules/issues/ui/views/issues";
import { api } from "../../../../convex/_generated/api";

const IssuesPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const preloadedIssues = await preloadQuery(
    api.issues.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <div className="container mx-auto p-4">
      <ErrorBoundary fallback={<IssuesError />}>
        <Issues preloadedIssues={preloadedIssues} />
      </ErrorBoundary>
    </div>
  );
};

export default IssuesPage;
