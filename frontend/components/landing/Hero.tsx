"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Trophy, Users, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-3">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        <div className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                            AI Powered Civic Issue Resolution
                        </div>

                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                            Make Cities
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Smarter & Safer
                            </span>
                        </h1>

                        <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
                            Actify leverages AI to detect, track, and resolve civic
                            infrastructure issues faster. Empower communities and local
                            authorities with AI powered reporting.
                        </p>

                        <Button
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            asChild
                        >
                            <Link href="/sign-up">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        {/* Stats */}
                        <div className="mt-10 flex flex-wrap gap-8">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" />
                                <span>Helping Communities</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-green-500" />
                                <span>Earn Rewards</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-purple-500" />
                                <span>AI Verified Reports</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl border bg-white/10 shadow-2xl backdrop-blur-lg">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/049/084/478/small_2x/image-of-a-helping-hand-illustration-of-hands-reaching-for-each-other-vector.jpg"
                                alt="Actify Hero"
                                width={600}
                                height={400}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}