import { auth } from "@clerk/nextjs/server";

export const getConvexAuthToken = async () => {
  const authResult = await auth();
  return (await authResult.getToken({ template: "convex" })) ?? undefined;
};
