import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);
    return identity.subject;
  },
});
