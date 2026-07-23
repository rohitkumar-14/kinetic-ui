"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HolographicFoilCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HolographicFoilCard({
  title = "SPECIAL EDITION",
  subtitle = "Kinetic Holographic Foil #001",
  className,
}: HolographicFoilCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative w-72 h-96 rounded-3xl border border-white/20 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col justify-between p-6 select-none cursor-pointer",
        className
      )}
    >
      {/* Holographic Specular Reflective Layer */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-color-dodge pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(255,0,128,0.8), rgba(0,255,255,0.8) 40%, rgba(255,255,0,0.8) 80%, transparent)`,
        }}
      />

      <div className="flex items-center justify-between z-10">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded-full border border-white/10">
          RARE
        </span>
      </div>

      <div className="z-10">
        <h4 className="text-xl font-black text-white uppercase tracking-tight">{title}</h4>
        <p className="text-xs text-zinc-400 font-mono mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}
