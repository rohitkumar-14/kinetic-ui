"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxCardItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export interface ParallaxDepthCardsProps {
  items: ParallaxCardItem[];
  className?: string;
}

export function ParallaxDepthCards({ items, className }: ParallaxDepthCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the overall scroll progress of the entire stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full pb-[10vh]", className)}
    >
      {items.map((item, index) => (
        <Card 
          key={item.id}
          item={item}
          index={index}
          progress={scrollYProgress}
          totalCards={items.length}
        />
      ))}
    </div>
  );
}

interface CardProps {
  item: ParallaxCardItem;
  index: number;
  progress: MotionValue<number>;
  totalCards: number;
}

function Card({ item, index, progress, totalCards }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card will shrink and fade slightly as subsequent cards stack on top of it.
  // The 'targetScale' ensures that the cards in the back are perfectly stepped.
  const targetScale = 1 - (totalCards - index) * 0.05;

  // The range where this specific card begins to be covered by the NEXT card
  const animationStart = index / totalCards;
  const animationEnd = 1; // It continues scaling down until the very end of the container

  const scale = useTransform(progress, [animationStart, animationEnd], [1, targetScale]);
  
  // Create a depth darkening effect
  const filter = useTransform(progress, [animationStart, animationEnd], ['brightness(1)', 'brightness(0.3)']);

  // Move the card slightly up to tighten the stack as it falls to the back
  const y = useTransform(progress, [animationStart, animationEnd], ["0%", `-${(totalCards - index) * 5}%`]);

  return (
    <div 
      ref={cardRef}
      className="h-screen w-full flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          filter,
          y,
          // Calculate the top offset so cards visually stack slightly below each other
          top: `calc(10vh + ${index * 20}px)`
        }}
        className="relative w-[90vw] max-w-5xl h-[70vh] rounded-3xl overflow-hidden origin-top shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
      >
        {/* Background Image */}
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Inner Shadow / Glare */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent z-10 opacity-50 mix-blend-overlay" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col justify-end">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-mono text-white">
              {item.category}
            </span>
            <span className="text-white/60 font-mono text-sm">
              0{index + 1} &mdash; 0{totalCards}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter w-full leading-none">
            {item.title}
          </h2>
          
          {item.description && (
            <p className="mt-6 text-white/80 max-w-xl text-lg font-medium leading-relaxed drop-shadow-md">
              {item.description}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
