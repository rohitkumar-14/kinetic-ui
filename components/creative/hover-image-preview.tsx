"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverImageItem {
  id: string;
  label: string;
  subtext?: string;
  image: string;
  href?: string;
}

export interface HoverImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  items: HoverImageItem[];
  imageWidth?: number;
  imageHeight?: number;
  springConfig?: { stiffness: number; damping: number; mass?: number };
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function HoverImagePreview({
  items,
  imageWidth = 300,
  imageHeight = 400,
  springConfig = { stiffness: 150, damping: 20 },
  containerRef,
  className,
  ...props
}: HoverImagePreviewProps) {
  const [activeItem, setActiveItem] = useState<HoverImageItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Smooth springs for x and y cursor position
  const cursorX = useSpring(-imageWidth, springConfig);
  const cursorY = useSpring(-imageHeight, springConfig);

  useEffect(() => {
    // If containerRef is provided, bind to it. Otherwise bind to the immediate wrapper
    const container = containerRef?.current || wrapperRef.current || window;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (containerRef?.current || wrapperRef.current) {
        const targetContainer = (containerRef?.current || wrapperRef.current) as HTMLElement;
        const rect = targetContainer.getBoundingClientRect();
        
        // Offset by half image size to center the image on the cursor
        cursorX.set(clientX - rect.left - (imageWidth / 2));
        cursorY.set(clientY - rect.top - (imageHeight / 2));
      } else {
        cursorX.set(clientX - (imageWidth / 2));
        cursorY.set(clientY - (imageHeight / 2));
      }
    };

    container.addEventListener("mousemove", handleMouseMove as EventListener);
    container.addEventListener("touchmove", handleMouseMove as EventListener);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      container.removeEventListener("touchmove", handleMouseMove as EventListener);
    };
  }, [cursorX, cursorY, imageWidth, imageHeight, containerRef]);

  return (
    <div 
      ref={wrapperRef}
      className={cn("relative w-full flex flex-col", className)}
      onMouseLeave={() => {
        setIsVisible(false);
        setActiveItem(null);
      }}
      {...props}
    >
      <ul className="w-full relative z-10 flex flex-col">
        {items.map((item) => (
          <li 
            key={item.id}
            onMouseEnter={() => {
              setActiveItem(item);
              setIsVisible(true);
            }}
            className="group relative"
          >
            {item.href ? (
              <a 
                href={item.href}
                className="flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors px-4"
              >
                <span className="text-3xl md:text-5xl font-black text-white mix-blend-difference group-hover:pl-4 transition-all duration-300">
                  {item.label}
                </span>
                {item.subtext && (
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-indigo-400 transition-colors">
                    {item.subtext}
                  </span>
                )}
              </a>
            ) : (
              <div className="flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors px-4">
                <span className="text-3xl md:text-5xl font-black text-white mix-blend-difference group-hover:pl-4 transition-all duration-300">
                  {item.label}
                </span>
                {item.subtext && (
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-indigo-400 transition-colors">
                    {item.subtext}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Floating Preview Image */}
      <motion.div
        className={cn(
          "pointer-events-none rounded-xl overflow-hidden z-0 shadow-2xl",
          (containerRef || wrapperRef.current) ? "absolute" : "fixed"
        )}
        style={{
          width: imageWidth,
          height: imageHeight,
          x: cursorX,
          y: cursorY,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible && activeItem ? 1 : 0, 
          scale: isVisible && activeItem ? 1 : 0.8 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.img
              key={activeItem.id}
              src={activeItem.image}
              alt={activeItem.label}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
