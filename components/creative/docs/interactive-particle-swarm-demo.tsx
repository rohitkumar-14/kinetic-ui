import React from 'react';
import { InteractiveParticleSwarm } from '@/components/creative/interactive-particle-swarm';

export function InteractiveParticleSwarmDemo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-xl border border-white/10 overflow-hidden relative">
      <InteractiveParticleSwarm particleCount={8000} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white text-4xl font-bold tracking-tighter mix-blend-overlay">HOVER SWARM</h2>
      </div>
    </div>
  );
}
