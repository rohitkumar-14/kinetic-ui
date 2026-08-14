"use client";

import React, { useEffect, useState, RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface GooeyCursorProps {
  containerRef?: RefObject<HTMLElement | null>;
}

export function GooeyCursor({ containerRef }: GooeyCursorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Main cursor follows instantly
  const mainX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const mainY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Trailing blobs follow with delay
  const trail1X = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 });
  const trail1Y = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 });

  const trail2X = useSpring(mouseX, { stiffness: 200, damping: 22, mass: 1 });
  const trail2Y = useSpring(mouseY, { stiffness: 200, damping: 22, mass: 1 });

  useEffect(() => {
    const targetElement = containerRef?.current || window;
    
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(mouseEvent.clientX - rect.left);
        mouseY.set(mouseEvent.clientY - rect.top);
      } else {
        mouseX.set(mouseEvent.clientX);
        mouseY.set(mouseEvent.clientY);
      }
    };

    targetElement.addEventListener("mousemove", handleMouseMove as EventListener);
    return () => targetElement.removeEventListener("mousemove", handleMouseMove as EventListener);
  }, [mouseX, mouseY, containerRef]);

  if (!isMounted) return null;

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div 
        className="absolute inset-0 pointer-events-none z-[50]"
        style={{ filter: "url('#goo')" }}
      >
        <motion.div
          className="absolute w-8 h-8 bg-indigo-500 rounded-full"
          style={{ x: trail2X, y: trail2Y, translateX: "-50%", translateY: "-50%" }}
        />
        <motion.div
          className="absolute w-12 h-12 bg-purple-500 rounded-full"
          style={{ x: trail1X, y: trail1Y, translateX: "-50%", translateY: "-50%" }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-pink-500 rounded-full"
          style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        />
      </div>
    </>
  );
}
