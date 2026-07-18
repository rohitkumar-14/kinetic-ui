"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The main Dynamic Island wrapper.
 * Automatically resizes based on its children using Framer Motion layout animations.
 */
export interface DynamicIslandProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Custom spring configuration for the layout morph */
  spring?: { stiffness: number; damping: number; mass?: number };
}

export const DynamicIsland = forwardRef<HTMLDivElement, DynamicIslandProps>(
  ({ children, spring = { stiffness: 400, damping: 30 }, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout
        transition={{
          type: "spring",
          stiffness: spring.stiffness,
          damping: spring.damping,
          mass: spring.mass,
        }}
        className={cn(
          "bg-black text-white rounded-[2rem] overflow-hidden shadow-2xl relative",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
DynamicIsland.displayName = "DynamicIsland";

/**
 * A wrapper for content inside the Dynamic Island.
 * Handles the enter/exit fading when states change.
 */
export interface DynamicIslandContentProps {
  children: React.ReactNode;
  /** Unique key to trigger AnimatePresence transitions */
  id: string;
  className?: string;
}

export function DynamicIslandContent({ children, id, className }: DynamicIslandContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", position: "absolute" }}
        transition={{ duration: 0.2 }}
        className={cn("w-full h-full flex flex-col justify-center", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
