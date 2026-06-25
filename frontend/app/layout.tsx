import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Actify",
  description: "Community Hero - Hyperlocal Problem Solver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <ClerkProvider>
          {children}
          <Toaster />
          <button
        className="
          fixed
          bottom-8
          right-8
          h-20
          w-20
          rounded-full
          bg-gradient-to-r
          from-purple-700
          to-pink-500
          shadow-xl
          flex
          items-center
          justify-center
          hover:scale-105
          transition
        "
      >
        <MessageCircle
          size={34}
          className="text-white"
        />
      </button>
        </ClerkProvider>
        </body>
    </html>
  );
}
