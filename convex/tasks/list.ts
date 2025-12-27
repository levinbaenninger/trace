import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});
