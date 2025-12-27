import type { Value } from "convex/values";

export interface DomainError {
  code: string;
  [key: string]: Value | undefined;
}
