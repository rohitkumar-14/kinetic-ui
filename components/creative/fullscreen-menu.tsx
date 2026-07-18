"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export type FullscreenMenuVariant = "curtain" | "slide" | "fade" | "zoom";

interface FullscreenMenuProps {
  links?: { title: string; href: string }[];
  className?: string;
  variant?: FullscreenMenuVariant;
}

const defaultLinks = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function FullscreenMenu({ links = defaultLinks, className, variant = "curtain" }: FullscreenMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getMenuVariants = (): Variants => {
    switch (variant) {
      case "slide":
        return {
          initial: { y: "-100%" },
          animate: { y: "0%", transition: { duration: 0.6, ease: [0.12, 0, 0.39, 0] } },
          exit: { y: "-100%", transition: { duration: 0.6, ease: [0.12, 0, 0.39, 1] } },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.4 } },
          exit: { opacity: 0, transition: { duration: 0.4 } },
        };
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
          exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4, ease: [0.12, 0, 0.39, 1] } },
        };
      case "curtain":
      default:
        return {
          initial: { scaleY: 0 },
          animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
          exit: { scaleY: 0, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 1] } },
        };
    }
  };

  const menuVariants = getMenuVariants();

  const linkVariants: Variants = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };

  const containerVariants: Variants = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: variant === "fade" ? 0.1 : 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div className={cn("relative z-50", className)}>
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        className="fixed right-8 top-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 origin-top bg-zinc-950 p-10 text-white"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between border-b border-white/20 pb-8 uppercase tracking-widest text-white/50 text-sm">
                <span>Navigation</span>
                <span>Menu</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <motion.nav
                  variants={containerVariants}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col items-center gap-6"
                >
                  {links.map((link, index) => (
                    <div key={index} className="overflow-hidden">
                      <motion.div variants={linkVariants}>
                        <a
                          href={link.href}
                          onClick={toggleMenu}
                          className="text-5xl md:text-7xl font-bold tracking-tight hover:text-indigo-400 transition-colors"
                        >
                          {link.title}
                        </a>
                      </motion.div>
                    </div>
                  ))}
                </motion.nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
