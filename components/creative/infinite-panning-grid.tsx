"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InfinitePanningGridProps {
  items: React.ReactNode[];
  className?: string;
  speed?: number;
}

export function InfinitePanningGrid({ items, className, speed = 0.5 }: InfinitePanningGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor position relative to window center
      const x = (e.clientX - window.innerWidth / 2) * speed;
      const y = (e.clientY - window.innerHeight / 2) * speed;
      
      // Update targets. We subtract because moving mouse right should pan grid left.
      // We don't use absolute positioning mapping, we just accumulate or set offset.
      // Wait, an actual infinite pan requires a requestAnimationFrame loop that accumulates velocity 
      // based on how far the mouse is from the center. Let's do that.
    };

    // We'll use a rAF loop instead for continuous infinite panning.
  }, [speed]);

  // Actually, to make it truly infinite without a complex WebGL shader, 
  // we accumulate X and Y based on mouse distance from center in a rAF loop.
  // Then we use the modulo operator on the transform to wrap it perfectly.

  const xOffset = useRef(0);
  const yOffset = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  // We need to know the exact dimensions of one grid "tile" to know when to wrap.
  // For simplicity, we assume the tile is fixed size, e.g. 1200x1200.
  const TILE_SIZE = 1200;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // distance from center [-1, 1]
      targetX.current = ((e.clientX / window.innerWidth) - 0.5) * 2;
      targetY.current = ((e.clientY / window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const loop = () => {
      // Max speed is say 5px per frame
      const maxSpeed = 5 * speed;
      xOffset.current -= targetX.current * maxSpeed;
      yOffset.current -= targetY.current * maxSpeed;

      // Wrap the offsets
      if (xOffset.current < -TILE_SIZE) xOffset.current += TILE_SIZE;
      if (xOffset.current > 0) xOffset.current -= TILE_SIZE;
      
      if (yOffset.current < -TILE_SIZE) yOffset.current += TILE_SIZE;
      if (yOffset.current > 0) yOffset.current -= TILE_SIZE;

      mouseX.set(xOffset.current);
      mouseY.set(yOffset.current);

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, speed]);

  if (!mounted) return null;

  // We render a 2x2 grid of the identical items. 
  // Since we wrap at TILE_SIZE, as long as the container is smaller than TILE_SIZE, 2x2 is enough to cover the screen seamlessly.
  // We'll make the tile size 1200px.

  const renderTile = (keySuffix: string) => (
    <div 
      className="absolute top-0 left-0 w-[1200px] h-[1200px] grid grid-cols-3 grid-rows-3 gap-4 p-4"
      key={keySuffix}
    >
      {items.map((item, i) => (
        <div key={`${keySuffix}-${i}`} className="w-full h-full rounded-2xl overflow-hidden relative">
           {item}
        </div>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={cn("w-full h-[80vh] relative overflow-hidden bg-background cursor-crosshair", className)}
    >
      {/* 
        We use motion.div to apply the wrapped X and Y translations.
        Because we need a 2x2 grid to wrap smoothly, we offset the clones.
      */}
      <motion.div 
        className="absolute top-0 left-0 w-[1200px] h-[1200px]"
        style={{ x: mouseX, y: mouseY }}
      >
        <div className="absolute top-0 left-0">
          {renderTile("top-left")}
        </div>
        <div className="absolute top-0 left-[1200px]">
          {renderTile("top-right")}
        </div>
        <div className="absolute top-[1200px] left-0">
          {renderTile("bottom-left")}
        </div>
        <div className="absolute top-[1200px] left-[1200px]">
          {renderTile("bottom-right")}
        </div>
      </motion.div>
      
      {/* Vignette overlay to hide edges if they get close, though they shouldn't with proper sizing */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5" />
    </div>
  );
}
