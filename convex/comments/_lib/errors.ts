import type { Id } from "../../_generated/dataModel";
import type { AuthError } from "../../_types/errors/auth";
import type { DomainError } from "../../_types/errors/utils";

type CommentNotFoundError = DomainError & {
  code: "COMMENT_NOT_FOUND";
  commentId: Id<"comments">;
};

type PullRequestNotFoundError = DomainError & {
  code: "PULL_REQUEST_NOT_FOUND";
  pullRequestId: Id<"pullRequests">;
};

type CommentContentEmptyError = DomainError & {
  code: "COMMENT_CONTENT_EMPTY";
};

export type CreateCommentErrors =
  | AuthError
  | PullRequestNotFoundError
  | CommentContentEmptyError;

export type ListCommentsErrors = AuthError | PullRequestNotFoundError;

export type UpdateCommentErrors =
  | AuthError
  | CommentNotFoundError
  | CommentContentEmptyError;

export type DeleteCommentErrors = AuthError | CommentNotFoundError;
