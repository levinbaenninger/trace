import type {
  CreateCommentErrors,
  DeleteCommentErrors,
  ListCommentsErrors,
  UpdateCommentErrors,
} from "../../../convex/comments/_lib/errors";

export const getCreateCommentErrorMessage = (
  error: CreateCommentErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    case "COMMENT_CONTENT_EMPTY":
      return "Kommentar darf nicht leer sein";
    default:
      return "Unbekannter Fehler beim Erstellen des Kommentars";
  }
};

export const getListCommentsErrorMessage = (
  error: ListCommentsErrors
): string => {
  switch (error.code) {
    case "PULL_REQUEST_NOT_FOUND":
      return "Pull Request nicht gefunden";
    default:
      return "Unbekannter Fehler beim Laden der Kommentare";
  }
};

export const getDeleteCommentErrorMessage = (
  error: DeleteCommentErrors
): string => {
  switch (error.code) {
    case "COMMENT_NOT_FOUND":
      return "Kommentar nicht gefunden";
    case "UNAUTHORIZED":
      return "Sie sind nicht berechtigt, diesen Kommentar zu löschen";
    default:
      return "Unbekannter Fehler beim Löschen des Kommentars";
  }
};

export const getUpdateCommentErrorMessage = (
  error: UpdateCommentErrors
): string => {
  switch (error.code) {
    case "COMMENT_NOT_FOUND":
      return "Kommentar nicht gefunden";
    case "UNAUTHORIZED":
      return "Sie sind nicht berechtigt, diesen Kommentar zu bearbeiten";
    case "COMMENT_CONTENT_EMPTY":
      return "Kommentar darf nicht leer sein";
    default:
      return "Unbekannter Fehler beim Aktualisieren des Kommentars";
  }
};
