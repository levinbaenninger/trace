import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { UpdateIssueErrors } from "./_lib/errors";

export default mutation({
  args: {
    id: v.id("issues"),
    title: v.string(),
    description: v.string(),
    labels: v.array(v.string()),
    assignees: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const issue = await ctx.db.get(args.id);

    if (!issue) {
      throw new ConvexError<UpdateIssueErrors>({
        code: "ISSUE_NOT_FOUND",
        issueId: args.id,
      });
    }

    if (issue.authorId !== identity.subject) {
      throw new ConvexError<UpdateIssueErrors>({
        code: "UNAUTHORIZED",
      });
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      labels: args.labels,
      assignees: args.assignees,
    });
  },
});
