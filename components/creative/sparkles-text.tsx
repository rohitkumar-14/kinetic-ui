"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

const DEFAULT_COLOR = "#FFC700";
const generateSparkle = (color = DEFAULT_COLOR): Sparkle => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 25),
    style: {
      top: random(-20, 80) + "%",
      left: random(-20, 100) + "%",
      zIndex: Math.random() > 0.5 ? 2 : 0, // Put some behind, some in front
    },
  };
};

export interface SparklesTextProps {
  text: string;
  colors?: { first: string; second: string };
  className?: string;
  sparklesCount?: number;
}

export function SparklesText({
  text,
  colors = { first: "#A07CFE", second: "#FE8FB5" },
  className,
  sparklesCount = 10,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate initial sparkles
    setSparkles(Array.from({ length: sparklesCount }).map(() => generateSparkle(Math.random() > 0.5 ? colors.first : colors.second)));

    const interval = setInterval(() => {
      const sparkle = generateSparkle(Math.random() > 0.5 ? colors.first : colors.second);
      setSparkles((currentSparkles) => {
        // We want to rotate sparkles. Remove a random one and add a new one.
        const nextSparkles = [...currentSparkles];
        if (nextSparkles.length >= sparklesCount) {
          const randomIndex = random(0, nextSparkles.length);
          nextSparkles.splice(randomIndex, 1);
        }
        nextSparkles.push(sparkle);
        return nextSparkles;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleSVG key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
        ))}
      </AnimatePresence>
      <strong className="relative z-10 font-bold">{text}</strong>
    </span>
  );
}

const SparkleSVG = ({ size, color, style }: { size: number; color: string; style: React.CSSProperties }) => {
  return (
    <motion.span
      className="absolute pointer-events-none"
      style={style}
      initial={{ scale: 0, rotate: -15, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, rotate: 15, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </motion.span>
  );
};
