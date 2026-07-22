'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Layers, MousePointer } from 'lucide-react';

export interface HeroInfiniteCanvasProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function HeroInfiniteCanvas({
  className,
  title = "Spatial Canvas Playground",
  subtitle = "Drag anywhere to pan across the infinite canvas. Click or hover spatial nodes to interact.",
}: HeroInfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: 1, title: 'WebGL Shaders', tag: 'Shader Engine', icon: Sparkles, x: -220, y: -120 },
    { id: 2, title: 'Spatial UI Nodes', tag: 'Interactions', icon: Layers, x: 180, y: -160 },
    { id: 3, title: 'Physics Dock', tag: '2D Dynamics', icon: MousePointer, x: -160, y: 140 },
    { id: 4, title: 'Motion Motion', tag: 'Framer Motion', icon: Sparkles, x: 200, y: 120 },
  ];

  return (
    <section className={cn('relative h-[600px] w-full overflow-hidden bg-black text-white rounded-3xl border border-zinc-800 cursor-grab active:cursor-grabbing select-none', className)}>
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Draggable Canvas Layer */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
        dragElastic={0.1}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Center Intro Card */}
        <div className="relative z-10 max-w-md text-center p-8 bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 rounded-3xl shadow-2xl pointer-events-none">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-4">
            Interactive Infinite Surface
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">{title}</h2>
          <p className="text-zinc-400 text-xs font-light leading-relaxed">{subtitle}</p>
        </div>

        {/* Floating Spatial Cards */}
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.08, zIndex: 30 }}
              style={{ x: card.x, y: card.y }}
              className="absolute p-5 w-60 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md cursor-pointer hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{card.tag}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{card.title}</h4>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
