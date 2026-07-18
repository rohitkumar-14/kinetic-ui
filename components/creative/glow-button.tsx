"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUXSounds } from "@/hooks/use-ux-sounds";

export type GlowVariant = "center" | "edge" | "pulse";

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  /** The color of the glow effect. Default: "rgba(139, 92, 246, 0.5)" */
  glowColor?: string;
  withSound?: boolean;
  /** The interaction variant. Default: "center" */
  variant?: GlowVariant;
}

export function GlowButton({
  children,
  glowColor = "rgba(139, 92, 246, 0.5)",
  className,
  withSound = false,
  variant = "center",
  ...props
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const { playSound } = useUXSounds();
  
  // For pulse variant
  const timeRef = useRef(0);
  const [pulseRadius, setPulseRadius] = useState(1);

  useAnimationFrame((t, delta) => {
    if (variant === "pulse" && opacity > 0) {
      timeRef.current += delta;
      const sine = Math.sin(timeRef.current / 300);
      setPulseRadius(sine * 0.15 + 1); // Oscillate between 0.85 and 1.15
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(1);
    if (withSound) playSound("pop");
    if (props.onMouseEnter) props.onMouseEnter(e as any);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(0);
    if (props.onMouseLeave) props.onMouseLeave(e as any);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withSound) playSound("click");
    if (props.onClick) props.onClick(e as any);
  };

  let backgroundStyle = "";
  const baseRadius = 100;
  
  if (variant === "edge") {
    backgroundStyle = `radial-gradient(${baseRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 50%)`;
  } else if (variant === "pulse") {
    backgroundStyle = `radial-gradient(${baseRadius * pulseRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`;
  } else {
    // center
    backgroundStyle = `radial-gradient(${baseRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`;
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-full bg-black px-8 py-4 font-semibold text-white outline-none transition-colors",
        variant !== "edge" && "border border-white/10",
        className
      )}
      {...props}
    >
      {/* Background glow layer */}
      {variant !== "edge" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{ opacity, background: backgroundStyle }}
        />
      )}
      
      {/* Edge border glow layer */}
      {variant === "edge" && (
        <>
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
            style={{ opacity, background: backgroundStyle }}
          />
          <div className="absolute inset-[1px] bg-black rounded-full z-[1]" />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </motion.button>
  );
}
