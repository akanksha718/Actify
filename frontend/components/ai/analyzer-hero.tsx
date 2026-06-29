"use client";

import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

export function AnalyzerHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border px-2 py-2 backdrop-blur-xl">
        <Sparkles className="h-4 w-4 text-blue-500" />
        AI Powered Civic Detection
      </div>

      <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">
        Detect Civic Issues
        <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Instantly with AI
        </span>
      </h1>

      <p className="mx-auto mt-3 max-w-3xl text-lg text-muted-foreground">
        Upload one image. Our AI detects the issue, estimates severity,
        determines the responsible department and prepares a report in
        seconds.
      </p>

      <div className="mt-3 flex justify-center">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-white shadow-xl">
          <Bot className="h-5 w-5" />
          Gemini AI Powered
        </div>
      </div>
    </motion.section>
  );
}