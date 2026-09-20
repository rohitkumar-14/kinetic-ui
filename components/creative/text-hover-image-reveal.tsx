"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
}

interface TextHoverImageRevealProps {
  items?: HoverItem[];
  className?: string;
}

const defaultItems: HoverItem[] = [
  {
    id: "1",
    title: "Quantum Nexus",
    subtitle: "2026 // WEBGL INTERFACE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ethereal Space",
    subtitle: "2025 // CREATIVE DIRECTION",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Neon Synthesis",
    subtitle: "2024 // 3D RENDERING",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Fluid Dynamics",
    subtitle: "2023 // PHYSICS ENGINE",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2400&auto=format&fit=crop",
  },
];

export function TextHoverImageReveal({ 
  items = defaultItems,
  className 
}: TextHoverImageRevealProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom spring configurations for the follow cursor
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate cursor position relative to the container
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full max-w-5xl mx-auto py-12 md:py-24 group",
        className
      )}
      onMouseLeave={() => setActiveItem(null)}
    >
      {/* Floating Image Container */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-10 overflow-hidden rounded-xl shadow-2xl"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 320,
          height: 400,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: activeItem !== null ? 1 : 0,
          scale: activeItem !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {items.map((item, idx) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
              activeItem === idx ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          />
        ))}
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </motion.div>

      {/* List items */}
      <div className="flex flex-col border-t border-white/10">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveItem(idx)}
            className="group/item relative flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 py-8 px-4 md:px-8 cursor-pointer transition-colors duration-500 hover:bg-white/5"
          >
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold tracking-tighter text-white/50 transition-colors duration-500 group-hover/item:text-white"
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {item.title}
              </motion.h2>
            </div>
            
            {item.subtitle && (
              <div className="mt-4 md:mt-0 overflow-hidden">
                <motion.p 
                  className="text-sm font-mono tracking-widest text-white/30 uppercase"
                  initial={{ opacity: 0.5, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {item.subtitle}
                </motion.p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
