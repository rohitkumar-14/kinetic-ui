"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StaggeredMasonryProps {
  items: React.ReactNode[];
  className?: string;
  columns?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    clipPath: "inset(100% 0% 0% 0%)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom spring-like easing
    }
  }
};

const innerImageVariants = {
  hidden: { scale: 1.2 },
  visible: { 
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function StaggeredMasonry({ items, className, columns = 3 }: StaggeredMasonryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  // Simple masonry distribution
  const columnsData: React.ReactNode[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    columnsData[index % columns].push(item);
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("grid gap-4 sm:gap-6", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {columnsData.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 sm:gap-6">
          {column.map((item, itemIndex) => (
            <motion.div
              key={itemIndex}
              variants={itemVariants}
              className="w-full relative overflow-hidden rounded-2xl bg-muted"
            >
              <motion.div
                variants={innerImageVariants}
                className="w-full h-full"
              >
                {item}
              </motion.div>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
