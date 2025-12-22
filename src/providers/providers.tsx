"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { ConvexClientProvider } from "./convex-client-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
};
