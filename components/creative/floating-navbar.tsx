"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type FloatingNavbarVariant = "pill" | "underline" | "block";

interface NavItem {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  items?: NavItem[];
  className?: string;
  color?: string;
  speed?: number;
  scale?: number;
  variant?: FloatingNavbarVariant;
}

const defaultItems = [
  { label: "Home", href: "#" },
  { label: "Showcase", href: "#" },
  { label: "Specs", href: "#" },
];

export function FloatingNavbar({
  items,
  className,
  color,
  speed = 1,
  scale = 1,
  variant = "pill",
}: FloatingNavbarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = items && items.length > 0 ? items : defaultItems;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const hasPosition =
    className?.includes("absolute") ||
    className?.includes("relative") ||
    className?.includes("fixed");

  const activeStiffness = 350 * speed;
  const activeDamping = 25 / speed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35 / speed, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "z-50 flex items-center justify-between rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-2xl transition-colors duration-300",
            variant === "underline" ? "px-6 py-2" : "p-2",
            !hasPosition && "fixed top-6 left-1/2 -translate-x-1/2",
            className
          )}
          style={{
            transform: scale !== 1 ? `scale(${scale})` : undefined,
          }}
        >
          <div className={cn("flex items-center", variant === "underline" ? "gap-6" : "gap-1.5")}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative transition-colors",
                  variant === "underline" ? "py-2 text-sm" : "px-4 py-2 rounded-full text-xs",
                  "font-medium text-muted-foreground hover:text-foreground"
                )}
              >
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId={`navHover-${variant}`}
                    className={cn(
                      "absolute -z-10",
                      variant === "underline"
                        ? "bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full"
                        : variant === "block"
                        ? "inset-0 bg-foreground rounded-full"
                        : "inset-0 bg-muted border border-border/50 rounded-full" // default pill
                    )}
                    style={
                      variant === "underline"
                        ? { backgroundColor: color || "currentColor" }
                        : variant === "block"
                        ? { backgroundColor: color ? `${color}30` : undefined }
                        : {
                            backgroundColor: color ? `${color}15` : undefined,
                            borderColor: color ? `${color}40` : undefined,
                          }
                    }
                    transition={{ type: "spring", stiffness: activeStiffness, damping: activeDamping }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
