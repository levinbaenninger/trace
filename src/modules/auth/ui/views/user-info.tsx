"use client";

import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatarHeader } from "../components/user-avatar-header";
import { UserInfoDetails } from "../components/user-info-details";
import { UserSignOutButton } from "../components/user-sign-out-button";

export const UserInfo = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <UserInfoSkeleton />;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const initials = `${user.firstName?.[0]}${user.lastName?.[0]}` || "";

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <UserAvatarHeader
          email={user.emailAddresses[0]?.emailAddress ?? "No email address"}
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

export const UserInfoSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mb-1 flex justify-center">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="mx-auto h-7 w-40" />
        <Skeleton className="mx-auto h-4 w-48" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export const UserInfoError = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fehler beim Laden der Benutzerinformationen</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fehler beim Laden der Benutzerinformationen</AlertTitle>
          <AlertDescription>Bitte versuche es später erneut.</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
