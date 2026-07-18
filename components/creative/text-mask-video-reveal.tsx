"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextMaskVideoRevealProps {
  text: string;
  videoSrc: string;
  className?: string;
  maskScaleFactor?: number;
}

export function TextMaskVideoReveal({
  text,
  videoSrc,
  className,
  maskScaleFactor = 60,
}: TextMaskVideoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale the mask hole massively so the video fills the screen.
  // We use exponential scaling for a smoother 'fly-through' effect.
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 5, 20, maskScaleFactor]);
  
  // Fade out the mask completely at the very end to reveal the pure video
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Background Video */}
        <video 
          src={videoSrc}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Text Mask Layer */}
        {/* We use mix-blend-multiply. Black stays black, White becomes transparent (showing the video). */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center bg-black mix-blend-multiply origin-center"
          style={{ scale, opacity }}
        >
          <h1 className="text-[20vw] md:text-[25vw] font-black text-white tracking-tighter text-center leading-none">
            {text}
          </h1>
        </motion.div>
        
      </div>
    </div>
  );
}
