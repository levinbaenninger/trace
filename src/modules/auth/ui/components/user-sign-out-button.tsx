"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const UserSignOutButton = () => {
  return (
    <SignOutButton>
      <Button className="w-full" variant="outline">
        Sign Out
      </Button>
    </SignOutButton>
  );
};
