"use client";

import React, { useRef } from "react";
import { StickySequenceContainer } from "@/components/creative/sticky-sequence-container";
import { motion, useScroll, useTransform } from "framer-motion";

export function StickySequenceDemo({ scrollDistance = "2400px" }: { scrollDistance?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate internal scroll progress for text animation
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    container: scrollContainerRef,
    offset: ["start start", "end end"] 
  });

  // Use a real image sequence for a premium feel (Apple AirPods Pro sequence)
  const frames = React.useMemo(() => {
    return Array.from({ length: 147 }).map((_, i) => {
      const frameNumber = (i + 1).toString().padStart(4, "0");
      return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${frameNumber}.jpg`;
    });
  }, []);
  
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1, 1.1]);

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-[600px] overflow-y-auto rounded-xl border border-white/10 bg-background relative custom-scrollbar"
    >
      {/* Intro Scroll Buffer */}
      <div className="h-[400px] flex items-center justify-center w-full bg-slate-950/50">
        <p className="text-zinc-400 animate-pulse text-lg tracking-widest uppercase">Scroll Down</p>
      </div>
      
      <div ref={containerRef} className="w-full">
        <StickySequenceContainer 
          frameUrls={frames}
          scrollDistance={scrollDistance}
          stickyHeight="600px"
          scrollContainerRef={scrollContainerRef}
        >
          <motion.div style={{ opacity, y, scale }} className="text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Apple-Style<br/>Scrollytelling.
            </h2>
            <p className="text-zinc-300 mt-4 text-lg max-w-sm mx-auto font-light">
              Video playback is bound natively to your scroll wheel.
            </p>
          </motion.div>
          {/* Debug Scroll Progress Bar */}
          <motion.div 
            className="absolute bottom-0 left-0 h-2 bg-indigo-500" 
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} 
          />
        </StickySequenceContainer>
      </div>
      
      {/* Outro Scroll Buffer */}
      <div className="h-[400px] flex items-center justify-center w-full bg-slate-950/50">
        <p className="text-zinc-500 text-lg tracking-widest uppercase">End of Sequence</p>
      </div>
    </div>
  );
}
