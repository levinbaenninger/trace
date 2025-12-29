import { ConvexError } from "convex/values";
import type { DomainError } from "../../../convex/_types/errors/utils";

export const parseError = <E extends DomainError>(error: unknown): E => {
  if (error instanceof ConvexError) {
    return error.data as E;
  }

  return {
    code: "UNKNOWN_ERROR",
  } as E;
};
