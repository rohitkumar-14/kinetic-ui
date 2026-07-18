"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
}

export interface GenerativeChatProps {
  messages: Message[];
  isGenerating?: boolean;
  onSend?: (message: string) => void;
  className?: string;
  placeholder?: string;
}

export function GenerativeChat({
  messages,
  isGenerating = false,
  onSend,
  className,
  placeholder = "Ask AI to generate a component...",
}: GenerativeChatProps) {
  const [inputValue, setInputValue] = React.useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;
    onSend?.(inputValue);
    setInputValue("");
  };

  return (
    <div className={cn("flex flex-col w-full h-[600px] border border-white/10 rounded-2xl bg-zinc-950 overflow-hidden relative shadow-2xl", className)}>
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={cn(
                "flex w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn("flex max-w-[90%] md:max-w-[80%] gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                
                {/* Avatar */}
                <div className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center border mt-1",
                  message.role === "user" 
                    ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                    : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                )}>
                  {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Bubble */}
                <div className={cn(
                  "rounded-2xl p-4 overflow-hidden shadow-sm text-sm leading-relaxed",
                  message.role === "user" 
                    ? "bg-zinc-800 text-white rounded-tr-sm" 
                    : "bg-zinc-900 border border-white/5 text-zinc-200 rounded-tl-sm"
                )}>
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full justify-start"
          >
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-indigo-500/10 border-indigo-500/30 text-indigo-400 mt-1">
                <Bot size={16} />
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[44px]">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 z-20 relative">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end w-full max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all duration-300"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-white px-4 py-4 max-h-[150px] min-h-[56px] resize-none outline-none placeholder:text-zinc-500 custom-scrollbar text-sm"
            rows={1}
          />
          <div className="absolute right-2 bottom-2">
            <button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className={cn(
                "p-2 rounded-lg flex items-center justify-center transition-all",
                inputValue.trim() && !isGenerating
                  ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:bg-indigo-400"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              )}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
        <div className="text-center mt-2.5">
          <span className="text-[10px] text-zinc-600 font-medium">Final Boss AI Assistant</span>
        </div>
      </div>
    </div>
  );
}
