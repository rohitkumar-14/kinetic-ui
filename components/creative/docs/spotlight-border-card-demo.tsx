'use client';

import React from 'react';
import { SpotlightBorderCard } from '@/components/creative/spotlight-border-card';
import { Sparkles } from 'lucide-react';

export function SpotlightBorderCardDemo() {
  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <SpotlightBorderCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Spatial Spotlight Card</h3>
            <p className="text-xs text-zinc-400 font-light">Move your cursor over the card surface</p>
          </div>
        </div>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          SpotlightBorderCard dynamically tracks cursor coordinates to render a luminous radial spotlight border glow. Perfect for dark-mode SaaS features and bento grids.
        </p>
      </SpotlightBorderCard>
    </div>
  );
}
