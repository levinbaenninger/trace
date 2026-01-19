import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { ListCommentsErrors } from "./_lib/errors";

export default query({
  args: {
    pullRequestId: v.id("pullRequests"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const pullRequest = await ctx.db.get(args.pullRequestId);
    if (!pullRequest) {
      throw new ConvexError<ListCommentsErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.pullRequestId,
      });
    }

    const comments = await ctx.db
      .query("comments")
      .withIndex("by_pull_request", (q) =>
        q.eq("pullRequestId", args.pullRequestId)
      )
      .collect();

    return comments.sort((a, b) => a._creationTime - b._creationTime);
  },
});
