"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextScrollytellingProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export function SplitTextScrollytelling({
  text,
  className,
  wordClassName,
}: SplitTextScrollytellingProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={container}
      className={cn(
        "flex flex-wrap gap-[0.2em] text-4xl md:text-6xl font-bold leading-tight",
        className
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  className?: string;
}

function Word({ children, progress, range, className }: WordProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity: opacity }} className={className}>
        {children}
      </motion.span>
    </span>
  );
}
