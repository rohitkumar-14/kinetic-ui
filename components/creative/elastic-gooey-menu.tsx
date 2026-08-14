"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ElasticGooeyMenuProps {
  links: { label: string; href: string }[];
  className?: string;
}

export function ElasticGooeyMenu({ links, className }: ElasticGooeyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // SVG Curve animation definition
  const initialPath = `M0 0 L0 100 L0 100 Q-50 50 0 0`;
  const targetPath = `M0 0 L0 100 L100 100 Q100 50 100 0`;
  
  // Note: For a right-side drawer opening left, the path math is slightly different.
  // We'll use a simpler layout: the menu slides in, but the SVG acts as a stretchy overlay.
  const curveVariants: any = {
    initial: {
      d: "M100 0 L100 100 L100 100 Q100 50 100 0",
    },
    enter: {
      d: "M100 0 L100 100 L0 100 Q-50 50 0 0",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: "M100 0 L100 100 L100 100 Q100 50 100 0",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const menuVariants: any = {
    initial: { x: "100%" },
    enter: { 
      x: "0%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      x: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants: any = {
    initial: { x: 50, opacity: 0 },
    enter: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i + 0.2 }
    }),
    exit: (i: number) => ({
      x: 50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }
    })
  };

  return (
    <div className={className}>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 p-4 bg-zinc-900 rounded-full text-white hover:scale-110 transition-transform"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
            
            {/* Dark Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            {/* Elastic Menu Container */}
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="relative w-full max-w-md h-full bg-zinc-900 pointer-events-auto flex flex-col justify-center px-16"
            >
              {/* The Stretchy SVG Edge */}
              <svg 
                className="absolute top-0 right-full w-24 h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <motion.path 
                  variants={curveVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  fill="#18181b" /* matches bg-zinc-900 */
                />
              </svg>

              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-4 text-white hover:rotate-90 transition-transform duration-300"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col gap-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="text-5xl font-black text-white hover:text-blue-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
