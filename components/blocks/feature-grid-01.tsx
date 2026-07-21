'use client';

// Requires: npx @kinetic-ui/cli add bento-grid tilt-card magnetic-button
import React from 'react';
import { BentoGrid, BentoCard } from '@/components/creative/bento-grid';
import { TiltCard } from '@/components/creative/tilt-card';
import { Layers, Zap, Shield, Cpu, Code2, Globe } from 'lucide-react';

export function FeatureGrid01() {
  return (
    <section className="w-full py-24 bg-black relative">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Everything you need to build <span className="text-indigo-400">faster</span>.
          </h2>
          <p className="text-zinc-400 text-lg">
            Stop reinventing the wheel. Use our pre-built components to scaffold your application in minutes, not days.
          </p>
        </div>

        <BentoGrid className="mb-12">
          {/* Main large card */}
          <BentoCard
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            title="Advanced Fluid Animations"
            description="Built on top of Framer Motion and GSAP, every component is rigorously tested for 60fps performance across all devices."
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            header={
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_60%)] pointer-events-none" />
                <TiltCard tiltIntensity={20} className="w-64 h-48 bg-zinc-900 border-white/5 flex items-center justify-center">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-12 h-12 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-12 h-12 rotate-45 bg-cyan-500 animate-bounce" />
                  </div>
                </TiltCard>
              </div>
            }
          />

          {/* Small card 1 */}
          <BentoCard
            title="TypeScript Ready"
            description="Strictly typed components with interfaces exported for easy extension."
            icon={<Code2 className="w-6 h-6 text-blue-400" />}
          />

          {/* Small card 2 */}
          <BentoCard
            title="Accessible by Default"
            description="Built using Radix UI primitives ensuring WAI-ARIA compliance."
            icon={<Shield className="w-6 h-6 text-emerald-400" />}
          />

          {/* Wide card */}
          <BentoCard
            className="md:col-span-2 min-h-[250px]"
            title="Global CDN Edge Network"
            description="Deploy anywhere. Our static generation approach ensures zero layout shift and instant load times on edge networks."
            icon={<Globe className="w-6 h-6 text-cyan-400" />}
            header={
              <div className="w-full h-full bg-zinc-950 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)]" />
                <div className="absolute left-2/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(103,232,249,1)]" />
                <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,1)]" />
              </div>
            }
          />

          {/* Small card 3 */}
          <BentoCard
            title="Zero Dependencies"
            description="No bloated NPM packages. Copy and paste what you need directly into your codebase."
            icon={<Cpu className="w-6 h-6 text-purple-400" />}
          />
        </BentoGrid>
      </div>
    </section>
  );
}
