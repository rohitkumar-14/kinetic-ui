"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionImage {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
}

export interface ImageAccordionProps {
  items: AccordionImage[];
  className?: string;
}

export function ImageAccordion({ items, className }: ImageAccordionProps) {
  // If no item is hovered, all items share equal space
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div 
      className={cn("w-full h-[500px] flex gap-2 overflow-hidden", className)}
      onMouseLeave={() => setActiveItem(null)}
    >
      {items.map((item) => {
        const isActive = activeItem === item.id;
        const isDefault = activeItem === null;
        
        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setActiveItem(item.id)}
            // We use standard CSS transition for flex-grow because it's hardware accelerated 
            // and performs exceptionally well for this specific use case
            className={cn(
              "relative h-full overflow-hidden rounded-3xl cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
              isActive ? "flex-[5]" : isDefault ? "flex-1" : "flex-[0.5]"
            )}
          >
            {/* The background image */}
            <motion.img 
              src={item.imageUrl} 
              alt={item.title} 
              // Scale the image slightly to create a slow parallax effect as the container expands
              animate={{
                scale: isActive ? 1.05 : 1.2
              }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 w-full h-full object-cover origin-center pointer-events-none"
            />
            
            {/* Dark overlay that fades when active */}
            <div 
              className={cn(
                "absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none",
                isActive ? "opacity-20" : isDefault ? "opacity-40" : "opacity-70"
              )} 
            />

            {/* Gradient shadow for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Text Content */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full p-8 pointer-events-none flex flex-col justify-end"
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 20
              }}
              transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
            >
              <h3 className="text-3xl md:text-5xl font-black text-white whitespace-nowrap mb-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-white/70 font-mono text-sm tracking-widest uppercase whitespace-nowrap">
                  {item.subtitle}
                </p>
              )}
            </motion.div>

            {/* Vertical Title (visible when NOT active) */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none origin-bottom-left -rotate-90 whitespace-nowrap"
              animate={{
                opacity: isActive ? 0 : 1,
                scale: isActive ? 0.8 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">
                {item.title}
              </span>
            </motion.div>

          </motion.div>
        );
      })}
    </div>
  );
}
