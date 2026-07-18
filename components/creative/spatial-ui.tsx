"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// --------------------------------------------------------------------------
// SPATIAL CARD (VisionOS Style)
// --------------------------------------------------------------------------

interface SpatialCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // How far the content pushes out in 3D
}

export function SpatialCard({ children, className, depth = 30 }: SpatialCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse coordinates (normalized -1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-1, 1], [15, -15]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-15, 15]), { stiffness: 400, damping: 30 });

  // Spring for the glare effect position
  const glareX = useSpring(useTransform(x, [-1, 1], [100, 0]), { stiffness: 400, damping: 30 });
  const glareY = useSpring(useTransform(y, [-1, 1], [100, 0]), { stiffness: 400, damping: 30 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -1 -> 1
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      className={cn("relative perspective-[2000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{
          rotateX,
          rotateY,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? "0 40px 80px -20px rgba(0,0,0,0.5)" 
            : "0 20px 40px -10px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glassmorphic Base */}
        <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl rounded-3xl overflow-hidden" />
        
        {/* Dynamic Specular Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`,
            opacity: isHovered ? 1 : 0,
            x: useTransform(glareX, (v) => `${v}%`),
            y: useTransform(glareY, (v) => `${v}%`),
            translateX: "-50%",
            translateY: "-50%",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* 3D Content Container */}
        <motion.div 
          className="relative w-full h-full p-8"
          style={{ translateZ: depth }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// --------------------------------------------------------------------------
// SPATIAL BUTTON (VisionOS Style)
// --------------------------------------------------------------------------

interface SpatialButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export function SpatialButton({ children, className, ...props }: SpatialButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-1, 1], [20, -20]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-20, 20]), { stiffness: 400, damping: 25 });
  
  // The button actually physically moves slightly towards the cursor (magnetic pull)
  const translateX = useSpring(useTransform(x, [-1, 1], [-10, 10]), { stiffness: 400, damping: 25 });
  const translateY = useSpring(useTransform(y, [-1, 1], [-10, 10]), { stiffness: 400, damping: 25 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1000px] inline-block relative">
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative px-6 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-xl text-white font-medium preserve-3d group overflow-hidden",
          className
        )}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        <span className="relative z-10 block" style={{ transform: "translateZ(10px)" }}>
          {children}
        </span>
        
        {/* Highlight flare */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.5s ease-in-out",
          }}
        />
      </motion.button>
    </div>
  );
}
