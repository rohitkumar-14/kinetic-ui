"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PortalItem {
  id: string;
  title: string;
  videoUrl: string;
  category: string;
}

export interface VideoPortalProps {
  items: PortalItem[];
  className?: string;
  portalSize?: number;
}

export function VideoPortal({ items, className, portalSize = 300 }: VideoPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<PortalItem | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full py-20 px-8 cursor-crosshair", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between border-b border-white/10 pb-6 cursor-pointer"
            onMouseEnter={() => {
              setActiveItem(item);
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setActiveItem(null);
              setIsHovering(false);
            }}
          >
            <h3 className={cn(
              "text-4xl md:text-6xl font-black transition-all duration-500 tracking-tighter uppercase",
              isHovering && activeItem?.id !== item.id ? "text-white/20 blur-[2px]" : "text-white/50",
              isHovering && activeItem?.id === item.id ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] scale-105 origin-left" : ""
            )}>
              {item.title}
            </h3>
            <span className={cn(
              "text-sm font-mono transition-colors duration-500",
              isHovering && activeItem?.id !== item.id ? "text-zinc-700" : "text-zinc-500",
              isHovering && activeItem?.id === item.id ? "text-indigo-400 font-bold" : ""
            )}>
              {item.category}
            </span>
          </div>
        ))}
      </div>

      {/* The Video Portal */}
      <motion.div
        className="absolute top-0 left-0 z-0 pointer-events-none overflow-hidden bg-black flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        style={{
          width: portalSize,
          height: portalSize,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          // Animate the border radius to look organic and liquid
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "40% 60% 70% 30% / 40% 50% 60% 50%"
          ],
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
          borderRadius: { duration: 4, repeat: Infinity, ease: "linear" }
        }}
      >
        {activeItem && (
          <motion.video
            key={activeItem.id}
            src={activeItem.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover scale-150"
          />
        )}
        
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-10 rounded-full" />
      </motion.div>
    </div>
  );
}
