'use client';

import React from 'react';
import { ParticleExplosionButton } from '@/components/creative/particle-explosion-button';

export function ParticleExplosionButtonDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-2xl border border-zinc-800 my-6">
      <ParticleExplosionButton>
        Click to Trigger Particle Burst ✨
      </ParticleExplosionButton>
    </div>
  );
}
