"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RadialMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface RadialMenuProps extends HTMLMotionProps<"div"> {
  items: RadialMenuItem[];
  centerIcon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  staggerDelay?: number;
  itemSize?: number;
  buttonSize?: number;
  activeColor?: string;
}

export function RadialMenu({
  items,
  centerIcon,
  activeIcon,
  radius = 100,
  startAngle = -90, // Top
  endAngle = 90,    // Bottom (creates a 180 degree semi-circle on the right)
  staggerDelay = 0.05,
  itemSize = 48,
  buttonSize = 64,
  activeColor = "bg-white text-black",
  className,
  ...props
}: RadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate position for an item based on its index
  const getPosition = (index: number, total: number) => {
    // If there's only 1 item, put it in the middle of the arc
    const angleRange = endAngle - startAngle;
    const angleStep = total > 1 ? angleRange / (total - 1) : 0;
    const currentAngle = startAngle + index * angleStep;
    
    // Convert angle to radians
    const radians = (currentAngle * Math.PI) / 180;
    
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    
    return { x, y };
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <AnimatePresence>
        {isOpen && (
          <>
            {items.map((item, index) => {
              const { x, y } = getPosition(index, items.length);
              
              const itemElement = (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    x, 
                    y, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * staggerDelay
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0, 
                    scale: 0.5,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: (items.length - 1 - index) * staggerDelay
                    }
                  }}
                  className="absolute z-0 flex items-center justify-center group cursor-pointer"
                  style={{
                    width: itemSize,
                    height: itemSize,
                  }}
                  onClick={() => {
                    item.onClick?.();
                    // Optional: Close menu on click
                    // setIsOpen(false);
                  }}
                >
                  <div className="relative w-full h-full rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-xl">
                    {item.icon}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-10 px-3 py-1.5 rounded bg-zinc-800 text-xs text-white whitespace-nowrap border border-white/10 pointer-events-none">
                    {item.label}
                  </div>
                </motion.div>
              );

              if (item.href) {
                return (
                  <a href={item.href} key={item.id} className="absolute inset-0 flex items-center justify-center">
                    {itemElement}
                  </a>
                );
              }
              
              return (
                <div key={item.id} className="absolute inset-0 flex items-center justify-center pointer-events-none [&>*]:pointer-events-auto">
                  {itemElement}
                </div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <motion.button
        className={cn(
          "relative z-10 rounded-full flex items-center justify-center shadow-2xl border transition-colors duration-300",
          isOpen ? activeColor : "bg-zinc-900 text-white border-white/10 hover:bg-zinc-800"
        )}
        style={{
          width: buttonSize,
          height: buttonSize,
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center w-full h-full"
        >
          {isOpen && activeIcon ? activeIcon : centerIcon || (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
