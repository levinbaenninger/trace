import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import type { CreateUserErrors } from "./_lib/errors";

export default mutation({
  args: {
    clerkId: v.string(),
    firstName: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) {
      throw new ConvexError<CreateUserErrors>({
        code: "USER_ALREADY_EXISTS",
        clerkId: args.clerkId,
      });
    }

    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      firstName: args.firstName,
      imageUrl: args.imageUrl,
    });
  },
});
