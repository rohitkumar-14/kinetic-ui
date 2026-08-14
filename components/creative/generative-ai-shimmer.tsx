"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GenerativeAiShimmerProps {
  text: string;
  className?: string;
}

export function GenerativeAiShimmer({ text, className }: GenerativeAiShimmerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.5,
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom bouncy ease
      },
    },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap relative z-10"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={wordVariants}
            className="inline-block mr-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500 will-change-[filter,transform,opacity]"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
