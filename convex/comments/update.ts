import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { UpdateCommentErrors } from "./_lib/errors";

export default mutation({
  args: {
    id: v.id("comments"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    if (!args.content.trim()) {
      throw new ConvexError<UpdateCommentErrors>({
        code: "COMMENT_CONTENT_EMPTY",
      });
    }

    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new ConvexError<UpdateCommentErrors>({
        code: "COMMENT_NOT_FOUND",
        commentId: args.id,
      });
    }

    if (comment.authorId !== identity.subject) {
      throw new ConvexError<UpdateCommentErrors>({
        code: "UNAUTHORIZED",
      });
    }

    await ctx.db.patch(args.id, {
      content: args.content.trim(),
    });

    return { success: true };
  },
});
