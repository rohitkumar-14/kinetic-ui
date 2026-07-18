"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface VelocityScrollProps {
  text: string;
  defaultVelocity?: number;
  className?: string;
}

export function ScrollVelocityText({ text, defaultVelocity = 5, className }: VelocityScrollProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Velocity multiplier for speed
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  
  // Subtle skew effect for a kinetic typography feel
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * defaultVelocity * (delta / 1000);

    // Reverse direction if scrolling up
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <motion.div
        className="flex whitespace-nowrap flex-nowrap"
        style={{ x, skewX }}
      >
        {/* We render the text multiple times to ensure seamless looping */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span 
            key={i} 
            className="block mr-12 text-6xl md:text-8xl font-black uppercase tracking-tighter shrink-0"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
