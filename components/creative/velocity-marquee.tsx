"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from "framer-motion";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  itemClassName?: string;
  repeatCount?: number;
}

export function VelocityMarquee({
  children,
  baseVelocity = 2,
  className,
  itemClassName,
  repeatCount = 4,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity so the marquee doesn't jerk violently
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // If scrolling up or down, change direction of marquee movement
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Add scroll velocity to the base speed
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap flex m-0 relative", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} className={cn("flex shrink-0 items-center", itemClassName)}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
