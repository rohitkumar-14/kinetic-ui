"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function BentoGridGlow({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update custom properties on the container for child elements to inherit
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (element) element.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 group relative w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <div className="relative rounded-2xl bg-white/5 p-[1px] overflow-hidden">
            {/* The illuminating border glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.5), transparent 40%)"
              }}
            />
            {/* The content container that masks the center, leaving only the border illuminated */}
            <div className="relative z-10 bg-[#0a0a0a] rounded-[15px] h-full overflow-hidden">
              {/* Secondary subtle background glow that shines through the content */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                style={{
                  background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.1), transparent 40%)"
                }}
              />
              <div className="relative z-10 h-full p-8">
                {child}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
