import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { DeleteCommentErrors } from "./_lib/errors";

export default mutation({
  args: {
    id: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new ConvexError<DeleteCommentErrors>({
        code: "COMMENT_NOT_FOUND",
        commentId: args.id,
      });
    }

    if (comment.authorId !== identity.subject) {
      throw new ConvexError<DeleteCommentErrors>({
        code: "UNAUTHORIZED",
      });
    }

    await ctx.db.delete(args.id);

    return { success: true };
  },
});
