import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireAuth } from "../_utils/auth";
import type { UpdatePullRequestErrors } from "./_lib/errors";

export default mutation({
  args: {
    id: v.id("pullRequests"),
    title: v.string(),
    description: v.string(),
    issueIds: v.array(v.id("issues")),
    assignees: v.array(v.string()),
    reviewers: v.array(v.string()),
    labels: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const pullRequest = await ctx.db.get(args.id);

    if (!pullRequest) {
      throw new ConvexError<UpdatePullRequestErrors>({
        code: "PULL_REQUEST_NOT_FOUND",
        pullRequestId: args.id,
      });
    }

    if (pullRequest.merged) {
      throw new ConvexError<UpdatePullRequestErrors>({
        code: "PULL_REQUEST_ALREADY_MERGED",
        pullRequestId: args.id,
      });
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      issueIds: args.issueIds,
      assignees: args.assignees,
      reviewers: args.reviewers,
      labels: args.labels,
    });
  },
});
