import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import { TASK_LIMIT } from "./_lib/constants";
import type { CreateTaskErrors } from "./_lib/errors";

export default mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    if (tasks.length >= TASK_LIMIT) {
      throw new ConvexError<CreateTaskErrors>({
        code: "TASK_LIMIT_EXCEEDED",
        limit: TASK_LIMIT,
      });
    }

    return await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
      userId: identity.subject,
    });
  },
});
