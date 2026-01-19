import type { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server";
import { api } from "@convex/_generated/api";
import { convex } from "@/lib/convex";

export const handleUserCreated = async (user: UserJSON) => {
  await convex.mutation(api.users.create.default, {
    clerkId: user.id,
    firstName: user.first_name || "Anonym",
    imageUrl: user.image_url,
  });
};

export const handleUserUpdated = async (user: UserJSON) => {
  await convex.mutation(api.users.update.default, {
    clerkId: user.id,
    firstName: user.first_name || "Anonym",
    imageUrl: user.image_url,
  });
};

export const handleUserDeleted = async (user: DeletedObjectJSON) => {
  if (!user.id) return;

  await convex.mutation(api.users.remove.default, {
    clerkId: user.id,
  });
};
