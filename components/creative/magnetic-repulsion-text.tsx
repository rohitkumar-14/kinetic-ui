"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticRepulsionTextProps {
  text: string;
  className?: string;
  threshold?: number;
}

export function MagneticRepulsionText({
  text,
  className,
  threshold = 100, // Distance at which letters start running away
}: MagneticRepulsionTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };

  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative flex flex-wrap", className)}
    >
      {letters.map((letter, i) => (
        <RepellingLetter
          key={i}
          letter={letter}
          mouseX={mouseX}
          mouseY={mouseY}
          threshold={threshold}
        />
      ))}
    </div>
  );
}

function RepellingLetter({
  letter,
  mouseX,
  mouseY,
  threshold,
}: {
  letter: string;
  mouseX: any;
  mouseY: any;
  threshold: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  // Recalculate center position on mount
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  // Motion values for the actual physical offset of the letter
  const xOffset = useMotionValue(0);
  const yOffset = useMotionValue(0);

  // Apply high tension springs so they snap back violently
  const springX = useSpring(xOffset, { stiffness: 400, damping: 20 });
  const springY = useSpring(yOffset, { stiffness: 400, damping: 20 });

  // On every render/motion update, we calculate the distance to mouse manually using onChange
  useEffect(() => {
    const unsubX = mouseX.on("change", (latestX: number) => {
      const latestY = mouseY.get();
      if (latestX === Infinity || latestY === Infinity) {
        xOffset.set(0);
        yOffset.set(0);
        return;
      }

      const dx = center.x - latestX;
      const dy = center.y - latestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold && distance > 0) {
        // Run away! Inverse proportional to distance
        const force = (threshold - distance) / threshold; // 0 to 1
        const pushX = (dx / distance) * force * 50; // max push 50px
        const pushY = (dy / distance) * force * 50; // max push 50px
        
        xOffset.set(pushX);
        yOffset.set(pushY);
      } else {
        xOffset.set(0);
        yOffset.set(0);
      }
    });
    
    // We only need to subscribe to one axis, as they update simultaneously from the mouse event
    return () => {
      unsubX();
    };
  }, [mouseX, mouseY, center, threshold, xOffset, yOffset]);

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block whitespace-pre"
    >
      {letter}
    </motion.span>
  );
}
