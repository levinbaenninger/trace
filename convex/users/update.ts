import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import type { UpdateUserErrors } from "./_lib/errors";

export default mutation({
  args: {
    clerkId: v.string(),
    firstName: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new ConvexError<UpdateUserErrors>({
        code: "USER_NOT_FOUND",
        clerkId: args.clerkId,
      });
    }

    await ctx.db.patch(user._id, {
      firstName: args.firstName,
      imageUrl: args.imageUrl,
    });
  },
});
