"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export type ScrambleVariant = "cyber" | "matrix" | "blocks" | "minimal";

interface TextScrambleProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  /** Speed of the scramble interval in ms. Default: 50 */
  speed?: number;
  /** Delay before starting in ms. Default: 0 */
  delay?: number;
  /** Custom character set. If omitted, uses the variant's default. */
  characterSet?: string;
  /** Whether the scramble should run. Useful for triggering on hover. Default: true */
  trigger?: boolean;
  /** Pre-configured style variant. Default: "cyber" */
  variant?: ScrambleVariant;
}

const CHAR_SETS: Record<ScrambleVariant, string> = {
  cyber: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  matrix: "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン",
  blocks: "░▒▓█▄▀■▖▗▘▙▚▛▜▝▞▟",
  minimal: "+-/",
};

export function TextScramble({
  text,
  speed = 50,
  delay = 0,
  characterSet,
  className,
  trigger = true,
  variant = "cyber",
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeCharSet = characterSet || CHAR_SETS[variant];

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text); // Just show text if not triggered
      return;
    }

    const startScramble = () => {
      let iterations = 0;
      
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => {
          const newText = text
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return text[index];
              }
              if (char === " ") return " ";
              return activeCharSet[Math.floor(Math.random() * activeCharSet.length)];
            })
            .join("");

          if (iterations >= text.length) {
            clearInterval(intervalRef.current!);
          }
          
          // Speed of reveal relative to text length
          iterations += 1 / 3; 
          return newText;
        });
      }, speed);
    };

    // Reset before starting
    setDisplayText("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (delay > 0) {
      timeoutRef.current = setTimeout(startScramble, delay);
    } else {
      startScramble();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, delay, activeCharSet, trigger]);

  return (
    <span 
      className={cn("inline-block whitespace-pre-wrap", className)} 
      {...props}
    >
      {displayText || text.replace(/./g, " ")}
    </span>
  );
}
