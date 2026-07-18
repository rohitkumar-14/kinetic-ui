"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  direction?: "left" | "right" | "top" | "bottom" | "circle" | "curtain-h" | "curtain-v";
  delay?: number;
  duration?: number;
  imageClassName?: string;
  once?: boolean;
}

export function ImageReveal({
  src,
  alt,
  direction = "left",
  delay = 0,
  duration = 1.2,
  className,
  imageClassName,
  once = true,
  ...props
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const getVariants = (): Variants => {
    switch (direction) {
      case "left":
        return {
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: { clipPath: "inset(0 0% 0 0)" },
        };
      case "right":
        return {
          hidden: { clipPath: "inset(0 0 0 100%)" },
          visible: { clipPath: "inset(0 0 0 0%)" },
        };
      case "top":
        return {
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: { clipPath: "inset(0% 0 0 0)" },
        };
      case "bottom":
        return {
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: { clipPath: "inset(0 0 0% 0)" },
        };
      case "circle":
        return {
          hidden: { clipPath: "circle(0% at 50% 50%)" },
          visible: { clipPath: "circle(100% at 50% 50%)" },
        };
      case "curtain-h":
        return {
          hidden: { clipPath: "inset(0 50% 0 50%)" },
          visible: { clipPath: "inset(0 0% 0 0%)" },
        };
      case "curtain-v":
        return {
          hidden: { clipPath: "inset(50% 0 50% 0)" },
          visible: { clipPath: "inset(0% 0 0% 0)" },
        };
      default:
        return {
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: { clipPath: "inset(0 0% 0 0)" },
        };
    }
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden w-full h-full", className)}
      {...props}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        transition={{
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1], // Custom easing for premium feel
        }}
        className="w-full h-full origin-center"
      >
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover block", imageClassName)}
          // Optional: slight scale down as it reveals for an extra parallax-like feel
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{
            duration: duration * 1.2,
            delay,
            ease: [0.25, 1, 0.5, 1],
          }}
        />
      </motion.div>
    </div>
  );
}
