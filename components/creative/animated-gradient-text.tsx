"use client";

import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps extends HTMLMotionProps<"span"> {
  text?: string;
  children?: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
}

export function AnimatedGradientText({
  text,
  children,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 15,
  className,
  ...props
}: AnimatedGradientTextProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Ensure we have at least 2 colors, and if we want a seamless loop, 
  // the first and last color should ideally be the same.
  const gradientStops = colors.join(", ");

  return (
    <motion.span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-[length:200%_auto]",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientStops})`,
      }}
      animate={{
        backgroundPosition: ["0% center", "-200% center"],
      }}
      transition={{
        repeat: shouldReduceMotion ? 0 : Infinity,
        repeatType: "loop",
        duration: animationSpeed,
        ease: "linear",
      }}
      {...props}
    >
      {text || children}
    </motion.span>
  );
}
