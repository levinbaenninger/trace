import type {
  CreateTaskErrors,
  RemoveTaskErrors,
  ToggleTaskErrors,
} from "../../../convex/tasks/_lib/errors";

export const getCreateTaskErrorMessage = (error: CreateTaskErrors): string => {
  switch (error.code) {
    case "TASK_LIMIT_EXCEEDED":
      return "Du hast die maximale Anzahl an Aufgaben erreicht";
    case "UNAUTHENTICATED":
      return "Du musst angemeldet sein, um eine Aufgabe zu erstellen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, eine Aufgabe zu erstellen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getToggleTaskErrorMessage = (error: ToggleTaskErrors): string => {
  switch (error.code) {
    case "TASK_NOT_FOUND":
      return "Aufgabe nicht gefunden";
    case "TASK_NOT_OWNER":
      return "Du bist nicht der Besitzer dieser Aufgabe";
    case "UNAUTHENTICATED":
      return "Du musst angemeldet sein, um eine Aufgabe zu aktivieren";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, eine Aufgabe zu aktivieren";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getRemoveTaskErrorMessage = (error: RemoveTaskErrors): string => {
  switch (error.code) {
    case "TASK_NOT_FOUND":
      return "Aufgabe nicht gefunden";
    case "TASK_NOT_OWNER":
      return "Du bist nicht der Besitzer dieser Aufgabe";
    case "UNAUTHENTICATED":
      return "Du musst angemeldet sein, um eine Aufgabe zu löschen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, eine Aufgabe zu löschen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};
