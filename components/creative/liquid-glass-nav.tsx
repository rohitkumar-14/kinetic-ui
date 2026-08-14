"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
}

export interface LiquidGlassNavProps {
  items: NavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function LiquidGlassNav({
  items,
  activeId: externalActiveId,
  onChange,
  className,
}: LiquidGlassNavProps) {
  const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
  const activeId = externalActiveId !== undefined ? externalActiveId : internalActiveId;

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    if (onChange) onChange(id);
  };

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "relative p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10",
          className
        )}
      >
        {/* The Gooey Container layer */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ filter: "url(#liquid-goo)" }}
        >
          {items.map((item) => (
            item.id === activeId && (
              <motion.div
                key="active-indicator"
                layoutId="active-indicator-liquid"
                className="absolute bg-cyan-400 rounded-full z-0 h-10 top-1/2 -translate-y-1/2"
                style={{
                  width: "var(--active-width, 100px)",
                  left: "var(--active-left, 0px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                  mass: 1.5,
                }}
              />
            )
          ))}
        </div>

        <nav className="relative z-10 flex space-x-2 items-center">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={cn(
                "relative px-6 py-2 rounded-full font-medium text-sm transition-colors duration-300 outline-none",
                activeId === item.id ? "text-black" : "text-white hover:text-white/80"
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="active-indicator-liquid-bg"
                  className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
                  style={{ filter: "url(#liquid-goo)" }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 1.5,
                  }}
                />
              )}
              <span className="relative z-20">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
