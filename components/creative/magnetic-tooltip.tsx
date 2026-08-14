"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticTooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  className?: string;
  tooltipClassName?: string;
}

export function MagneticTooltip({
  children,
  content,
  className,
  tooltipClassName,
}: MagneticTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Mouse position relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics springs for smooth, magnetic movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  // Calculate velocity for stretching effect
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  
  useEffect(() => {
    let lastX = springX.get();
    let lastY = springY.get();
    let lastTime = Date.now();

    const unsubscribeX = springX.on("change", (v) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      velocityX.set((v - lastX) / dt);
      lastX = v;
      lastTime = now;
    });

    const unsubscribeY = springY.on("change", (v) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      velocityY.set((v - lastY) / dt);
      lastY = v;
      lastTime = now;
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY, velocityX, velocityY]);

  // Transform velocity into rotation and scale (squash & stretch)
  const stretchX = useTransform(velocityX, [-5, 0, 5], [1.2, 1, 1.2]);
  const stretchY = useTransform(velocityY, [-5, 0, 5], [1.2, 1, 1.2]);
  const rotation = useTransform(velocityX, [-5, 5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !tooltipRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Center the tooltip on the cursor
    const x = e.clientX - rect.left - tooltipRect.width / 2;
    // Offset above the cursor
    const y = e.clientY - rect.top - tooltipRect.height - 20;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "absolute top-0 left-0 z-50 pointer-events-none px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow-xl border border-white/10 whitespace-nowrap",
              tooltipClassName
            )}
            style={{
              x: springX,
              y: springY,
              scaleX: stretchX,
              scaleY: stretchY,
              rotate: rotation,
              transformOrigin: "bottom center",
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
