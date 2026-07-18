'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Settings, Play } from 'lucide-react';
import { MagneticButton } from '@/components/creative/magnetic-button';

export default function AnimationsPage() {
  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Animation Architecture
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-4 text-white">
          Springs &amp; Physics
        </h1>
        <p className="text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Kinetic UI animations are powered by natural physics equations rather than linear durations, resulting in fluid interactions that match real-world weight and resistance.
        </p>
      </div>

      {/* Spring Physics interactive demonstration */}
      <section className="p-8 rounded-2xl border border-white/5 bg-zinc-950/50 space-y-6">
        <h2 id="interactive-springs" className="text-2xl font-bold text-white">Interactive Spring Mechanics</h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Hover over the button below to trigger the spring calculations. Observe how the element overshoots its target and bounces organically back to rest.
        </p>

        <div className="flex justify-center py-10 bg-black rounded-xl border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:16px_16px]" />
          <MagneticButton className="h-16 px-10 rounded-full bg-white text-black font-semibold text-base hover:scale-105 transition-transform">
            Try Physics Hover
          </MagneticButton>
        </div>
      </section>

      {/* Implementation details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
            <Cpu className="w-4.5 h-4.5" />
            <span>Framer Motion Springs</span>
          </div>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            By default, we utilize a spring config with high stiffness (150) and low damping (15) for mouse-repelling layouts. This results in snappy, responsive feedback without feeling sluggish.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Zap className="w-4.5 h-4.5" />
            <span>GPU Accelerated Transitions</span>
          </div>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            All position translates are committed using CSS `will-change: transform`. This offloads layout changes from the browser CPU straight to hardware GPU pipelines for a locked 60fps.
          </p>
        </div>
      </div>
    </div>
  );
}
