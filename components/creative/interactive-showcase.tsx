'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './spotlight-card';
import { TiltCard } from './tilt-card';
import { MagneticButton } from './magnetic-button';
import { Sparkles, Code, MoveRight, Eye, ShieldAlert, Cpu } from 'lucide-react';

const marqueeItems1 = [
  'GSAP SCROLLTRIGGER', 'REACT THREE FIBER', 'Framer Motion v12', 'LENIS SMOOTH SCROLL',
  'CUSTOM GLSL SHADERS', 'RADIX UI PRIMITIVES', 'AURORA GLOW MESHES', 'GLASSMORPHISM'
];

const marqueeItems2 = [
  'CINEMATIC DESIGN', 'PRODUCTION READY', 'EXTREMELY FAST', 'ACCESSIBLE OUT OF THE BOX',
  'ZERO RUNTIME OVERHEAD', 'TYPESCRIPT SUPPORTED', 'AWWWARDS VIBES', 'PREMIUM TEMPLATES'
];

export function InteractiveShowcase() {
  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[35vw] h-[35vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 mb-6 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Playground Preview</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Touch. Hover. Feel.
          </h2>
          <p className="text-lg md:text-xl font-light text-zinc-400 max-w-2xl">
            Experience the tactile response of our UI components. Built with high-fidelity spring physics that mimic real-world inertia.
          </p>
        </div>
      </div>

      {/* Grid of Interactive Cards */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 z-10 relative">
        {/* Tilt Card 1 */}
        <TiltCard className="group border-white/5 bg-zinc-900/40 backdrop-blur-xl h-96 flex flex-col justify-between" tiltIntensity={12}>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Cpu className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">3D Tilt Physics</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Hover over this card and move your cursor. The card tilts dynamically using spring dampers, simulating physical mass and light reflections.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-indigo-400 gap-1 mt-6">
            <span>HOVER TO TILT</span>
            <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </TiltCard>

        {/* Spotlight Card 2 */}
        <SpotlightCard className="group border-white/5 bg-zinc-900/40 backdrop-blur-xl h-96 p-8 flex flex-col justify-between" spotlightColor="rgba(236, 72, 153, 0.15)">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
              <Eye className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Dynamic Spotlight</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              A light beam follows your pointer exactly, illuminating the glass borders and casting realistic radial lighting across dark layouts.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-pink-400 gap-1 mt-6">
            <span>MOVE CURSOR OVER CARD</span>
            <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>

        {/* Interactive Magnetic Box 3 */}
        <div className="group border border-white/5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl h-96 p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Code className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Magnetic Pull</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Hover over the action button below. The button detects cursor proximity and snaps toward it with elastic easing.
            </p>
          </div>
          
          <div className="flex justify-start mt-6">
            <MagneticButton className="h-12 px-6 rounded-full bg-cyan-400 text-black text-sm font-semibold hover:scale-105 transition-transform">
              Pull Me Closer
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Marquees */}
      <div className="relative flex flex-col gap-6 py-6 border-t border-b border-white/5 bg-zinc-950">
        {/* Marquee Row 1 (Scroll Left) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap select-none">
          <div className="flex gap-16 animate-marquee-left">
            {Array(3).fill(marqueeItems1).flat().map((item, idx) => (
              <span key={idx} className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-800 hover:text-white transition-colors duration-500 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Scroll Right) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap select-none">
          <div className="flex gap-16 animate-marquee-right">
            {Array(3).fill(marqueeItems2).flat().map((item, idx) => (
              <span key={idx} className="text-4xl md:text-6xl font-black tracking-tighter text-transparent stroke-text hover:text-white transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
