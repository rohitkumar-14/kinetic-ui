"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StaggeredTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  type?: "word" | "char";
  staggerDelay?: number;
  animation?: "fade" | "slide-up" | "blur-in";
  once?: boolean;
  wrapperClassName?: string;
}

export function StaggeredText({
  text,
  type = "word",
  staggerDelay = 0.05,
  animation = "slide-up",
  once = true,
  wrapperClassName,
  className,
  ...props
}: StaggeredTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const getVariants = (): Variants => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        };
      case "blur-in":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
        };
      case "slide-up":
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
        };
    }
  };

  const itemVariants = getVariants();

  const renderWords = () => {
    const words = text.split(" ");
    return words.map((word, index) => (
      <span key={index} className="inline-block whitespace-nowrap overflow-hidden">
        <motion.span
          variants={itemVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
        {/* Add space back */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  const renderChars = () => {
    const words = text.split(" ");
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
        {word.split("").map((char, charIndex) => (
          <motion.span
            key={`${wordIndex}-${charIndex}`}
            variants={itemVariants}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
        {/* Add space back */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <div ref={ref} className={cn("inline-block", wrapperClassName)} {...props}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className={cn("flex flex-wrap", className)}
      >
        {type === "word" ? renderWords() : renderChars()}
      </motion.div>
    </div>
  );
}
