import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default mutation({
  args: {
    title: v.string(),
    description: v.string(),
    labels: v.array(v.string()),
    assignees: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    return await ctx.db.insert("issues", {
      title: args.title,
      description: args.description,
      labels: args.labels,
      assignees: args.assignees,
      status: "open",
      authorId: identity.subject,
    });
  },
});
