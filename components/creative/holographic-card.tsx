"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface HolographicCardProps {
  children?: React.ReactNode;
  className?: string;
  image?: string;
}

export function HolographicCard({ children, className, image }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
    
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setBackgroundPosition("50% 50%");
  };

  return (
    <div
      className={cn("w-full h-full [perspective:1000px]", className)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Holographic foil gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-color-dodge transition-all duration-200 ease-out z-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(
              115deg,
              transparent 0%,
              rgba(255, 255, 255, 0.2) 20%,
              rgba(0, 255, 212, 0.4) 40%,
              rgba(255, 0, 212, 0.4) 60%,
              rgba(255, 255, 255, 0.2) 80%,
              transparent 100%
            )`,
            backgroundSize: "200% 200%",
            backgroundPosition: backgroundPosition,
          }}
        />
        
        {/* Base Image */}
        {image && (
          <img src={image} className="absolute inset-0 w-full h-full object-cover z-0" alt="Card" />
        )}

        {/* Content */}
        <div className="relative z-10 w-full h-full bg-black/60 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-end">
          {children}
        </div>
      </div>
    </div>
  );
}
