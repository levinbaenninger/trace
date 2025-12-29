import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { AuthError } from "../_types/errors/auth";

export const requireAuth = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError<AuthError>({
      code: "UNAUTHENTICATED",
    });
  }

  return identity;
};
