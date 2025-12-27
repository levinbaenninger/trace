import type { AuthError } from "../../_types/errors/auth";
import type { DomainError } from "../../_types/errors/utils";

type TaskNotFoundError = DomainError & {
  code: "TASK_NOT_FOUND";
  taskId: string;
};

type TaskLimitExceededError = DomainError & {
  code: "TASK_LIMIT_EXCEEDED";
  limit: number;
};

type TaskNotOwnerError = DomainError & {
  code: "TASK_NOT_OWNER";
  taskId: string;
};

export type ListTasksErrors = AuthError;
export type CreateTaskErrors = AuthError | TaskLimitExceededError;
export type ToggleTaskErrors =
  | AuthError
  | TaskNotFoundError
  | TaskNotOwnerError;
export type RemoveTaskErrors =
  | AuthError
  | TaskNotFoundError
  | TaskNotOwnerError;
