"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ShinyVariant = "standard" | "slow" | "fast" | "pulse";

interface ShinyTextProps {
  /** The text string to animate */
  text: string;
  className?: string;
  /** Custom speed (duration in seconds). Overrides variant default if provided. */
  speed?: number;
  /** Width of the shimmer effect. Default: 100 */
  shimmerWidth?: number;
  /** The animation preset. Default: "standard" */
  variant?: ShinyVariant;
}

const VARIANTS: Record<ShinyVariant, { duration: number; ease: "linear" | "easeInOut" }> = {
  standard: { duration: 3, ease: "linear" },
  slow: { duration: 6, ease: "linear" },
  fast: { duration: 1.5, ease: "linear" },
  pulse: { duration: 2, ease: "easeInOut" },
};

export const ShinyText = ({ 
  text, 
  className, 
  speed, 
  shimmerWidth = 100,
  variant = "standard"
}: ShinyTextProps) => {
  
  const config = VARIANTS[variant];
  const finalDuration = speed || config.duration;

  // Pulse variant uses a different animation pattern
  if (variant === "pulse") {
    return (
      <div className={cn("inline-block overflow-hidden", className)}>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: finalDuration,
            ease: config.ease,
          }}
          style={{
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
          }}
          className="font-medium inline-block text-white"
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // Standard sliding gradient
  return (
    <div className={cn("text-slate-400 inline-block overflow-hidden", className)}>
      <motion.div
        initial={{ backgroundPosition: "200% center" }}
        animate={{ backgroundPosition: "-200% center" }}
        transition={{
          repeat: Infinity,
          duration: finalDuration,
          ease: config.ease,
        }}
        style={{
          backgroundSize: "200% auto",
          backgroundImage: `linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundColor: "currentColor",
          WebkitTextFillColor: "transparent",
        }}
        className="font-medium inline-block"
      >
        {text}
      </motion.div>
    </div>
  );
};
