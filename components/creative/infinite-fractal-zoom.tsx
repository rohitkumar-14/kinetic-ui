"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteFractalZoomProps {
  className?: string;
}

export function InfiniteFractalZoom({ className }: InfiniteFractalZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of this highly tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-[300vh] bg-neutral-950", className)}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">
        {/* We generate multiple layers that will zoom past the camera */}
        {[...Array(6)].map((_, i) => (
          <ZoomLayer 
            key={i} 
            index={i} 
            totalLayers={6} 
            progress={scrollYProgress} 
          />
        ))}

        <div className="absolute bottom-10 left-0 right-0 text-center text-white/30 text-sm font-mono uppercase tracking-[0.3em] pointer-events-none">
          Scroll to Zoom
        </div>
      </div>
    </div>
  );
}

function ZoomLayer({ index, totalLayers, progress }: { index: number, totalLayers: number, progress: any }) {
  // Each layer starts at a different initial scale.
  // Layer 0 is the smallest (furthest back). Layer N is the largest (closest).
  
  // As scroll progress goes 0 -> 1, every layer grows exponentially.
  
  // Create an offset mapping so layers continually loop or expand outward.
  // Actually, for a single scrollytelling section, we just expand them massively.
  
  const initialScale = Math.pow(2.5, index - 2); // e.g. 0.16, 0.4, 1, 2.5, 6.25...
  
  // We use useTransform to multiply the initial scale by an exponential growth factor based on scroll
  const scale = useTransform(progress, [0, 1], [initialScale, initialScale * Math.pow(2.5, totalLayers)]);
  
  // Fade out as it gets too close to the camera (scale > 15)
  // Fade in as it approaches from the distance (scale < 0.2)
  const opacity = useTransform(scale, [0.1, 0.5, 5, 15], [0, 1, 1, 0]);

  // Rotate slightly as we zoom
  const rotateZ = useTransform(progress, [0, 1], [index * 15, index * 15 + 90]);

  // Color cycles
  const hue = (index * 60) % 360;

  return (
    <motion.div
      className="absolute flex items-center justify-center border-[2px] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)_inset,0_0_50px_rgba(0,0,0,0.5)]"
      style={{
        width: "300px",
        height: "300px",
        scale,
        opacity,
        rotateZ,
        borderColor: `hsla(${hue}, 80%, 60%, 0.5)`,
        backgroundColor: `hsla(${hue}, 80%, 10%, 0.1)`,
      }}
    >
      <div 
        className="absolute inset-4 border border-dashed rounded-xl opacity-30" 
        style={{ borderColor: `hsla(${hue}, 80%, 70%, 1)` }} 
      />
    </motion.div>
  );
}
