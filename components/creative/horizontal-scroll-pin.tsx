"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollItem {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  content?: React.ReactNode;
}

export interface HorizontalScrollPinProps {
  items: HorizontalScrollItem[];
  className?: string;
}

export function HorizontalScrollPin({ items, className }: HorizontalScrollPinProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // We track the scroll progress of the large container.
  // When it starts at the top of the viewport to when it ends at the bottom.
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  // Calculate how far we need to slide the horizontal track.
  // We want to stop sliding when the very last item is fully on screen.
  // If there are N items, we have N viewports of width. We translate by -(N - 1) * 100vw.
  // But using percentage of the track's total width is easier:
  // We translate from 0% to -(100% - 100vw). We can approximate this by using vw directly.
  
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${100 - (100 / items.length)}%`]);

  return (
    // The height of this container determines how long the scroll pinning lasts.
    // E.g., if items.length is 4, height is 400vh.
    <div 
      ref={targetRef} 
      className={cn("relative", className)}
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* The sticky wrapper that stays on screen while we scroll the parent container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-zinc-950">
        
        {/* The horizontal moving track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-8"
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="relative h-[70vh] w-[85vw] max-w-5xl shrink-0 overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 flex flex-col justify-end p-12 group"
            >
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title || "Image"} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              {item.content ? (
                <div className="relative z-20 w-full h-full">{item.content}</div>
              ) : (
                <div className="relative z-20 w-full max-w-2xl">
                  {item.title && (
                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
}
