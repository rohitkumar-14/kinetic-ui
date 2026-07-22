'use client';

import React from 'react';
import { MorphingSvgButton } from '@/components/creative/morphing-svg-button';

export function MorphingSvgButtonDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-2xl border border-zinc-800 my-6">
      <MorphingSvgButton label="Hover to Morph SVG" />
    </div>
  );
}
