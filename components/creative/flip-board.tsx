"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Standard character set for the flip board
const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?@#$%&*()+-=";

interface FlipBoardProps {
  /** The text to display on the board */
  text: string;
  /** Number of rows in the board */
  rows?: number;
  /** Number of columns in the board (defaults to text length if rows=1) */
  cols?: number;
  /** Container class */
  className?: string;
  /** Character flap class */
  charClassName?: string;
  /** Theme of the board */
  theme?: "dark" | "light";
}

export function FlipBoard({
  text,
  rows = 1,
  cols,
  className,
  charClassName,
  theme = "dark",
}: FlipBoardProps) {
  const colCount = cols || Math.max(text.length, 1);
  const totalCells = rows * colCount;

  // Pad the text to fill the board
  const paddedText = (
    text.toUpperCase() + " ".repeat(Math.max(0, totalCells - text.length))
  ).slice(0, totalCells);

  const gridRows = [];
  for (let i = 0; i < rows; i++) {
    gridRows.push(paddedText.slice(i * colCount, (i + 1) * colCount));
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-4 rounded-xl",
        theme === "dark"
          ? "bg-black border border-neutral-800 shadow-2xl"
          : "bg-neutral-300 border border-neutral-400 shadow-xl",
        className
      )}
    >
      {gridRows.map((rowText, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {rowText.split("").map((char, colIndex) => (
            <FlipChar
              key={`${rowIndex}-${colIndex}`}
              targetChar={char}
              className={charClassName}
              theme={theme}
              // Add a slight stagger from top-left to bottom-right
              delay={(rowIndex * colCount + colIndex) * 0.03}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface FlipCharProps {
  targetChar: string;
  delay?: number;
  className?: string;
  theme?: "dark" | "light";
}

function FlipChar({
  targetChar,
  delay = 0,
  className,
  theme = "dark",
}: FlipCharProps) {
  const [displayChar, setDisplayChar] = useState(ALPHABET[0]);
  const [nextChar, setNextChar] = useState(ALPHABET[0]);
  const [isFlipping, setIsFlipping] = useState(false);

  const currentRef = useRef(ALPHABET[0]);

  useEffect(() => {
    // Treat unknown characters as space
    const charToFind = targetChar.toUpperCase();
    const targetC = ALPHABET.includes(charToFind) ? charToFind : " ";

    if (currentRef.current === targetC) return;

    let interval: NodeJS.Timeout;
    let flipTimeout: NodeJS.Timeout;

    const startCycle = () => {
      interval = setInterval(() => {
        if (currentRef.current === targetC) {
          clearInterval(interval);
          return;
        }

        let currentIndex = ALPHABET.indexOf(currentRef.current);
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex = (currentIndex + 1) % ALPHABET.length;
        const nextC = ALPHABET[nextIndex];

        setNextChar(nextC);
        setIsFlipping(true);

        flipTimeout = setTimeout(() => {
          currentRef.current = nextC;
          setDisplayChar(nextC);
          setIsFlipping(false);
        }, 50); // Half of the interval for the flip down
      }, 100); // Speed of character cycling (very fast)
    };

    const startDelay = setTimeout(startCycle, delay * 1000);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
      clearTimeout(flipTimeout);
    };
  }, [targetChar, delay]);

  const isDark = theme === "dark";
  const bgClass = isDark
    ? "bg-zinc-900 border-zinc-950 text-zinc-100"
    : "bg-white border-zinc-200 text-zinc-900";
  const innerBgClass = isDark ? "bg-zinc-900" : "bg-white";
  const dividerClass = isDark ? "bg-black/80" : "bg-zinc-300/80";

  return (
    <div
      className={cn(
        "relative inline-block perspective-[400px]",
        className
      )}
    >
      <div
        className={cn(
          "relative w-7 h-10 sm:w-10 sm:h-14 rounded-[3px] sm:rounded-md shadow-sm border font-mono text-xl sm:text-3xl font-bold flex flex-col justify-center items-center overflow-hidden",
          bgClass
        )}
      >
        {/* The center line crease */}
        <div
          className={cn(
            "absolute top-1/2 left-0 w-full h-[1px] sm:h-[2px] -mt-[0.5px] sm:-mt-[1px] z-20 shadow-sm",
            dividerClass
          )}
        />

        {/* Top Half (Next Char Background) */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-1/2 overflow-hidden flex items-end justify-center pb-[1px]",
            innerBgClass
          )}
        >
          <span className="translate-y-[50%]">{nextChar}</span>
        </div>

        {/* Bottom Half (Current Char Background) */}
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full h-1/2 overflow-hidden flex items-start justify-center pt-[1px]",
            innerBgClass
          )}
        >
          <span className="-translate-y-[50%]">{displayChar}</span>
        </div>

        {/* Flap Top (Current Char folding down) */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={isFlipping ? { rotateX: -90 } : { rotateX: 0 }}
          transition={{ duration: 0.05, ease: "linear" }}
          className={cn(
            "absolute top-0 left-0 w-full h-1/2 overflow-hidden flex items-end justify-center pb-[1px] origin-bottom z-10 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]",
            innerBgClass
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="translate-y-[50%]">{displayChar}</span>
        </motion.div>

        {/* Flap Bottom (Next Char unfolding from back) */}
        <motion.div
          initial={{ rotateX: 90 }}
          animate={isFlipping ? { rotateX: 0 } : { rotateX: 90 }}
          transition={{ duration: 0.05, ease: "linear", delay: 0.05 }}
          className={cn(
            "absolute bottom-0 left-0 w-full h-1/2 overflow-hidden flex items-start justify-center pt-[1px] origin-top z-10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]",
            innerBgClass
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="-translate-y-[50%]">{nextChar}</span>
        </motion.div>
      </div>
    </div>
  );
}
