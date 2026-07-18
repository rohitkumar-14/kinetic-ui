"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type KineticLoaderVariant = "flip" | "bounce" | "wave" | "pulse";

interface KineticLoaderProps extends HTMLMotionProps<"div"> {
  /** Text to display while loading. Default: "LOADING..." */
  text?: string;
  size?: "sm" | "md" | "lg";
  /** Animation speed multiplier. Default: 1 */
  speed?: number;
  /** Animation variant. Default: "flip" */
  variant?: KineticLoaderVariant;
  color?: string;
}

const getVariants = (variant: KineticLoaderVariant, speed: number): { container: Variants; child: Variants } => {
  const baseDuration = 0.8 / speed;
  const staggerDelay = 0.1 / speed;

  switch (variant) {
    case "bounce":
      return {
        container: {
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay },
          },
        },
        child: {
          hidden: { y: "0%" },
          visible: {
            y: ["0%", "-40%", "0%"],
            transition: { 
              duration: baseDuration, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          },
        },
      };
    case "wave":
      return {
        container: {
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay },
          },
        },
        child: {
          hidden: { y: "0%", rotateZ: 0 },
          visible: {
            y: ["0%", "-20%", "0%"],
            rotateZ: [0, 10, -10, 0],
            transition: { 
              duration: baseDuration * 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          },
        },
      };
    case "pulse":
      return {
        container: {
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay },
          },
        },
        child: {
          hidden: { opacity: 0.2, scale: 0.8 },
          visible: {
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.1, 0.8],
            transition: { 
              duration: baseDuration, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          },
        },
      };
    case "flip":
    default:
      return {
        container: {
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay },
          },
        },
        child: {
          hidden: { rotateX: -90, opacity: 0, y: 10 },
          visible: {
            rotateX: 0,
            opacity: 1,
            y: 0,
            transition: {
              duration: baseDuration,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5 / speed,
              ease: "easeOut",
            },
          },
        },
      };
  }
};

export function KineticLoader({
  text = "LOADING...",
  size = "md",
  speed = 1,
  variant = "flip",
  color,
  className,
  ...props
}: KineticLoaderProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-6xl",
  };

  const hasColorText = className?.includes("text-");
  const { container, child } = getVariants(variant, speed);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-center justify-center font-bold tracking-widest perspective-1000",
        !hasColorText && !color && "text-indigo-500",
        sizeClasses[size],
        className
      )}
      style={{
        color: color || undefined,
        ...props.style,
      }}
      {...props}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block origin-bottom transform-style-3d mr-[0.1em]"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
