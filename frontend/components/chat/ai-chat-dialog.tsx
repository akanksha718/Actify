"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useRef, useState } from "react";

import { chatWithAI } from "@/lib/api-client";
import { ChatMessage } from "@/types/chat";

import { Sparkles, Send, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

export function AIChatDialog({ children }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I'm Actify AI. Ask me anything about reporting civic issues.",
    },
  ]);

  const [input, setInput] = useState("");
  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const message = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const reply = await chatWithAI(input, userId!);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl h-[350px] flex flex-col">

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Actify AI
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-4 py-3 max-w-[80%]
                ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex">
              <div className="rounded-xl bg-slate-100 p-3 flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />

        </div>

        <div className="flex gap-2">

          <Input
            value={input}
            placeholder="Ask Actify AI..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <Button
            onClick={sendMessage}
            disabled={loading}
          >
            <Send className="h-4 w-4" />
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}