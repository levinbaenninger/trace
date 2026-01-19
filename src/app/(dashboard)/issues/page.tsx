import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { Issues } from "@/modules/issues/ui/views/issues";
import { api } from "../../../../convex/_generated/api";

const IssuesPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const token = await getToken();

  const [preloadedIssues, preloadedUsers, preloadedCurrentUserId] =
    await Promise.all([
      preloadQuery(api.issues.list.default, {}, { token }),
      preloadQuery(api.users.list.default, {}, { token }),
      preloadQuery(api.users.getCurrentUserId.default, {}, { token }),
    ]);

  return (
    <Issues
      preloadedCurrentUserId={preloadedCurrentUserId}
      preloadedIssues={preloadedIssues}
      preloadedUsers={preloadedUsers}
    />
  );
};

export default IssuesPage;
