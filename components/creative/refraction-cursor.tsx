"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RefractionCursorProps {
  imageUrl: string;
  children: React.ReactNode;
  lensSize?: number;
  magnification?: number;
  className?: string;
}

export function RefractionCursor({
  imageUrl,
  children,
  lensSize = 250,
  magnification = 1.5,
  className
}: RefractionCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>

      {/* The Lens */}
      <motion.div
        className="absolute top-0 left-0 z-20 rounded-full pointer-events-none overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.2)]"
        style={{
          width: lensSize,
          height: lensSize,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: "blur(10px)", // Adds the glass effect to anything underneath
          WebkitBackdropFilter: "blur(10px)",
        }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* The Magnified Background Image */}
        {/* We map the background position inversely to the mouse position to keep it perfectly aligned, then scale it up */}
        <motion.div
          className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            // Formula to keep the image perfectly aligned while scaling inside a moving container
            backgroundPositionX: useMotionValue(0), // We'll compute this inline if needed, but a simpler way is using CSS transform
            backgroundSize: `${containerRef.current?.clientWidth || 1000}px ${containerRef.current?.clientHeight || 1000}px`,
          }}
        />
        {/* Actually, mapping background position dynamically via framer motion inside the lens is tricky because we need the container dimensions.
            A more elegant and CSS-native way to achieve true DOM-agnostic glass refraction without duplicating images is: 
            mix-blend-mode tricks or feDisplacementMap. Since we have the image URL, duplicating it is easiest.
            Let's use a nested motion div to counter-move the image. */}
        <motion.div
          className="absolute top-0 left-0 pointer-events-none origin-center"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // Pin the image exactly to the background by counter-moving the lens position
            x: useTransform(smoothX, (x) => -x + lensSize / 2),
            y: useTransform(smoothY, (y) => -y + lensSize / 2),
            scale: magnification,
          }}
        />
        
        {/* Lens Glare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 z-10 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
