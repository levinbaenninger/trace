import type { DomainError } from "@convex/_types/errors/utils";
import { ConvexError } from "convex/values";

export const parseError = <E extends DomainError>(error: unknown): E => {
  if (error instanceof ConvexError) {
    return error.data as E;
  }

  return {
    code: "UNKNOWN_ERROR",
  } as E;
};
