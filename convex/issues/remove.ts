import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { RemoveIssueErrors } from "./_lib/errors";

export default mutation({
  args: { id: v.id("issues") },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const issue = await ctx.db.get(args.id);

    if (!issue) {
      throw new ConvexError<RemoveIssueErrors>({
        code: "ISSUE_NOT_FOUND",
        issueId: args.id,
      });
    }

    if (issue.authorId !== identity.subject) {
      throw new ConvexError<RemoveIssueErrors>({
        code: "UNAUTHORIZED",
      });
    }

    await ctx.db.delete(args.id);
  },
});
