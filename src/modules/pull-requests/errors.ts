import type {
  CreatePullRequestErrors,
  GetPullRequestErrors,
  MergePullRequestErrors,
  RemovePullRequestErrors,
  UpdatePullRequestErrors,
} from "../../../convex/pullRequests/_lib/errors";

export const getCreatePullRequestErrorMessage = (
  error: CreatePullRequestErrors
): string => {
  switch (error.code) {
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Pull Request zu erstellen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um ein Pull Request zu erstellen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getUpdatePullRequestErrorMessage = (
  error: UpdatePullRequestErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    case "PULL_REQUEST_ALREADY_MERGED":
      return "Cannot update a merged pull request";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Pull Request zu aktualisieren";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Pull Request zu aktualisieren";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getMergePullRequestErrorMessage = (
  error: MergePullRequestErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    case "PULL_REQUEST_ALREADY_MERGED":
      return "Pull Request ist bereits gemerged";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Pull Request zu mergen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Pull Request zu mergen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getRemovePullRequestErrorMessage = (
  error: RemovePullRequestErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    case "PULL_REQUEST_ALREADY_MERGED":
      return "Kann ein gemerged Pull Request nicht löschen";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um ein Pull Request zu löschen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Pull Request zu löschen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};

export const getGetPullRequestErrorMessage = (
  error: GetPullRequestErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    case "UNAUTHENTICATED":
      return "Du musst eingeloggt sein, um dieses Pull Request zu sehen";
    case "UNAUTHORIZED":
      return "Du hast keine Berechtigung, um dieses Pull Request zu sehen";
    default:
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
};
