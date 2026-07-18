"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ScrollSpySection {
  id: string;
  label: string;
}

export interface ScrollSpyProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: ScrollSpySection[];
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  alignment?: "left" | "right";
  showLabels?: boolean;
  offset?: number;
}

export function ScrollSpy({
  sections,
  scrollContainerRef,
  alignment = "right",
  showLabels = true,
  offset = 100, // Trigger offset from top
  className,
  ...props
}: ScrollSpyProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    // If we have a local container, use it; otherwise use window
    const container = scrollContainerRef?.current || window;

    const handleScroll = () => {
      // Find the current section
      let currentActiveId = activeId;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // If the container is local, we need to calculate relative to container
          if (scrollContainerRef?.current) {
            const containerRect = scrollContainerRef.current.getBoundingClientRect();
            // If the element's top is within the container's top + offset
            if (rect.top - containerRect.top <= offset) {
              currentActiveId = section.id;
            }
          } else {
            // Global window scroll
            if (rect.top <= offset) {
              currentActiveId = section.id;
            }
          }
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [sections, activeId, scrollContainerRef, offset]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (scrollContainerRef?.current) {
      // Local scroll
      const container = scrollContainerRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top + container.scrollTop;
      
      container.scrollTo({
        top: relativeTop - offset + 50, // Slight adjustment for visuals
        behavior: "smooth"
      });
    } else {
      // Global scroll
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset + 50,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3",
        alignment === "right" ? "right-8 items-end" : "left-8 items-start",
        className
      )}
      {...props}
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-3 relative focus:outline-none"
          >
            {/* Label (Left aligned mode) */}
            {alignment === "left" && showLabels && (
              <span 
                className={cn(
                  "text-xs font-medium transition-all duration-300 pointer-events-none absolute left-8 w-max",
                  isActive 
                    ? "text-white opacity-100 translate-x-0" 
                    : "text-zinc-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )}
              >
                {section.label}
              </span>
            )}

            {/* Indicator Dot */}
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              {/* Inactive background */}
              <div className="absolute w-2 h-2 rounded-full bg-zinc-700 transition-transform duration-300 group-hover:scale-150" />
              
              {/* Active animated dot */}
              {isActive && (
                <motion.div
                  layoutId="scroll-spy-active"
                  className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>

            {/* Label (Right aligned mode) */}
            {alignment === "right" && showLabels && (
              <span 
                className={cn(
                  "text-xs font-medium transition-all duration-300 pointer-events-none absolute right-8 w-max",
                  isActive 
                    ? "text-white opacity-100 translate-x-0" 
                    : "text-zinc-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )}
              >
                {section.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
