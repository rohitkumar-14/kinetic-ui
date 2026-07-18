"use client";

import React, { Children } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

export interface MasonryGridProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  columnWidth?: number | string;

  gap?: number;
  animate?: boolean;
}

export function MasonryGrid({
  children,
  columnWidth = 250,
  gap = 4, // Tailwind spacing units
  animate = true,
  className,
  ...props
}: MasonryGridProps) {
  // CSS multi-column approach using columnWidth is container-aware and highly performant.
  // It automatically adjusts the number of columns based on the container width.
  
  const widthStr = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
  const gapClass = `gap-${gap}`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const childrenArray = Children.toArray(children);

  if (!animate) {
    return (
      <div 
        className={cn("w-full", gapClass, className)} 
        style={{ columnWidth: widthStr, ...(props.style as React.CSSProperties) }}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {childrenArray.map((child, i) => (
          <div key={i} className={cn(`mb-${gap}`, "break-inside-avoid")}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("w-full", gapClass, className)}
      style={{ columnWidth: widthStr, ...(props.style as any) }}
      {...props}
    >
      {childrenArray.map((child, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className={cn(`mb-${gap}`, "break-inside-avoid")}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
