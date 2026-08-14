"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CinematicTextRevealProps {
  text: string;
  className?: string;
}

export function CinematicTextReveal({ text, className }: CinematicTextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      rotateY: 45,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        mass: 0.8,
      },
    },
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap overflow-hidden perspective-[1000px]", className)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.25em] whitespace-nowrap">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={letterVariants}
                className="inline-block transform-style-preserve-3d"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
