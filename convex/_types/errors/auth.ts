import type { DomainError } from "./utils";

type UnauthenticatedError = DomainError & { code: "UNAUTHENTICATED" };
type UnauthorizedError = DomainError & { code: "UNAUTHORIZED" };

export type AuthError = UnauthenticatedError | UnauthorizedError;
