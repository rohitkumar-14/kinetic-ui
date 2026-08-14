"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DisplacementHoverProps {
  image1: string;
  image2: string;
  className?: string;
  intensity?: number;
}

export function DisplacementHover({
  image1,
  image2,
  className,
  intensity = 50,
}: DisplacementHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = React.useId();

  // Mouse tracking for dynamic displacement center
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      className={cn("relative overflow-hidden cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      onMouseMove={handleMouseMove}
    >
      <svg className="absolute w-0 h-0 hidden">
        <defs>
          <filter id={`displacementFilter-${filterId}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isHovered ? intensity : 0}
              xChannelSelector="R"
              yChannelSelector="G"
              className="transition-all duration-700 ease-out"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image1})`,
          filter: `url(#displacementFilter-${filterId})`,
        }}
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.7, ease: "circOut" }}
      />
      
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image2})`,
          filter: `url(#displacementFilter-${filterId})`,
        }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.1 }}
        transition={{ duration: 0.7, ease: "circOut" }}
      />
    </div>
  );
}
