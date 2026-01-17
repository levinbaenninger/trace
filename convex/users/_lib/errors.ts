import type { DomainError } from "../../_types/errors/utils";

type UserNotFoundError = DomainError & {
  code: "USER_NOT_FOUND";
  clerkId: string;
};

type UserAlreadyExistsError = DomainError & {
  code: "USER_ALREADY_EXISTS";
  clerkId: string;
};

export type RemoveUserErrors = UserNotFoundError;
export type CreateUserErrors = UserAlreadyExistsError;
export type UpdateUserErrors = UserNotFoundError;
