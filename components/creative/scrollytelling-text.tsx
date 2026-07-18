"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollytellingTextProps {
  text: string;
  className?: string;
}

export function ScrollytellingText({ text, className }: ScrollytellingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.25"]
  });

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className={cn("flex flex-wrap text-4xl md:text-6xl font-bold leading-tight tracking-tight", className)}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="mr-[0.25em] mt-[0.1em] relative">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
