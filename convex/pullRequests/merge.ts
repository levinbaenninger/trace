import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { MergePullRequestErrors } from "./_lib/errors";

export default mutation({
  args: { id: v.id("pullRequests") },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const pullRequest = await ctx.db.get(args.id);

    if (!pullRequest) {
      throw new ConvexError<MergePullRequestErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.id,
      });
    }

    if (pullRequest.merged) {
      throw new ConvexError<MergePullRequestErrors>({
        code: "PULL_REQUEST_ALREADY_MERGED",
        pullRequestId: args.id,
      });
    }

    // 1. Mark PR as merged
    await ctx.db.patch(args.id, { merged: true });

    // 2. Create commit
    await ctx.db.insert("commits", {
      pullRequestId: args.id,
      message: pullRequest.title,
      authorId: identity.subject,
    });

    // 3. Close all connected issues
    for (const issueId of pullRequest.issueIds) {
      const issue = await ctx.db.get(issueId);
      if (issue) {
        await ctx.db.patch(issueId, { status: "closed" });
      }
    }
  },
});
