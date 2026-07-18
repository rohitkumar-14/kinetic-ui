"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularTextProps {
  text: string;
  radius?: number;
  baseVelocity?: number;
  className?: string;
}

export function CircularText({
  text,
  radius = 150,
  baseVelocity = 0.5,
  className
}: CircularTextProps) {
  // Ensure the text is long enough to form a nice circle, pad with spaces if needed
  const characters = text.split("");
  const totalChars = characters.length;
  const degreePerChar = 360 / totalChars;

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Transform scroll velocity into a rotation speed multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const baseRotation = useMotionValue(0);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 16); // normalized to 60fps

    // Reverse direction based on scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Add scroll velocity to base rotation
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    // Keep rotation between 0 and 360 to prevent numbers getting too large over time
    const newRotation = (baseRotation.get() + moveBy) % 360;
    baseRotation.set(newRotation);
  });

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)} style={{ minHeight: radius * 2.5 }}>
      {/* 3D Perspective Container */}
      <div className="relative perspective-[1000px] flex items-center justify-center w-full h-full">
        {/* The Rotating Ring */}
        <motion.div
          className="relative flex items-center justify-center preserve-3d"
          style={{
            rotateZ: baseRotation,
            // Add a slight 3D tilt that intensifies with scroll velocity
            rotateX: useTransform(smoothVelocity, [-1000, 0, 1000], [60, 45, 60]),
            rotateY: useTransform(smoothVelocity, [-1000, 0, 1000], [-20, 0, 20]),
          }}
        >
          {characters.map((char, index) => {
            const rotate = index * degreePerChar;
            return (
              <motion.span
                key={index}
                className="absolute text-4xl md:text-5xl font-black uppercase text-white tracking-widest origin-bottom"
                style={{
                  transform: `rotate(${rotate}deg) translateY(-${radius}px)`,
                  // Optional: add text shadow for better 3D depth perception
                  textShadow: "0 10px 20px rgba(0,0,0,0.5)"
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
