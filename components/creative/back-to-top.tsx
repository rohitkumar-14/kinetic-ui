"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export interface BackToTopProps extends HTMLMotionProps<"button"> {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  threshold?: number;
  showProgress?: boolean;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  icon?: React.ReactNode;
}

export function BackToTop({
  scrollContainerRef,
  threshold = 200,
  showProgress = true,
  position = "bottom-right",
  icon = <ArrowUp className="w-5 h-5" />,
  className,
  ...props
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Setup scroll tracking
  // If no container ref is provided, useScroll defaults to window
  const { scrollYProgress, scrollY } = useScroll(
    scrollContainerRef ? { container: scrollContainerRef } : {}
  );

  // Smooth out the progress ring animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check visibility threshold
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY, threshold]);

  const handleScrollToTop = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={handleScrollToTop}
          className={cn(
            "fixed z-50 flex items-center justify-center p-3 rounded-full bg-zinc-900 text-white shadow-xl hover:bg-zinc-800 transition-colors border border-white/10 group focus:outline-none",
            positionClasses[position],
            className
          )}
          {...props}
        >
          {showProgress && (
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" 
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                className="stroke-zinc-800 fill-none"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                className="stroke-indigo-500 fill-none"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: scaleY
                }}
              />
            </svg>
          )}
          
          <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
            {icon}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
