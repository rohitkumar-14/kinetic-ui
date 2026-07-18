"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimationFrame } from "framer-motion";

export type SpotlightVariant = "soft" | "strong" | "ring" | "pulse";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** The color of the spotlight. Default: "rgba(99, 102, 241, 0.15)" */
  spotlightColor?: string;
  /** An alias for spotlightColor */
  color?: string;
  /** Size multiplier for the spotlight. Default: 1 */
  scale?: number;
  /** Visual variant of the spotlight. Default: "soft" */
  variant?: SpotlightVariant;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(99, 102, 241, 0.15)",
  color,
  scale = 1,
  variant = "soft",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // For the pulse variant
  const timeRef = useRef(0);
  const [pulseRadius, setPulseRadius] = useState(0);

  useAnimationFrame((t, delta) => {
    if (variant === "pulse" && opacity > 0) {
      timeRef.current += delta;
      // Oscillate between 0.8 and 1.2
      const sine = Math.sin(timeRef.current / 400);
      setPulseRadius(sine * 0.2 + 1);
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const activeColor = color
    ? color.startsWith("#")
      ? `${color}25`
      : color
    : spotlightColor;

  const baseRadius = scale * 600;
  const currentRadius = variant === "pulse" ? baseRadius * pulseRadius : baseRadius;

  let gradientString = "";
  switch (variant) {
    case "strong":
      gradientString = `radial-gradient(${currentRadius * 0.7}px circle at ${position.x}px ${position.y}px, ${activeColor}, transparent 70%)`;
      break;
    case "ring":
      gradientString = `radial-gradient(${currentRadius}px circle at ${position.x}px ${position.y}px, transparent 20%, ${activeColor} 40%, transparent 60%)`;
      break;
    case "soft":
    case "pulse":
    default:
      gradientString = `radial-gradient(${currentRadius}px circle at ${position.x}px ${position.y}px, ${activeColor}, transparent 40%)`;
      break;
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-colors hover:border-border",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: gradientString,
        }}
      />
      {children}
    </div>
  );
}
