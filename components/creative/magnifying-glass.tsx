"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagnifyingGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The base layout to be revealed underneath the lens */
  mainContent: React.ReactNode;
  /** The secret/alternate layout to be revealed inside the lens */
  lensContent: React.ReactNode;
  /** Radius of the magnifying glass in pixels */
  lensSize?: number;
  /** Smoothing factor for the lens movement. Higher = more delayed/smooth */
  smoothing?: number;
  /** Optional class for the lens ring */
  lensClassName?: string;
}

export function MagnifyingGlass({
  mainContent,
  lensContent,
  lensSize = 150,
  smoothing = 0.15,
  lensClassName,
  className,
  ...props
}: MagnifyingGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // We use springs for incredibly smooth cursor tracking
  const mouseX = useSpring(0, { stiffness: 300, damping: 30, mass: smoothing * 10 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30, mass: smoothing * 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Derive mask positions dynamically without React re-renders or custom update loops
  const maskPositionX = useTransform(mouseX, (x) => `${x - lensSize / 2}px`);
  const maskPositionY = useTransform(mouseY, (y) => `${y - lensSize / 2}px`);
  const maskPosition = useMotionTemplate`${maskPositionX} ${maskPositionY}`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Base Layer */}
      <div className="w-full h-full relative z-0 select-none">
        {mainContent}
      </div>

      {/* Secret Layer (Clipped by the Lens) */}
      <motion.div
        className="absolute inset-0 z-10 select-none pointer-events-none"
        style={{
          // We use a CSS mask-image with a radial gradient to clip the content perfectly
          maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
          maskSize: `${lensSize}px ${lensSize}px`,
          WebkitMaskSize: `${lensSize}px ${lensSize}px`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          // Bind the dynamic motion template directly
          maskPosition: maskPosition as any,
          WebkitMaskPosition: maskPosition as any,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {lensContent}
      </motion.div>

      {/* The visible glass ring following the cursor */}
      <motion.div
        className={cn(
          "absolute pointer-events-none z-20 rounded-full border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1),_0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-[2px]",
          lensClassName
        )}
        style={{
          width: lensSize,
          height: lensSize,
          x: mouseX,
          y: mouseY,
          // Offset by half size to center on cursor
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.3, type: "spring" }
        }}
      />
    </div>
  );
}
