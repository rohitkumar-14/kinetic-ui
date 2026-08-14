"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonState = "idle" | "loading" | "success";

export interface MorphingStateButtonProps {
  onClick?: () => Promise<void>;
  idleText?: string;
  className?: string;
}

export function MorphingStateButton({
  onClick,
  idleText = "Submit",
  className,
}: MorphingStateButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (buttonState !== "idle") return;
    
    setButtonState("loading");
    
    if (onClick) {
      try {
        await onClick();
        setButtonState("success");
      } catch (e) {
        setButtonState("idle");
      }
    } else {
      // Simulate network request
      setTimeout(() => setButtonState("success"), 2000);
    }

    // Reset after success
    setTimeout(() => {
      setButtonState((current) => (current === "success" ? "idle" : current));
    }, 4000);
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={cn(
        "relative flex items-center justify-center overflow-hidden font-medium text-white shadow-lg outline-none",
        buttonState === "idle" ? "bg-zinc-900 hover:bg-zinc-800 rounded-full px-8 py-3 h-12 w-40" : "",
        buttonState === "loading" ? "bg-zinc-800 rounded-full h-12 w-12" : "",
        buttonState === "success" ? "bg-emerald-500 rounded-full h-12 w-12 shadow-[0_0_40px_rgba(16,185,129,0.5)]" : "",
        className
      )}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={buttonState === "idle" ? { scale: 0.95 } : undefined}
    >
      <AnimatePresence mode="wait">
        {buttonState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span>{idleText}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}

        {buttonState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
          </motion.div>
        )}

        {buttonState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
          >
            <Check className="w-6 h-6 text-white stroke-[3]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
