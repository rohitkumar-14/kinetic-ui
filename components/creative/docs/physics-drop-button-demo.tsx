'use client';

import React from 'react';
import { PhysicsDropButton } from '@/components/creative/physics-drop-button';

export function PhysicsDropButtonDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-2xl border border-zinc-800 my-6">
      <PhysicsDropButton>
        Interactive Liquid Slosh 💧
      </PhysicsDropButton>
    </div>
  );
}
