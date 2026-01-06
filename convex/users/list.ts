import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  handler: async (ctx) => {
    await requireAuth(ctx);

    // Get all unique user IDs from issues, PRs, and commits
    const [issues, pullRequests, commits] = await Promise.all([
      ctx.db.query("issues").collect(),
      ctx.db.query("pullRequests").collect(),
      ctx.db.query("commits").collect(),
    ]);

    const userDetailsMap = new Map<
      string,
      { id: string; name: string; email?: string; imageUrl?: string }
    >();

    // Helper to get user details from Clerk
    const getUserDetails = async (userId: string) => {
      if (userDetailsMap.has(userId)) {
        return userDetailsMap.get(userId)!;
      }

      // Try to get user identity from Clerk
      // Note: In Convex, we can only get the current user's identity
      // For other users, we'll store a simplified version
      const currentUser = await ctx.auth.getUserIdentity();

      if (currentUser && currentUser.subject === userId) {
        const details = {
          id: userId,
          name: currentUser.name || currentUser.email || userId,
          email: currentUser.email,
          imageUrl: currentUser.pictureUrl,
        };
        userDetailsMap.set(userId, details);
        return details;
      }

      // For other users, we'll use a simplified format
      // In a real app, you'd store user profiles in a separate table
      const details = {
        id: userId,
        name: userId.split("|")[1] || userId, // Extract username from Clerk ID
        email: undefined,
        imageUrl: undefined,
      };
      userDetailsMap.set(userId, details);
      return details;
    };

    // Collect all user IDs
    const userIds = new Set<string>();
    for (const issue of issues) {
      userIds.add(issue.authorId);
      issue.assignees.forEach((id) => userIds.add(id));
    }

    for (const pr of pullRequests) {
      userIds.add(pr.authorId);
      pr.assignees.forEach((id) => userIds.add(id));
      pr.reviewers.forEach((id) => userIds.add(id));
    }

    for (const commit of commits) {
      userIds.add(commit.authorId);
    }

    // Fetch user details
    const users = await Promise.all(
      Array.from(userIds).map((userId) => getUserDetails(userId))
    );

    return users.sort((a, b) => a.name.localeCompare(b.name));
  },
});
