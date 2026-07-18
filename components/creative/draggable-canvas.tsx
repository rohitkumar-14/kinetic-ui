"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DraggableCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  canvasSize?: number; // e.g. 3000 for a 3000x3000px canvas
  initialX?: number;
  initialY?: number;
}

export function DraggableCanvas({
  children,
  canvasSize = 3000,
  initialX = -1000,
  initialY = -1000,
  className,
  ...props
}: DraggableCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden bg-zinc-950", className)}
      {...props}
    >
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        initial={{ x: initialX, y: initialY }}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          width: canvasSize,
          height: canvasSize,
          // A subtle dot grid background to give a sense of scale and movement
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
