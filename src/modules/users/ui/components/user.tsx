"use client";

import type { api } from "@convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProps {
  userId: string;
  showAvatar?: boolean;
  users: FunctionReturnType<typeof api.users.list.default>;
}

export const User = ({ userId, showAvatar = false, users }: UserProps) => {
  const user = users?.find((u) => u.clerkId === userId);
  const displayName = user?.firstName || "Anonym";

  if (showAvatar) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          {user?.imageUrl && (
            <AvatarImage alt={displayName} src={user.imageUrl} />
          )}
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{displayName}</span>
      </div>
    );
  }

  return <span className="text-sm">{displayName}</span>;
};
