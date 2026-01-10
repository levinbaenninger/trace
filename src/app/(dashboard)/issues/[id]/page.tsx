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

  const token = await getToken();

  const [preloadedIssue, preloadedUsers] = await Promise.all([
    preloadQuery(api.issues.get.default, { id }, { token }),
    preloadQuery(api.users.list.default, {}, { token }),
  ]);

  return (
    <Issue preloadedIssue={preloadedIssue} preloadedUsers={preloadedUsers} />
  );
};

export default IssuePage;
