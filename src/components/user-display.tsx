"use client";

import { useQuery } from "convex/react";
import { User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "../../convex/_generated/api";

interface UserProps {
  userId: string;
  showAvatar?: boolean;
}

export const User = ({ userId, showAvatar = false }: UserProps) => {
  const users = useQuery(api.users.list.default);

  const user = users?.find((u) => u.id === userId);
  const displayName = user?.name || userId.split("|")[1] || userId;

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

interface UserBadgeProps {
  userId: string;
}

export const UserBadge = ({ userId }: UserBadgeProps) => {
  const users = useQuery(api.users.list.default);

  const user = users?.find((u) => u.id === userId);
  const displayName = user?.name || userId.split("|")[1] || userId;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
      <UserIcon className="h-3 w-3" />
      {displayName}
    </div>
  );
};
