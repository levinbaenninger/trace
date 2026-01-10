import type { AuthError } from "../../_types/errors/auth";
import type { DomainError } from "../../_types/errors/utils";

type IssueNotFoundError = DomainError & {
  code: "ISSUE_NOT_FOUND";
  issueId: string;
};

export type ListIssuesErrors = AuthError;
export type GetIssueErrors = AuthError | IssueNotFoundError;
export type CreateIssueErrors = AuthError;
export type UpdateIssueErrors = AuthError | IssueNotFoundError;
export type RemoveIssueErrors = AuthError | IssueNotFoundError;
