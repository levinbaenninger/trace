import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  handler: async (ctx) => {
    await requireAuth(ctx);

    return await ctx.db.query("issues").order("desc").collect();
  },
});
