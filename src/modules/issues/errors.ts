import type {
  CreateIssueErrors,
  GetIssueErrors,
  RemoveIssueErrors,
  UpdateIssueErrors,
} from "@convex/issues/_lib/errors";

export const getCreateIssueErrorMessage = (
  error: CreateIssueErrors
): string => {
  switch (error.code) {
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Issue zu erstellen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um ein Issue zu erstellen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getUpdateIssueErrorMessage = (
  error: UpdateIssueErrors
): string => {
  switch (error.code) {
    case "ISSUE_NOT_FOUND":
      return "Issue nicht gefunden";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Issue zu aktualisieren";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Issue zu aktualisieren";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getRemoveIssueErrorMessage = (
  error: RemoveIssueErrors
): string => {
  switch (error.code) {
    case "ISSUE_NOT_FOUND":
      return "Issue nicht gefunden";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Issue zu löschen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Issue zu löschen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getGetIssueErrorMessage = (error: GetIssueErrors): string => {
  switch (error.code) {
    case "ISSUE_NOT_FOUND":
      return "Issue nicht gefunden";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um dieses Issue zu sehen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Issue zu sehen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};
