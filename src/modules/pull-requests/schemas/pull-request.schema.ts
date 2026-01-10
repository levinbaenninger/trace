import { z } from "zod";

export const createPullRequestSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  issueIds: z.array(z.string()).min(1, "Mindestens ein Issue ist erforderlich"),
  labels: z.array(z.string()),
  assignees: z.array(z.string()),
  reviewers: z.array(z.string()),
});

export const updatePullRequestSchema = createPullRequestSchema;

export type CreatePullRequest = z.infer<typeof createPullRequestSchema>;
export type UpdatePullRequest = z.infer<typeof updatePullRequestSchema>;
