"use client";

import React, { useState, useEffect, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AIStreamWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Delay before the generation starts (ms) */
  startDelay?: number;
  /** Stagger delay between each child element (ms) */
  staggerDelay?: number;
  /** Duration of the dissolve animation per element (ms) */
  dissolveDuration?: number;
  /** Whether to show the scanning line effect */
  showScanLine?: boolean;
  /** Whether to show the status bar at the top */
  showStatus?: boolean;
  /** Custom status text during generation */
  statusText?: string;
  /** Trigger the animation (useful for re-triggering) */
  trigger?: boolean;
  /** Glow color during generation */
  glowColor?: string;
}

export function AIStreamWrapper({
  children,
  startDelay = 500,
  staggerDelay = 200,
  dissolveDuration = 600,
  showScanLine = true,
  showStatus = true,
  statusText = "Generating interface",
  trigger = true,
  glowColor = "99, 102, 241", // indigo RGB
  className,
  ...props
}: AIStreamWrapperProps) {
  const [phase, setPhase] = useState<"idle" | "generating" | "complete">("idle");
  const [revealedCount, setRevealedCount] = useState(0);
  const childArray = Children.toArray(children);
  const totalChildren = childArray.length;

  // Reset and start generation when trigger changes
  useEffect(() => {
    if (!trigger) {
      setPhase("idle");
      setRevealedCount(0);
      return;
    }

    setPhase("idle");
    setRevealedCount(0);

    const startTimer = setTimeout(() => {
      setPhase("generating");
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [trigger, startDelay]);

  // Stagger reveal children one by one
  useEffect(() => {
    if (phase !== "generating") return;

    if (revealedCount >= totalChildren) {
      const completeTimer = setTimeout(() => {
        setPhase("complete");
      }, dissolveDuration);
      return () => clearTimeout(completeTimer);
    }

    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, staggerDelay);

    return () => clearTimeout(timer);
  }, [phase, revealedCount, totalChildren, staggerDelay, dissolveDuration]);

  const isGenerating = phase === "generating";
  const isComplete = phase === "complete";

  return (
    <div
      className={cn("relative w-full", className)}
      {...props}
    >
      {/* Status Bar */}
      <AnimatePresence>
        {showStatus && isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 mb-4 px-1"
          >
            {/* Pulsing dot */}
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: `rgb(${glowColor})` }}
            />
            {/* Typing status text */}
            <span className="text-sm font-mono text-zinc-400">
              {statusText}
              <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
              >
                _
              </motion.span>
            </span>
            {/* Progress counter */}
            <span className="text-xs font-mono text-zinc-600 ml-auto tabular-nums">
              {revealedCount}/{totalChildren}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children Container */}
      <div className="relative">
        {/* Scanning Line */}
        <AnimatePresence>
          {showScanLine && isGenerating && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{
                top: { duration: totalChildren * (staggerDelay / 1000) + 0.5, ease: "linear" },
                opacity: { duration: 0.3 },
              }}
              className="absolute left-0 right-0 z-30 pointer-events-none h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, rgb(${glowColor}), transparent)`,
                boxShadow: `0 0 20px 4px rgba(${glowColor}, 0.4), 0 0 60px 8px rgba(${glowColor}, 0.15)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Render each child with the dissolve effect */}
        {childArray.map((child, index) => {
          const isRevealed = index < revealedCount;
          const isCurrentlyRevealing = index === revealedCount - 1 && isGenerating;

          return (
            <div key={index} className="relative">
              {/* The actual content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isRevealed || isComplete ? 1 : 0,
                  filter: isCurrentlyRevealing
                    ? "blur(0px)"
                    : isRevealed || isComplete
                    ? "blur(0px)"
                    : "blur(8px)",
                }}
                transition={{
                  opacity: { duration: dissolveDuration / 1000, ease: "easeOut" },
                  filter: { duration: dissolveDuration / 1000, ease: "easeOut" },
                }}
              >
                {child}
              </motion.div>

              {/* Skeleton placeholder (visible before reveal) */}
              <AnimatePresence>
                {!isRevealed && !isComplete && phase !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-10 overflow-hidden rounded-lg pointer-events-none"
                  >
                    {/* Skeleton shimmer */}
                    <div
                      className="w-full h-full rounded-lg"
                      style={{
                        background: `linear-gradient(90deg, rgba(${glowColor}, 0.03) 0%, rgba(${glowColor}, 0.08) 50%, rgba(${glowColor}, 0.03) 100%)`,
                        backgroundSize: "200% 100%",
                        animation: "ai-shimmer 1.5s ease-in-out infinite",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Edge glow during reveal */}
              <AnimatePresence>
                {isCurrentlyRevealing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-20 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 20px rgba(${glowColor}, 0.15), 0 0 30px rgba(${glowColor}, 0.1)`,
                      border: `1px solid rgba(${glowColor}, 0.2)`,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Inject keyframes */}
      <style jsx global>{`
        @keyframes ai-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
