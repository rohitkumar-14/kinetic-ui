"use client";

import React, { useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { LocateFixed } from "lucide-react";

export interface InfiniteZoomCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Initial scale of the canvas. Default 1. */
  initialScale?: number;
  /** Minimum zoom level. Default 0.1 */
  minScale?: number;
  /** Maximum zoom level. Default 5 */
  maxScale?: number;
  /** Whether to show the grid background. Default true. */
  showGrid?: boolean;
}

export function InfiniteZoomCanvas({
  children,
  className,
  initialScale = 1,
  minScale = 0.1,
  maxScale = 5,
  showGrid = true,
  ...props
}: InfiniteZoomCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for instant updates
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(initialScale);
  
  // Spring physics for smooth panning/zooming after release
  const springX = useSpring(x, { damping: 30, stiffness: 300 });
  const springY = useSpring(y, { damping: 30, stiffness: 300 });
  const springScale = useSpring(scale, { damping: 30, stiffness: 300 });

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        x.set(dx);
        y.set(dy);
      },
      onPinch: ({ origin: [ox, oy], offset: [s], memo }) => {
        // Enforce scale limits
        const newScale = Math.min(Math.max(s, minScale), maxScale);
        scale.set(newScale);
        return memo;
      },
      onWheel: ({ delta: [dx, dy], ctrlKey }) => {
        // If holding ctrl/cmd, zoom instead of pan (like Figma)
        if (ctrlKey) {
          const currentScale = scale.get();
          // Adjust zoom speed
          const zoomFactor = dy > 0 ? 0.9 : 1.1;
          const newScale = Math.min(Math.max(currentScale * zoomFactor, minScale), maxScale);
          scale.set(newScale);
        } else {
          // Standard pan
          x.set(x.get() - dx);
          y.set(y.get() - dy);
        }
      }
    },
    {
      target: containerRef,
      drag: { from: () => [x.get(), y.get()] },
      pinch: { from: () => [scale.get(), 0], scaleBounds: { min: minScale, max: maxScale } },
      eventOptions: { passive: false }
    }
  );

  // Prevent default zoom on trackpad pinch so we can handle it via onWheel
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handler, { passive: false });
      return () => el.removeEventListener('wheel', handler);
    }
  }, []);

  const resetView = () => {
    // Reset back to center and initial scale using springs for a smooth transition
    x.set(0);
    y.set(0);
    scale.set(initialScale);
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full overflow-hidden bg-[#0a0a0a] touch-none cursor-grab active:cursor-grabbing", className)}
      {...props}
    >
      {/* Dynamic Grid Background that scales with the view */}
      {showGrid && (
        <motion.div
          className="absolute pointer-events-none origin-center"
          style={{
            width: "1000%",
            height: "1000%",
            left: "-450%",
            top: "-450%",
            backgroundSize: "40px 40px",
            backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            x: springX,
            y: springY,
            scale: springScale,
          }}
        />
      )}

      {/* The actual canvas content */}
      <motion.div
        className="absolute w-full h-full origin-center flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
        }}
      >
        {children}
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-50">
        <button 
          onClick={resetView}
          className="p-3 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors shadow-lg"
          title="Reset View"
        >
          <LocateFixed className="w-5 h-5" />
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-6 left-6 pointer-events-none z-50">
        <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col gap-1">
          <p className="text-xs font-mono text-zinc-300"><span className="font-bold text-white">Pan:</span> Drag or Scroll</p>
          <p className="text-xs font-mono text-zinc-300"><span className="font-bold text-white">Zoom:</span> Pinch or Ctrl+Scroll</p>
        </div>
      </div>
    </div>
  );
}
