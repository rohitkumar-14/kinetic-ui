"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type ScrollProgressTheme = "cyber" | "emerald" | "ember" | "sunset" | "white";

interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "bar" | "circle";
  theme?: ScrollProgressTheme;
  height?: number; // For bar height in px. Default: 4
  size?: number; // For circle size in px. Default: 48
  strokeWidth?: number; // For circle stroke in px. Default: 4
  glow?: boolean;
  scrollToTop?: boolean; // For circle click behavior
  hideAtTop?: boolean; // Hide when scroll is at 0
}

const THEME_COLORS: Record<
  ScrollProgressTheme,
  {
    barBg: string;
    stroke: string;
    glow: string;
  }
> = {
  cyber: {
    barBg: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
    stroke: "#ec4899",
    glow: "rgba(236, 72, 153, 0.5)"
  },
  emerald: {
    barBg: "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)",
    stroke: "#10b981",
    glow: "rgba(16, 185, 129, 0.5)"
  },
  ember: {
    barBg: "linear-gradient(90deg, #f97316 0%, #ef4444 100%)",
    stroke: "#ef4444",
    glow: "rgba(239, 44, 68, 0.5)"
  },
  sunset: {
    barBg: "linear-gradient(90deg, #eab308 0%, #f43f5e 100%)",
    stroke: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.5)"
  },
  white: {
    barBg: "linear-gradient(90deg, #ffffff 0%, #a1a1aa 100%)",
    stroke: "#ffffff",
    glow: "rgba(255, 255, 255, 0.3)"
  }
};

export function ScrollProgress({
  variant = "bar",
  theme = "cyber",
  height = 4,
  size = 48,
  strokeWidth = 4,
  glow = true,
  scrollToTop = true,
  hideAtTop = true,
  className,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);

  // Apply a smooth spring transition to the scroll percentage
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const colors = THEME_COLORS[theme];

  // Track if page is scrolled past start point
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 40);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (!scrollToTop) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render Bar Variant ──
  if (variant === "bar") {
    return (
      <motion.div
        className={cn("fixed top-0 left-0 right-0 z-50 origin-left", className)}
        style={{
          height: height,
          background: colors.barBg,
          boxShadow: glow ? `0 1px 10px ${colors.glow}` : "none",
          scaleX: scaleX
        }}
        {...props}
      />
    );
  }

  // ── Render Circle Variant ──
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      onClick={handleScrollToTop}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: hideAtTop && isAtTop ? 0 : 1,
        scale: hideAtTop && isAtTop ? 0.6 : 1,
        pointerEvents: hideAtTop && isAtTop ? "none" : "auto"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full bg-zinc-950/80 border border-white/10 hover:border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all group",
        className
      )}
      style={{
        width: size,
        height: size,
        boxShadow: glow ? `0 4px 20px ${colors.glow}` : "none"
      }}
      {...props}
    >
      <svg
        className="absolute -rotate-90 transform w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track circle (background) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      {/* Center Icon (Arrow Up or scroll-to-top hook) */}
      <ArrowUp className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors duration-200" />
    </motion.div>
  );
}
