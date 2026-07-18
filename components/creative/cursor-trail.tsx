"use client";

import React, { useEffect, useState, RefObject } from "react";
import { motion, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorTrailProps extends HTMLMotionProps<"div"> {
  color?: string;
  size?: number;
  blur?: number;
  springConfig?: { stiffness: number; damping: number; mass?: number };
  containerRef?: RefObject<HTMLElement | null>;
}

export function CursorTrail({
  color = "#6366f1",
  size = 120,
  blur = 60,
  springConfig = { stiffness: 100, damping: 20 },
  containerRef,
  className,
  ...props
}: CursorTrailProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for x and y
  const cursorX = useSpring(-size, springConfig);
  const cursorY = useSpring(-size, springConfig);

  useEffect(() => {
    const container = containerRef?.current || window;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (containerRef?.current) {
        // Local coordinates relative to the container
        const rect = containerRef.current.getBoundingClientRect();
        cursorX.set(clientX - rect.left - size / 2);
        cursorY.set(clientY - rect.top - size / 2);
      } else {
        // Global window coordinates
        cursorX.set(clientX - size / 2);
        cursorY.set(clientY - size / 2);
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach events
    container.addEventListener("mousemove", handleMouseMove as EventListener);
    container.addEventListener("touchmove", handleMouseMove as EventListener);
    
    if (containerRef?.current) {
      container.addEventListener("mouseleave", handleMouseLeave as EventListener);
      container.addEventListener("mouseenter", handleMouseEnter as EventListener);
    } else {
      document.addEventListener("mouseleave", handleMouseLeave as EventListener);
      document.addEventListener("mouseenter", handleMouseEnter as EventListener);
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      container.removeEventListener("touchmove", handleMouseMove as EventListener);
      
      if (containerRef?.current) {
        container.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        container.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      } else {
        document.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        document.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      }
    };
  }, [cursorX, cursorY, isVisible, size, containerRef]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none rounded-full z-0",
        // If there's a container, we want absolute positioning, otherwise fixed
        containerRef ? "absolute" : "fixed",
        className
      )}
      style={{
        width: size,
        height: size,
        x: cursorX,
        y: cursorY,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity: isVisible ? 0.6 : 0,
        transition: "opacity 0.5s ease",
      }}
      {...props}
    />
  );
}
