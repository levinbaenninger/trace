import type { User } from "@clerk/nextjs/server";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatarHeader } from "../components/user-avatar-header";
import { UserInfoDetails } from "../components/user-info-details";
import { UserSignOutButton } from "../components/user-sign-out-button";

interface UserInfoViewProps {
  user: User;
}

export const UserInfoView = ({ user }: UserInfoViewProps) => {
  const initials = user.firstName?.[0] || user.lastName?.[0] || "";

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <UserAvatarHeader
          email={user.emailAddresses[0].emailAddress}
          initials={initials}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UserInfoDetails
          firstName={user.firstName}
          lastName={user.lastName}
          userId={user.id}
        />
        <UserSignOutButton />
      </CardContent>
    </Card>
  );
};
