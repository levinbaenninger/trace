import type {
  CreateTaskErrors,
  RemoveTaskErrors,
  ToggleTaskErrors,
} from "../../../../convex/tasks/_lib/errors";

export const getCreateTaskErrorMessage = (error: CreateTaskErrors): string => {
  switch (error.code) {
    case "TASK_LIMIT_EXCEEDED":
      return `You've reached the maximum number of tasks`;
    case "UNAUTHENTICATED":
      return "You must be signed in to create a task";
    case "UNAUTHORIZED":
      return "You don't have permission to create a task";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const getToggleTaskErrorMessage = (error: ToggleTaskErrors): string => {
  switch (error.code) {
    case "TASK_NOT_FOUND":
      return "Task not found";
    case "TASK_NOT_OWNER":
      return "You don't own this task";
    case "UNAUTHENTICATED":
      return "You must be signed in to toggle a task";
    case "UNAUTHORIZED":
      return "You don't have permission to toggle a task";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const getRemoveTaskErrorMessage = (error: RemoveTaskErrors): string => {
  switch (error.code) {
    case "TASK_NOT_FOUND":
      return "Task not found";
    case "TASK_NOT_OWNER":
      return "You don't own this task";
    case "UNAUTHENTICATED":
      return "You must be signed in to remove a task";
    case "UNAUTHORIZED":
      return "You don't have permission to remove a task";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
