"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-up" | "blur";
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  amount?: "some" | "all" | number;
}

const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export function ScrollReveal({
  children,
  animation = "slide-up",
  duration = 0.8,
  delay = 0,
  staggerChildren,
  once = true,
  amount = 0.2,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const selectedVariants = variants[animation] || variants["slide-up"];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        ...(staggerChildren ? { staggerChildren } : {}),
      }}
      className={cn(className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

// Optional helper for staggering multiple children easily
export function ScrollRevealChild({
  children,
  className,
  animation = "slide-up",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-up" | "blur";
}) {
  const selectedVariants = variants[animation] || variants["slide-up"];
  
  return (
    <motion.div variants={selectedVariants} className={className}>
      {children}
    </motion.div>
  );
}
