import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignedIn>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-1 flex justify-center">
              <UserButton />
            </div>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              {user?.emailAddresses[0]?.emailAddress}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-xs">{user?.id}</span>
              </div>
            </div>
            <SignOutButton>
              <Button className="w-full" variant="outline">
                Sign Out
              </Button>
            </SignOutButton>
          </CardContent>
        </Card>
      </SignedIn>
    </div>
  );
}
