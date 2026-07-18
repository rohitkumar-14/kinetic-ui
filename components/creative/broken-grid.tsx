"use client";

import React, { Children } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

export interface BrokenGridProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  animate?: boolean;
}

export function BrokenGrid({
  children,
  columns = 12,
  gap = 4,
  animate = true,
  className,
  ...props
}: BrokenGridProps) {
  const childrenArray = Children.toArray(children);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    },
  };

  return (
    <motion.div
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "show" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "grid",
        `grid-cols-${columns}`,
        `gap-${gap}`,
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {childrenArray.map((child, i) => {
        if (React.isValidElement(child)) {
          return animate ? React.cloneElement(child, { variants: itemVariants } as any) : child;
        }
        return child;
      })}
    </motion.div>
  );
}

export interface BrokenGridItemProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  colSpan?: number | { sm?: number; md?: number; lg?: number };
  rowSpan?: number;
  colStart?: number | { sm?: number; md?: number; lg?: number };
  rowStart?: number;
  offsetX?: string;
  offsetY?: string;
  zIndex?: number;
}

export function BrokenGridItem({
  children,
  colSpan = 4,
  rowSpan = 1,
  colStart,
  rowStart,
  offsetX = "0px",
  offsetY = "0px",
  zIndex = 1,
  className,
  ...props
}: BrokenGridItemProps) {
  
  // Helper to generate col-span classes based on responsive object or number
  const getColSpanStyle = () => {
    if (typeof colSpan === 'number') return { gridColumnEnd: `span ${colSpan}` };
    return {
      gridColumnEnd: `span ${colSpan.lg || colSpan.md || colSpan.sm || 4}`
    }; // simplified for inline styles; in real world might need media queries if not using classes
  };

  const getColStartStyle = () => {
    if (!colStart) return {};
    if (typeof colStart === 'number') return { gridColumnStart: colStart };
    return {
      gridColumnStart: colStart.lg || colStart.md || colStart.sm || 1
    };
  };

  return (
    <motion.div
      className={cn("relative w-full h-full", className)}
      style={{
        ...getColSpanStyle(),
        ...getColStartStyle(),
        ...(rowSpan > 1 ? { gridRowEnd: `span ${rowSpan}` } : {}),
        ...(rowStart ? { gridRowStart: rowStart } : {}),
        transform: `translate(${offsetX}, ${offsetY})`,
        zIndex,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
