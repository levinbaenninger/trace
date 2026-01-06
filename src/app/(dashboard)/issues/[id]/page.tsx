import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { Issue } from "@/modules/issues/ui/views/issue";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  params: Promise<{ id: Id<"issues"> }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { isAuthenticated } = await auth();
  const { id } = await params;

  if (!isAuthenticated) {
    return null;
  }

  const preloadedIssue = await preloadQuery(
    api.issues.get.default,
    { id },
    { token: await getToken() }
  );

  return (
    <div className="container mx-auto p-4">
      <Issue preloadedIssue={preloadedIssue} />
    </div>
  );
};

export default IssueDetailPage;
