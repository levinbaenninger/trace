import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  issues: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("open"), v.literal("closed")),
    assignees: v.array(v.string()),
    labels: v.array(v.string()),
    authorId: v.string(),
  }),

  pullRequests: defineTable({
    title: v.string(),
    description: v.string(),
    issueIds: v.array(v.id("issues")),
    assignees: v.array(v.string()),
    reviewers: v.array(v.string()),
    labels: v.array(v.string()),
    merged: v.boolean(),
    authorId: v.string(),
  }),

  commits: defineTable({
    pullRequestId: v.id("pullRequests"),
    message: v.string(),
    authorId: v.string(),
  }).index("by_pull_request", ["pullRequestId"]),
});
