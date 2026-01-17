import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { GetPullRequestErrors } from "./_lib/errors";

export default query({
  args: { id: v.id("pullRequests") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const pullRequest = await ctx.db.get(args.id);

    if (!pullRequest) {
      throw new ConvexError<GetPullRequestErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.id,
      });
    }

    // Fetch connected issues
    const issues = await Promise.all(
      pullRequest.issueIds.map((issueId) => ctx.db.get(issueId))
    );

    return {
      ...pullRequest,
      issues: issues.filter((issue) => issue !== null),
    };
  },
});
