import { UserButton } from "@clerk/nextjs";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { UserAvatarFallback } from "./user-avatar-fallback";

interface Props {
  email: string;
  initials: string;
}

export const UserAvatarHeader = ({ email, initials }: Props) => {
  return (
    <>
      <div className="mb-1 flex justify-center">
        <UserButton fallback={<UserAvatarFallback initials={initials} />} />
      </div>
      <CardTitle>Willkommen zurück!</CardTitle>
      <CardDescription>{email}</CardDescription>
    </>
  );
};
