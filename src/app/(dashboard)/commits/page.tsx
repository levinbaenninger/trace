import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { Commits } from "@/modules/commits/ui/views/commits";
import { api } from "../../../../convex/_generated/api";

const CommitsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedCommits = await preloadQuery(
    api.commits.list.default,
    {},
    { token: await getToken() }
  );

  return <Commits preloadedCommits={preloadedCommits} />;
};

export default CommitsPage;
