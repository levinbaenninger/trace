"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link className="flex items-center gap-3" href="/overview">
          <Image
            alt="Trace Logo"
            className="size-7"
            height={28}
            src="/logo.svg"
            width={28}
          />
          <span className="text-xl font-semibold">Trace</span>
        </Link>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-8",
            },
          }}
        />
      </div>
    </header>
  );
};
