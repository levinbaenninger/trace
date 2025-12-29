import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { ToggleTaskErrors } from "./_lib/errors";

export default mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const task = await ctx.db.get(args.id);

    if (!task) {
      throw new ConvexError<ToggleTaskErrors>({
        code: "TASK_NOT_FOUND",
        taskId: args.id,
      });
    }

    if (task.userId !== identity.subject) {
      throw new ConvexError<ToggleTaskErrors>({
        code: "TASK_NOT_OWNER",
        taskId: args.id,
      });
    }

    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
  },
});
