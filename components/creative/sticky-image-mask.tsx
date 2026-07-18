"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyImageMaskProps {
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
}

export function StickyImageMask({ text, imageUrl, videoUrl, className }: StickyImageMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress over the container's height (e.g., 300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll for a buttery cinematic feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // 1. Scale the text aggressively as we scroll down.
  // It stays at scale 1 for the first 20%, then rapidly explodes to scale 100
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 1, 50, 150]);

  // 2. Fade out the black overlay at the very end so the video is fully visible without the text edges
  const opacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative h-[300vh] w-full bg-zinc-950", className)}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Media (Video or Image) */}
        <div className="absolute inset-0 w-full h-full z-0">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Background reveal" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          )}
        </div>

        {/* The Mask Layer using Mix-Blend-Mode: Multiply */}
        {/* Black background stays black, White text becomes perfectly transparent to reveal the media behind it */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-black z-10 flex items-center justify-center"
          style={{ 
            mixBlendMode: "multiply",
            opacity // Fade out entirely at the end of the scroll
          }}
        >
          <motion.div
            style={{ scale }}
            className="flex items-center justify-center origin-center"
          >
            <h1 className="text-[20vw] font-black uppercase text-white tracking-tighter leading-none whitespace-nowrap">
              {text}
            </h1>
          </motion.div>
        </motion.div>

        {/* Optional: Add a subtle overlay to the media so it's not too bright when fully revealed */}
        <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      </div>
    </div>
  );
}
