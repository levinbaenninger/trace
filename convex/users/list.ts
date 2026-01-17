import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  handler: async (ctx) => {
    await requireAuth(ctx);

    const users = await ctx.db.query("users").collect();
    return users.sort((a, b) => a.firstName.localeCompare(b.firstName));
  },
});
