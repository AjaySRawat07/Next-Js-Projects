"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { MessageSquare, LogOut, LogIn, User as UserIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user: User = session?.user as User;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link
          href={session ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900 dark:text-white transition hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black shadow">
            <MessageSquare className="h-4 w-4" />
          </div>
          <span>TrueFeedback</span>
        </Link>

        {/* Right Section: Theme Toggle & Auth Actions */}
        <div className="flex items-center gap-3">
          {/* Light / Dark / Device System Theme Switcher */}
          <ThemeToggle />

          {status === "loading" ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          ) : session ? (
            <div className="flex items-center gap-3">
              {/* User Identity Pill */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/90 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <UserIcon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>
                  Welcome,{" "}
                  <strong className="text-neutral-900 dark:text-white">
                    {user?.username ? `@${user.username}` : user?.email}
                  </strong>
                </span>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1.5 font-medium"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
