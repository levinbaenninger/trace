import { z } from "zod";

export const createTaskSchema = z.object({
  text: z.string().min(1, "Task is required"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
