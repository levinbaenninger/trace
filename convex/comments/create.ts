import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { CreateCommentErrors } from "./_lib/errors";

export default mutation({
  args: {
    pullRequestId: v.id("pullRequests"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Validate content is not empty
    if (!args.content.trim()) {
      throw new ConvexError<CreateCommentErrors>({
        code: "COMMENT_CONTENT_EMPTY",
      });
    }

    // Verify pull request exists
    const pullRequest = await ctx.db.get(args.pullRequestId);
    if (!pullRequest) {
      throw new ConvexError<CreateCommentErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.pullRequestId,
      });
    }

    // Create the comment
    const commentId = await ctx.db.insert("comments", {
      pullRequestId: args.pullRequestId,
      content: args.content.trim(),
      authorId: identity.subject,
    });

    return commentId;
  },
});
