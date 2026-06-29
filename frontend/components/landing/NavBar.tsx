"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIChatDialog } from "@/components/chat/ai-chat-dialog";

export const NavBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all"
        >

          <img
            src="/favicon.ico"
            alt="Actify Logo"
            className="h-6 w-6"
          />


          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Actify
            </h1>
            <p className="text-xs text-slate-500">
              Civic Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/analysis"
            className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
            AI Analysis
          </Link>

          <Link
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Features
          </Link>
          {isSignedIn && (
            <AIChatDialog>
              <Button
                variant="ghost"
                className="hidden sm:flex text-sm font-medium text-slate-600 hover:text-blue-600 transition"
              >
                Ask AI
              </Button>
            </AIChatDialog>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <Button
                variant="outline"
                className="hidden sm:flex"
                asChild
              >
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>

              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                asChild
              >
                <Link href="/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                asChild
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-10 w-10 ring-2 ring-blue-100",
                  },
                }}
              />
            </>

          )}
        </div>
      </div>
    </header>
  );
};