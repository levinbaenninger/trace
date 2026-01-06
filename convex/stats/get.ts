import { query } from "../_generated/server";
import { requireAuth } from "../_utils/auth";

export default query({
  handler: async (ctx) => {
    await requireAuth(ctx);

    // Fetch all data
    const [issues, pullRequests, commits] = await Promise.all([
      ctx.db.query("issues").collect(),
      ctx.db.query("pullRequests").collect(),
      ctx.db.query("commits").collect(),
    ]);

    // Calculate issue stats
    const openIssues = issues.filter((i) => i.status === "open").length;
    const closedIssues = issues.filter((i) => i.status === "closed").length;

    // Calculate PR stats
    const openPRs = pullRequests.filter((pr) => !pr.merged).length;
    const mergedPRs = pullRequests.filter((pr) => pr.merged).length;

    // Calculate label distribution
    const labelCounts: Record<string, number> = {};
    for (const issue of issues) {
      for (const label of issue.labels) {
        labelCounts[label] = (labelCounts[label] || 0) + 1;
      }
    }

    // Get recent activity (last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentIssues = issues.filter(
      (i) => i._creationTime > sevenDaysAgo
    ).length;
    const recentPRs = pullRequests.filter(
      (pr) => pr._creationTime > sevenDaysAgo
    ).length;
    const recentCommits = commits.filter(
      (c) => c._creationTime > sevenDaysAgo
    ).length;

    // Top contributors (by number of issues created)
    const authorCounts: Record<string, number> = {};
    for (const issue of issues) {
      authorCounts[issue.authorId] = (authorCounts[issue.authorId] || 0) + 1;
    }
    for (const pr of pullRequests) {
      authorCounts[pr.authorId] = (authorCounts[pr.authorId] || 0) + 1;
    }

    const topContributors = Object.entries(authorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([authorId, count]) => ({ authorId, count }));

    return {
      issues: {
        total: issues.length,
        open: openIssues,
        closed: closedIssues,
      },
      pullRequests: {
        total: pullRequests.length,
        open: openPRs,
        merged: mergedPRs,
      },
      commits: {
        total: commits.length,
      },
      labels: labelCounts,
      recentActivity: {
        issues: recentIssues,
        pullRequests: recentPRs,
        commits: recentCommits,
      },
      topContributors,
    };
  },
});
