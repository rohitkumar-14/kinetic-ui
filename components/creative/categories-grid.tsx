'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoCard } from './bento-grid';
import { Sparkles, Layout, Compass, Navigation, Type, Layers, Box, Maximize } from 'lucide-react';

export function CategoriesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Custom component-like visual previews for the headers
  const renderHeader = (index: number) => {
    const isHovered = hoveredIndex === index;

    switch (index) {
      case 0: // Hero Components
        return (
          <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <motion.div 
              animate={isHovered ? { y: -5, scale: 1.05 } : { y: 15, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="w-11/12 h-20 rounded-t-xl bg-zinc-900 border border-white/10 p-2 flex flex-col gap-1.5 shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
                <div className="w-12 h-2 rounded-full bg-white/10" />
              </div>
              <div className="w-2/3 h-3 bg-indigo-500/20 rounded" />
              <div className="w-1/2 h-2 bg-white/10 rounded" />
              <div className="w-1/3 h-2 bg-white/5 rounded" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20 pointer-events-none" />
          </div>
        );

      case 1: // Navigation
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <motion.div 
              animate={isHovered ? { scale: 1.05, border: '1px solid rgba(168, 85, 247, 0.4)' } : { scale: 1, border: '1px solid rgba(255, 255, 255, 0.05)' }}
              className="px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md flex gap-4 items-center text-[10px] text-zinc-400"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              <span className={isHovered ? 'text-purple-400 font-medium' : ''}>Home</span>
              <span>Docs</span>
              <span>Pricing</span>
            </motion.div>
          </div>
        );

      case 2: // Scroll Effects
        return (
          <div className="w-full h-full bg-zinc-950 flex flex-col justify-center p-4 relative overflow-hidden">
            <div className="h-full flex flex-col gap-2 relative">
              <motion.div 
                animate={isHovered ? { y: -20 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full flex flex-col gap-2"
              >
                <div className="w-full h-8 rounded-lg bg-zinc-900 border border-white/5 p-2 flex items-center text-[10px] text-zinc-500">
                  Section Background
                </div>
                <div className="w-full h-8 rounded-lg bg-zinc-900 border border-white/5 p-2 flex items-center text-[10px] text-zinc-500 relative">
                  <div className="absolute right-4 w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/50" />
                  Parallax Bubble
                </div>
                <div className="w-full h-8 rounded-lg bg-zinc-900 border border-white/5 p-2 flex items-center text-[10px] text-zinc-500">
                  Footer Reveal
                </div>
              </motion.div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
          </div>
        );

      case 3: // Motion Components
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <motion.div 
              animate={isHovered ? { 
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ["20%", "50%", "20%", "50%", "20%"] 
              } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl"
            />
          </div>
        );

      case 4: // Text Effects
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="text-xl font-bold tracking-tight flex gap-0.5">
              {"REVEAL".split("").map((letter, i) => (
                <motion.span 
                  key={i}
                  animate={isHovered ? { y: [-5, 5, -5] } : { y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05, repeat: isHovered ? Infinity : 0 }}
                  className="text-transparent bg-clip-text bg-gradient-to-t from-indigo-400 to-white"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        );

      case 5: // 3D Components
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden" style={{ perspective: '400px' }}>
            <motion.div
              animate={isHovered ? { rotateY: 360, rotateX: 360 } : { rotateY: 45, rotateX: 45 }}
              transition={isHovered ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
              className="w-10 h-10 border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Back side or face indicators */}
              <div className="absolute inset-0 border border-cyan-400/30 flex items-center justify-center text-[8px] text-cyan-400">
                3D
              </div>
            </motion.div>
          </div>
        );

      case 6: // Background Effects
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <motion.div 
              animate={isHovered ? { scale: [1, 1.4, 0.8, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-24 h-24 rounded-full bg-indigo-500/10 blur-xl"
            />
            <motion.div 
              animate={isHovered ? { scale: [1, 0.8, 1.4, 0.9, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-20 h-20 rounded-full bg-cyan-500/10 blur-xl"
            />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        );

      case 7: // Page Transitions
        return (
          <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-24 h-16 rounded bg-zinc-900 border border-white/5 relative overflow-hidden flex items-center justify-center">
              <motion.div 
                animate={isHovered ? { x: ['-100%', '0%', '100%'] } : { x: '-100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
                className="absolute inset-y-0 left-0 w-full bg-indigo-500 z-10"
              />
              <span className="text-[8px] text-zinc-500">Page A</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const categories = [
    { title: "Hero Components", desc: "Bold cinematic load intros that set the tone.", icon: <Layout className="w-5 h-5 text-indigo-400" /> },
    { title: "Navigation Modules", desc: "Fluid floating sidebars and dynamic menus.", icon: <Navigation className="w-5 h-5 text-purple-400" /> },
    { title: "Scroll Effects", desc: "Pinned timelines and organic parallax panels.", icon: <Compass className="w-5 h-5 text-pink-400" /> },
    { title: "Motion Controls", desc: "Spring physics drag/drop & layout animation.", icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { title: "Kinetic Text", desc: "Scramble reveal, letter fall, and hover splices.", icon: <Type className="w-5 h-5 text-emerald-400" /> },
    { title: "WebGL & 3D", desc: "R3F canvases, lighting rigs, custom shaders.", icon: <Box className="w-5 h-5 text-cyan-400" /> },
    { title: "Atmosphere", desc: "Aurora glows, particles, mesh background effects.", icon: <Layers className="w-5 h-5 text-rose-400" /> },
    { title: "Page Transitions", desc: "Cinematic overlay slides and frame morphing.", icon: <Maximize className="w-5 h-5 text-blue-400" /> }
  ];

  return (
    <section className="py-32 bg-black text-white relative">
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-indigo-400 font-semibold tracking-widest text-xs uppercase block mb-3">Modular Library</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Browse By Category
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light">
            Each family is engineered separately to keep bundles lightweight, maintaining full layout integration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <BentoGrid className="grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            // Distribute bento sizes
            const colSpan = [
              "@md:col-span-2",
              "@md:col-span-1",
              "@md:col-span-1",
              "@md:col-span-1",
              "@md:col-span-2",
              "@md:col-span-1",
              "@md:col-span-2",
              "@md:col-span-2"
            ];

            return (
              <div 
                key={idx} 
                className={colSpan[idx]}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <BentoCard
                  className="h-full border-white/5 bg-zinc-950 hover:border-indigo-500/30 group"
                  header={renderHeader(idx)}
                  icon={cat.icon}
                  title={cat.title}
                  description={cat.desc}
                />
              </div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
