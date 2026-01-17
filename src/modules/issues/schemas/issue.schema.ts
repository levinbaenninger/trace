import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  labels: z.array(z.string()),
  assignees: z.array(z.string()),
});

export const updateIssueSchema = createIssueSchema;

export type CreateIssue = z.infer<typeof createIssueSchema>;
export type UpdateIssue = z.infer<typeof updateIssueSchema>;
