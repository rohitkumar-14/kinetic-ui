"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface VariableFontScrollProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
}

export function VariableFontScroll({
  text,
  className,
  minWeight = 100,
  maxWeight = 900,
}: VariableFontScrollProps) {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const weight = useTransform(scrollYProgress, [0, 1], [minWeight, maxWeight]);

  return (
    <motion.div
      ref={container}
      style={{ fontWeight: weight }}
      className={cn("text-6xl md:text-9xl tracking-tighter", className)}
    >
      {text}
    </motion.div>
  );
}
