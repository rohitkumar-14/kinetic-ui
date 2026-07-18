'use client';

import React from 'react';
import { BeforeAfterSlider } from '@/components/creative/before-after-slider';

export function BeforeAfterSliderDemo({ defaultValue = 50 }: any) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl aspect-[16/9] shadow-2xl relative">
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3269&auto=format&fit=crop"
          afterImage="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=3270&auto=format&fit=crop"
          beforeLabel="Original Room"
          afterLabel="Renovated Concept"
          defaultValue={defaultValue}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
