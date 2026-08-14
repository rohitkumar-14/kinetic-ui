"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export interface AIGenerativeInputProps {
  onSubmit?: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function AIGenerativeInput({
  onSubmit,
  placeholder = "Ask anything...",
  className,
}: AIGenerativeInputProps) {
  const [value, setValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!value.trim() || isThinking) return;
    
    setIsThinking(true);
    
    // Trigger tiny particle explosion on submit
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const x = (rect.right - 40) / window.innerWidth;
      const y = (rect.bottom - 20) / window.innerHeight;
      
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { x, y },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
        disableForReducedMotion: true,
        zIndex: 100,
      });
    }

    if (onSubmit) {
      onSubmit(value);
    }

    // Simulate AI thinking time
    setTimeout(() => {
      setIsThinking(false);
      setValue("");
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <motion.div
        layout
        className={cn(
          "relative overflow-hidden rounded-3xl bg-zinc-900 border transition-colors duration-500",
          isThinking ? "border-transparent" : "border-zinc-800 focus-within:border-zinc-700"
        )}
      >
        {/* Animated Thinking Border */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute inset-[-1px] rounded-3xl bg-[linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] bg-[length:200%_100%] animate-[gradient_2s_linear_infinite] p-[1px] -z-10" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col w-full bg-zinc-900 rounded-3xl p-2 relative z-10">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isThinking}
            className="w-full bg-transparent text-white px-4 py-3 min-h-[60px] max-h-[200px] resize-none outline-none placeholder:text-zinc-500 disabled:opacity-50 transition-opacity"
            rows={value.split("\n").length > 1 ? Math.min(value.split("\n").length, 6) : 1}
          />
          
          <div className="flex justify-between items-center px-2 pb-1 mt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium select-none">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Generative AI Engine</span>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!value.trim() || isThinking}
              className={cn(
                "p-2 rounded-full flex items-center justify-center transition-all duration-300",
                value.trim() && !isThinking
                  ? "bg-white text-black hover:scale-105"
                  : "bg-zinc-800 text-zinc-500",
                isThinking && "bg-transparent text-blue-500"
              )}
            >
              {isThinking ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
