"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
}

interface ElasticSidebarProps {
  items: NavItem[];
  className?: string;
}

export function ElasticSidebar({ items, className }: ElasticSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // SVG Path animation states
  // We use a cubic bezier curve to create the elastic pulling effect
  // Format: M(start_x, start_y) Q(control_x, control_y) (end_x, end_y)
  const initialPath = "M100 0 L100 100 L100 100 Q100 50 100 0 Z";
  // The curve pulls way out to x=-50 before snapping back
  const targetPath = "M100 0 L100 100 L0 100 Q-50 50 0 0 Z"; 
  const finalPath = "M100 0 L100 100 L0 100 Q0 50 0 0 Z";
  
  const curve = {
    initial: {
      d: initialPath
    },
    enter: {
      d: finalPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <div className={cn("relative w-full h-full min-h-[500px]", className)}>
      
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-8 right-8 z-10 p-4 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* The Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            className="absolute top-0 right-0 w-[400px] max-w-[80vw] h-full z-50 flex flex-col justify-center"
          >
            {/* The Elastic SVG Background */}
            <svg 
              className="absolute top-0 -left-[99px] w-[calc(100%+100px)] h-full pointer-events-none fill-zinc-900" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <motion.path 
                variants={curve as any} 
                initial="initial" 
                animate="enter" 
                exit="exit" 
              />
            </svg>

            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-50 p-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Menu Items */}
            <div className="relative z-50 flex flex-col gap-8 px-16">
              {items.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="text-4xl md:text-5xl font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-tighter"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.76, 0, 0.24, 1], 
                    delay: i * 0.05 + 0.1 
                  }}
                  onClick={(e) => e.preventDefault()} // Prevent navigation in demo
                >
                  {item.title}
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <motion.div 
              className="absolute bottom-8 left-16 right-16 flex justify-between text-zinc-500 text-sm font-mono z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span>AWWWARDS</span>
              <span>2026</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
