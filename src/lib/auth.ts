import { auth } from "@clerk/nextjs/server";

export const getToken = async () => {
  const authResult = await auth();
  return (await authResult.getToken({ template: "convex" })) ?? undefined;
};
