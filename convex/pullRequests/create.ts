import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default mutation({
  args: {
    title: v.string(),
    description: v.string(),
    issueIds: v.array(v.id("issues")),
    assignees: v.array(v.string()),
    reviewers: v.array(v.string()),
    labels: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    return await ctx.db.insert("pullRequests", {
      title: args.title,
      description: args.description,
      issueIds: args.issueIds,
      assignees: args.assignees,
      reviewers: args.reviewers,
      labels: args.labels,
      merged: false,
      authorId: identity.subject,
    });
  },
});
