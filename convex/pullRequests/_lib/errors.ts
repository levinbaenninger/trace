import type { AuthError } from "../../_types/errors/auth";
import type { DomainError } from "../../_types/errors/utils";

type PullRequestNotFoundError = DomainError & {
  code: "PULL_REQUEST_NOT_FOUND";
  pullRequestId: string;
};

type PullRequestAlreadyMergedError = DomainError & {
  code: "PULL_REQUEST_ALREADY_MERGED";
  pullRequestId: string;
};

export type ListPullRequestsErrors = AuthError;
export type GetPullRequestErrors = AuthError | PullRequestNotFoundError;
export type CreatePullRequestErrors = AuthError;
export type UpdatePullRequestErrors =
  | AuthError
  | PullRequestNotFoundError
  | PullRequestAlreadyMergedError;
export type MergePullRequestErrors =
  | AuthError
  | PullRequestNotFoundError
  | PullRequestAlreadyMergedError;
export type RemovePullRequestErrors =
  | AuthError
  | PullRequestNotFoundError
  | PullRequestAlreadyMergedError;
