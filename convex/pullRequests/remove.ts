import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { RemovePullRequestErrors } from "./_lib/errors";

export default mutation({
  args: { id: v.id("pullRequests") },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const pullRequest = await ctx.db.get(args.id);

    if (!pullRequest) {
      throw new ConvexError<RemovePullRequestErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.id,
      });
    }

    if (pullRequest.merged) {
      throw new ConvexError<RemovePullRequestErrors>({
        code: "PULL_REQUEST_ALREADY_MERGED",
        pullRequestId: args.id,
      });
    }

    if (pullRequest.authorId !== identity.subject) {
      throw new ConvexError<RemovePullRequestErrors>({
        code: "UNAUTHORIZED",
      });
    }

    await ctx.db.delete(args.id);
  },
});
