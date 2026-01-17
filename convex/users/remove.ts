import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import type { RemoveUserErrors } from "./_lib/errors";

export default mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new ConvexError<RemoveUserErrors>({
        code: "USER_NOT_FOUND",
        clerkId: args.clerkId,
      });
    }

    await ctx.db.delete(user._id);
  },
});
