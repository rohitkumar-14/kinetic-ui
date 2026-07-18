"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyStackingCardProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  className?: string;
}

export function StickyStackingCard({ children, index, totalCards, className }: StickyStackingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Track from when the top of this card hits the top of the viewport,
    // to when the top of the next card hits the top of the viewport.
    // By default, offset: ['start start', 'end start'] works well if the container height is 100vh.
    // To allow the next card to overlap, we set height to 100vh and position to sticky.
    offset: ["start start", "end start"]
  });

  // Calculate top margin based on index to create a stacked look
  const topOffset = `calc(${index * 2}vh + 20px)`;
  
  // The card scales down and dims as you scroll past it, creating depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // slight push up

  return (
    <div 
      ref={containerRef} 
      className={cn("sticky h-screen flex items-center justify-center overflow-hidden", className)}
      style={{ top: topOffset }}
    >
      <motion.div 
        style={{ scale, opacity, y }} 
        className="w-full h-[80vh] flex flex-col justify-center origin-top relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
