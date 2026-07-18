"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ClipPathTransitionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "circle" | "wipe-up" | "wipe-right" | "polygon";
  duration?: number;
  triggerKey?: string | number; // Change this to trigger animation on key change
}

export function ClipPathTransition({
  children,
  variant = "circle",
  duration = 0.8,
  triggerKey,
  className,
  ...props
}: ClipPathTransitionProps) {
  
  const getVariants = () => {
    switch (variant) {
      case "circle":
        return {
          initial: { clipPath: "circle(0% at 50% 50%)" },
          animate: { clipPath: "circle(150% at 50% 50%)" },
          exit: { clipPath: "circle(0% at 50% 50%)" }
        };
      case "wipe-up":
        return {
          initial: { clipPath: "inset(100% 0 0 0)" },
          animate: { clipPath: "inset(0 0 0 0)" },
          exit: { clipPath: "inset(0 0 100% 0)" }
        };
      case "wipe-right":
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: { clipPath: "inset(0 0 0 0)" },
          exit: { clipPath: "inset(0 0 0 100%)" }
        };
      case "polygon":
        return {
          initial: { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
          animate: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          exit: { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }
        };
      default:
        return {
          initial: { clipPath: "circle(0% at 50% 50%)" },
          animate: { clipPath: "circle(150% at 50% 50%)" },
          exit: { clipPath: "circle(0% at 50% 50%)" }
        };
    }
  };

  const variants = getVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={triggerKey}
        className={cn("w-full h-full", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
