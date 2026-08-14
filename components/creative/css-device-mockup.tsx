"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CssDeviceMockupProps {
  children: React.ReactNode;
  className?: string;
  mockupWidth?: number;
}

export function CssDeviceMockup({ children, className, mockupWidth = 300 }: CssDeviceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize to -0.5 to 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const ratio = 19.5 / 9; // iPhone aspect ratio
  const height = mockupWidth * ratio;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative flex items-center justify-center w-full h-[600px] perspective-[1200px]", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          width: mockupWidth,
          height: height,
        }}
        className="relative preserve-3d"
      >
        {/* Device Chassis (The outer metal frame) */}
        <div className="absolute inset-0 bg-zinc-800 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_2px_#3f3f46,inset_0_0_0_8px_#18181b] translate-z-[-10px]" />
        
        {/* The Screen Bezel */}
        <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden translate-z-[1px] shadow-[inset_0_0_0_4px_#000]">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2">
            {/* Camera dot */}
            <div className="w-3 h-3 bg-zinc-900 rounded-full border border-zinc-800" />
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
          </div>

          {/* User Screen Content */}
          <div className="absolute inset-0 z-10 w-full h-full bg-white mt-10 rounded-t-3xl overflow-y-auto hide-scrollbar">
            {children}
          </div>

          {/* Glossy Screen Glare */}
          <div className="absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />
        </div>

      </motion.div>
    </div>
  );
}
