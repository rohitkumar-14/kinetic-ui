"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DraggableCarouselProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  itemClassName?: string;
}

export function DraggableCarousel<T>({
  items,
  renderItem,
  gap = 16,
  className,
  itemClassName,
  ...props
}: DraggableCarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraintLeft, setConstraintLeft] = useState(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current && containerRef.current) {
        // Calculate the maximum scroll distance
        const maxScroll = carouselRef.current.scrollWidth - containerRef.current.offsetWidth;
        setConstraintLeft(maxScroll > 0 ? -maxScroll : 0);
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [items]);

  return (
    <div 
      ref={containerRef}
      className={cn("w-full overflow-hidden touch-none", className)}
      {...props}
    >
      <motion.div
        ref={carouselRef}
        className="flex"
        style={{ gap: `${gap}px` }}
        drag="x"
        dragConstraints={{ right: 0, left: constraintLeft }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className={cn("shrink-0", itemClassName)}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
