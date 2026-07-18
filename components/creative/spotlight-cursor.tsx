"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SpotlightEffect = "glow" | "reveal" | "border" | "gradient" | "halo";

interface SpotlightCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Spotlight diameter in px. Default: 400 */
  spotlightSize?: number;
  /** Spotlight color as rgba or hex. Default: "rgba(255,255,255,0.15)" */
  spotlightColor?: string;
  /** Visual effect style. Default: "glow" */
  effect?: SpotlightEffect;
  /** Accent color used by some effects (hex). Default: "#818cf8" */
  color?: string;
}

export function SpotlightCursor({
  children,
  className,
  spotlightSize = 400,
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  effect = "glow",
  color = "#818cf8",
  ...props
}: SpotlightCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // ── Build the spotlight background per effect ──────────────────────────────
  const getSpotlightStyle = (): React.CSSProperties => {
    const { x, y } = position;
    const size = spotlightSize;

    switch (effect) {
      case "glow":
        return {
          background: `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`,
        };

      case "reveal":
        return {
          background: `radial-gradient(${size}px circle at ${x}px ${y}px, transparent 20%, rgba(0,0,0,0.85) 60%)`,
          mixBlendMode: "darken" as const,
        };

      case "border":
        return {
          background: `radial-gradient(${size * 0.6}px circle at ${x}px ${y}px, ${color}30, transparent 50%)`,
          WebkitMaskImage: `radial-gradient(${size}px circle at ${x}px ${y}px, black 30%, transparent 60%)`,
          maskImage: `radial-gradient(${size}px circle at ${x}px ${y}px, black 30%, transparent 60%)`,
        };

      case "gradient":
        return {
          background: `
            radial-gradient(${size * 0.8}px circle at ${x}px ${y}px, ${color}25 0%, transparent 50%),
            radial-gradient(${size * 1.2}px circle at ${x}px ${y}px, ${color}10 0%, transparent 60%)
          `,
        };

      case "halo":
        return {
          background: `
            radial-gradient(${size * 0.3}px circle at ${x}px ${y}px, transparent 50%, ${color}15 60%, transparent 70%),
            radial-gradient(${size * 0.6}px circle at ${x}px ${y}px, transparent 50%, ${color}08 60%, transparent 70%)
          `,
        };

      default:
        return {
          background: `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`,
        };
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden group", className)}
      {...props}
    >
      {/* Spotlight layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={getSpotlightStyle()}
      />
      {/* Content layer */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
