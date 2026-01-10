import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { Issue } from "@/modules/issues/ui/views/issue";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface IssuePageProps {
  params: Promise<{ id: Id<"issues"> }>;
}

const IssuePage = async ({ params }: IssuePageProps) => {
  const { isAuthenticated } = await auth();
  const { id } = await params;

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedIssue = await preloadQuery(
    api.issues.get.default,
    { id },
    { token: await getToken() }
  );

  return <Issue preloadedIssue={preloadedIssue} />;
};

export default IssuePage;
