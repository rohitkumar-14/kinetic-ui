"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagnifiedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetTarget = target.closest("[data-magnet]") as HTMLElement;

      if (magnetTarget) {
        setIsHovering(true);
        setTargetRect(magnetTarget.getBoundingClientRect());
      } else {
        setIsHovering(false);
        setTargetRect(null);
      }
    };

    // Keep updating rect on scroll if hovering
    const handleScroll = () => {
      if (isHovering && targetRect) {
        // We'd ideally re-query the hovered element, but for a simple implementation,
        // we just clear hover state to avoid detached cursor on scroll
        setIsHovering(false);
        setTargetRect(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHovering, targetRect]);

  const cursorSize = 40;
  
  // Calculate position: if hovering, snap to center of the target bounding box
  const x = isHovering && targetRect
    ? targetRect.left + targetRect.width / 2
    : mousePosition.x;
    
  const y = isHovering && targetRect
    ? targetRect.top + targetRect.height / 2
    : mousePosition.y;

  // Calculate dimensions: if hovering, snap to target width/height plus some padding
  const width = isHovering && targetRect ? targetRect.width + 16 : cursorSize;
  const height = isHovering && targetRect ? targetRect.height + 16 : cursorSize;
  const borderRadius = isHovering && targetRect ? "12px" : "50%";

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block",
        "bg-white mix-blend-difference" // Awwwards style inversion
      )}
      animate={{
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        borderRadius,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    />
  );
}
