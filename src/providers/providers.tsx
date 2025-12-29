"use client";

import { deDE } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import type { ReactNode } from "react";

import { ConvexClientProvider } from "./convex-client-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        theme: shadcn,
      }}
      localization={deDE}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
};
