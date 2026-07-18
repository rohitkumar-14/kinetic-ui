"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type TextRevealVariant = "slide-up" | "slide-down" | "fade" | "scale";

interface TextRevealProps {
  /** The text to reveal */
  text: string;
  className?: string;
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number;
  /** Speed multiplier. Higher is faster. Default: 1 */
  speed?: number;
  /** Animation preset. Default: "slide-up" */
  variant?: TextRevealVariant;
}

const getVariants = (variant: TextRevealVariant, speed: number): Variants => {
  const duration = 0.8 / speed;

  switch (variant) {
    case "slide-down":
      return {
        hidden: { y: "-100%", opacity: 0, rotateZ: -5 },
        visible: {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case "fade":
      return {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: "easeOut" },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration, ease: [0.175, 0.885, 0.32, 1.275] }, // BackOut
        },
      };
    case "slide-up":
    default:
      return {
        hidden: { y: "100%", opacity: 0, rotateZ: 5 },
        visible: {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] }, // Custom snappy ease
        },
      };
  }
};

export function TextReveal({
  text,
  className,
  delay = 0,
  speed = 1,
  variant = "slide-up",
}: TextRevealProps) {
  const ref = useRef(null);
  // Triggers once when the text is 15% visible
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const words = text.split(" ");
  const childVariants = getVariants(variant, speed);

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-[0.25em] overflow-hidden", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="relative overflow-hidden inline-block pb-1">
          <motion.span
            variants={childVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: delay + i * (0.05 / speed) }}
            className="inline-block transform origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
