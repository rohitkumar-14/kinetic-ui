'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ParallaxCurtainRevealProps {
  className?: string;
  imageTop?: string;
  imageBottom?: string;
  title?: string;
  subtitle?: string;
}

export function ParallaxCurtainReveal({
  className,
  imageTop = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  imageBottom = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
  title = "Curtain Reveal",
  subtitle = "Hover or drag slider to reveal the dual-layer background artwork",
}: ParallaxCurtainRevealProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn('relative h-[450px] w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-black select-none cursor-ew-resize', className)}
    >
      {/* Bottom Layer */}
      <img src={imageBottom} alt="Bottom Layer" className="absolute inset-0 w-full h-full object-cover" />

      {/* Top Curtain Layer with Clip Path */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={imageTop} alt="Top Layer" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Title Overlay */}
      <div className="absolute bottom-6 left-6 z-20 max-w-md p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white pointer-events-none">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-xs text-zinc-300 font-light mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
