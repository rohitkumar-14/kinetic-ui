"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export interface MagneticTextProps {
  text: string;
  className?: string;
  strength?: number; // How far the letters pull
}

export function MagneticText({ text, className = "", strength = 30 }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Split text into characters, keeping spaces intact
  const characters = text.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the container
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center justify-center cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((char, index) => {
        if (char === " ") {
          return <span key={index} className="w-2 md:w-3 inline-block" />;
        }
        return (
          <MagneticChar
            key={index}
            char={char}
            mouseX={mouseX}
            mouseY={mouseY}
            strength={strength}
            index={index}
            totalChars={characters.length}
          />
        );
      })}
    </div>
  );
}

// Inner component for each character to handle its own physics
interface MagneticCharProps {
  char: string;
  mouseX: import("framer-motion").MotionValue<number>;
  mouseY: import("framer-motion").MotionValue<number>;
  strength: number;
  index: number;
  totalChars: number;
}

function MagneticChar({ char, mouseX, mouseY, strength, index, totalChars }: MagneticCharProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // We add a slight stiffness variance based on index so they don't all move perfectly in sync
  const stiffness = 150 + (index % 3) * 50;
  const damping = 15;

  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  // The further from the center (index vs totalChars/2), the slightly different the pull could be, 
  // but for simplicity we just map the global mouse container distance to the char's transform.
  // A true magnetic text effect checks the mouse distance from the specific *character*, 
  // but since we only have window mouse events, we approximate by letting the whole text block pull.
  
  // Let's make it more authentic: calculate local distance for THIS character.
  // We can't do that easily without a rAF loop or attaching mouse events to the window and checking bounds.
  // Instead, we just map the container's mouse distance with a slight intensity reduction for outer chars.
  
  // Normalized distance from center (-1 to 1)
  const normalizedIndex = (index - totalChars / 2) / (totalChars / 2);
  
  const x = useTransform(springX, (val: number) => {
    // Letters closer to the mouse (which is currently tracked as center of container) pull more? 
    // Just a simple translation based on mouse X/Y scaled by strength.
    return (val / 100) * strength;
  });

  const y = useTransform(springY, (val: number) => {
    return (val / 100) * strength;
  });

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className="inline-block transition-colors hover:text-primary"
    >
      {char}
    </motion.span>
  );
}
