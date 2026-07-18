"use client";

import React, { useEffect, useState } from "react";
import { motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export type OdometerAnimation = "spring" | "bouncy" | "smooth" | "quick";

interface OdometerProps {
  value: number;
  className?: string;
  /** Whether to add formatting (like commas) */
  format?: boolean;
  /** Custom separator. Default is based on locale if format is true, or you can force one (e.g. ".") */
  separator?: string;
  /** Animation style. Default: "spring" */
  animation?: OdometerAnimation;
  /** Prefix for the number (e.g. "$", "€") */
  prefix?: string;
  /** Suffix for the number (e.g. "%", "k") */
  suffix?: string;
}

const ANIMATIONS: Record<OdometerAnimation, Transition> = {
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  bouncy: {
    type: "spring",
    stiffness: 200,
    damping: 10,
    mass: 1,
  },
  smooth: {
    type: "tween",
    ease: "circOut",
    duration: 0.8,
  },
  quick: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  },
};

function Digit({
  place,
  value,
  transition,
}: {
  place: number;
  value: number;
  transition: Transition;
}) {
  // Extract the specific digit for this place (e.g., hundreds, tens, ones)
  const digit = Math.floor(value / place) % 10;

  return (
    <div className="relative inline-block w-[1ch] h-[1em] overflow-hidden text-center leading-none">
      <motion.div
        className="absolute top-0 left-0 w-full flex flex-col"
        initial={false}
        animate={{ y: `-${digit * 10}%` }}
        transition={transition}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="h-[1em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Odometer({
  value,
  className,
  format = true,
  separator,
  animation = "spring",
  prefix,
  suffix,
}: OdometerProps) {
  const [internalValue, setInternalValue] = useState(0);

  useEffect(() => {
    // Slight delay to allow entrance animation if mounted
    const timeout = setTimeout(() => {
      setInternalValue(value);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  // Format the target value to get the structure (with commas/separators)
  let formattedStr = value.toString();
  if (format) {
    if (separator) {
      // Custom basic formatter: groups of 3
      formattedStr = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    } else {
      formattedStr = value.toLocaleString();
    }
  }

  // Create an array representing the places (1, 10, 100, etc.)
  const elements = [];
  let placeMultiplier = 1;
  const transition = ANIMATIONS[animation];

  // We iterate backwards to assign the correct multiplier to digits
  for (let i = formattedStr.length - 1; i >= 0; i--) {
    const char = formattedStr[i];
    if (isNaN(parseInt(char))) {
      // It's a separator
      elements.unshift(
        <span key={`sep-${i}`} className="inline-block leading-none h-[1em] opacity-60">
          {char}
        </span>
      );
    } else {
      elements.unshift(
        <Digit
          key={`digit-${placeMultiplier}`}
          place={placeMultiplier}
          value={internalValue}
          transition={transition}
        />
      );
      placeMultiplier *= 10;
    }
  }

  return (
    <div
      className={cn(
        "flex items-center font-mono font-bold text-foreground overflow-hidden",
        className
      )}
    >
      {prefix && (
        <span className="inline-block leading-none h-[1em] opacity-80 mr-[0.1em]">
          {prefix}
        </span>
      )}
      {elements}
      {suffix && (
        <span className="inline-block leading-none h-[1em] opacity-80 ml-[0.1em]">
          {suffix}
        </span>
      )}
    </div>
  );
}
