"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassPrismProps {
  children?: React.ReactNode;
  className?: string;
}

export function GlassPrism({ children, className }: GlassPrismProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX((-y / rect.height) * 25);
    setRotateY((x / rect.width) * 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "relative w-72 h-96 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center p-6 text-center select-none cursor-pointer",
        className
      )}
    >
      {/* Chromatic Prism Refraction Specular */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-pink-500/20 to-indigo-500/20 opacity-80 pointer-events-none mix-blend-color-dodge" />
      <div className="relative z-10">{children || <span className="text-xl font-black tracking-tight text-white drop-shadow-md">CHROMATIC PRISM</span>}</div>
    </motion.div>
  );
}
