"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PluckableStringProps {
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
}

export function PluckableString({
  className,
  strokeWidth = 2,
  strokeColor = "rgba(255, 255, 255, 0.4)",
}: PluckableStringProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // y position of the string center
  const y = useMotionValue(50);
  const [isHovered, setIsHovered] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playPluckSound = (pullDistance: number) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;
      
      // The further you pull it, the higher the tension/pitch
      const baseFreq = 200;
      const pitchOffset = Math.abs(pullDistance - 50) * 2;
      
      osc.type = "triangle"; // Triangle sounds a bit like a string
      osc.frequency.setValueAtTime(baseFreq + pitchOffset, now);
      // Slight pitch bend down as it vibrates
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.5);

      // Snappy attack, long bouncy decay
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.8, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.error("Web Audio API error", e);
    }
  };

  // An underdamped, highly bouncy spring to simulate the "pluck" vibration
  const springY = useSpring(y, {
    stiffness: 500,
    damping: 5,   // low damping = lots of wobble
    mass: 1,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative Y position, clamped slightly
    const relativeY = e.clientY - rect.top;
    y.set(relativeY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Play the twang sound based on how far we pulled it
    playPluckSound(y.get());
    
    // Snap back to center (50) to trigger the massive spring vibration
    y.set(50);
    setIsHovered(false);
  };

  // Convert the spring Y value into an SVG Quadratic Bezier Curve
  // M 0,50 Q 50,Y 100,50
  const path = useTransform(springY, (latestY: number) => {
    // Clamp the deformation so it doesn't break out of the SVG box
    const clampedY = Math.max(0, Math.min(100, latestY));
    return `M 0,50 Q 50,${clampedY} 100,50`;
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full h-24 flex items-center justify-center cursor-crosshair", className)}
    >
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        <motion.path
          d={path as any}
          stroke={isHovered ? "#fff" : strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className="transition-colors duration-200"
        />
      </motion.svg>
    </div>
  );
}
