"use client";

import {
  BarChart3,
  BookOpen,
  CircleDot,
  GitCommit,
  GitPullRequest,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/overview", label: "Übersicht", icon: BookOpen },
  { href: "/commits", label: "Commits", icon: GitCommit },
  { href: "/issues", label: "Issues", icon: CircleDot },
  { href: "/pulls", label: "Pull Requests", icon: GitPullRequest },
  { href: "/stats", label: "Statistiken", icon: BarChart3 },
] as const;

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  isActive &&
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                )}
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
