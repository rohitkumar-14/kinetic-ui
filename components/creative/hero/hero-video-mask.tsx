'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface HeroVideoMaskProps {
  className?: string;
  headline?: string;
  videoUrl?: string;
}

export function HeroVideoMask({
  className,
  headline = "CREATIVE MOTION",
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flow-of-liquid-energy-42934-large.mp4",
}: HeroVideoMaskProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative min-h-[500px] w-full overflow-hidden bg-black text-white flex items-center justify-center p-8 rounded-3xl border border-zinc-800 select-none cursor-pointer', className)}
    >
      {/* Background Video (Revealed through cursor clip mask) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0.25,
          clipPath: isHovered
            ? `circle(220px at ${mousePos.x}px ${mousePos.y}px)`
            : 'circle(0px at 50% 50%)',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline Overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white mix-blend-difference">
          {headline}
        </h1>
        <p className="mt-4 text-zinc-400 text-sm font-light tracking-widest uppercase">
          Hover to reveal dynamic liquid video mask
        </p>
      </div>
    </section>
  );
}
