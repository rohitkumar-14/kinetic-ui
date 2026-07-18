"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Send, Paperclip, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnimatedPromptInputProps extends Omit<HTMLMotionProps<"div">, "onSubmit"> {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  isGenerating?: boolean;
}

export function AnimatedPromptInput({
  onSubmit,
  placeholder = "Ask anything...",
  isGenerating = false,
  className,
  ...props
}: AnimatedPromptInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (value.trim() && !isGenerating) {
      onSubmit?.(value);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div 
      className={cn("relative w-full max-w-3xl mx-auto group", className)}
      initial={false}
      animate={{ 
        scale: isFocused ? 1.02 : 1,
        y: isFocused ? -2 : 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...props}
    >
      {/* Animated Glow Background */}
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-3xl blur-xl opacity-0 transition-opacity duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          (isFocused || value.length > 0) && "opacity-30",
          isGenerating && "opacity-60 animate-pulse"
        )}
      />

      <div className="relative flex flex-col bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-colors duration-300 group-hover:border-white/20 shadow-2xl">
        
        {/* Top Input Area */}
        <div className="flex items-start px-4 pt-4 pb-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isGenerating}
            rows={1}
            className="w-full bg-transparent text-white placeholder:text-zinc-500 resize-none outline-none overflow-y-auto min-h-[24px] max-h-[200px] text-base md:text-lg leading-relaxed py-1"
          />
        </div>

        {/* Bottom Toolbar Area */}
        <div className="flex items-center justify-between px-4 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:block"
              title="Voice Input"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence mode="popLayout">
              {value.length > 0 && !isGenerating && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs text-zinc-500 font-medium tracking-wide mr-2 hidden sm:block"
                >
                  Return to send
                </motion.span>
              )}
            </AnimatePresence>
            
            <button
              onClick={handleSubmit}
              disabled={value.trim().length === 0 || isGenerating}
              className={cn(
                "p-2 rounded-full flex items-center justify-center transition-all duration-300",
                value.trim().length > 0 && !isGenerating
                  ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-100" 
                  : "bg-white/5 text-zinc-500 scale-95"
              )}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
