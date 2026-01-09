import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "@/lib/auth";
import { Issues, IssuesError } from "@/modules/issues/ui/views/issues";
import { api } from "../../../../convex/_generated/api";

const IssuesPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedIssues = await preloadQuery(
    api.issues.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <ErrorBoundary fallback={<IssuesError />}>
      <Issues preloadedIssues={preloadedIssues} />
    </ErrorBoundary>
  );
};

export default IssuesPage;
