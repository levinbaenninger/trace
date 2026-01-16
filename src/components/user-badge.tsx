"use client";

import type { FunctionReturnType } from "convex/server";
import { User as UserIcon } from "lucide-react";

import type { api } from "../../convex/_generated/api";

interface UserBadgeProps {
  userId: string;
  users: FunctionReturnType<typeof api.users.list.default>;
}

export const UserBadge = ({ userId, users }: UserBadgeProps) => {
  const user = users?.find((u) => u.clerkId === userId);
  const displayName = user?.firstName || userId.split("|")[1] || userId;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
      <UserIcon className="h-3 w-3" />
      {displayName}
    </div>
  );
};
