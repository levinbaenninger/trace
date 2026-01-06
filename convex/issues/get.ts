import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { GetIssueErrors } from "./_lib/errors";

export default query({
  args: { id: v.id("issues") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const issue = await ctx.db.get(args.id);

    if (!issue) {
      throw new ConvexError<GetIssueErrors>({
        code: "ISSUE_NOT_FOUND",
        issueId: args.id,
      });
    }

    return issue;
  },
});
