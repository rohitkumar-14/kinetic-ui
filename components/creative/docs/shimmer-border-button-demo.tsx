'use client';

import React from 'react';
import { ShimmerBorderButton } from '@/components/creative/shimmer-border-button';

export function ShimmerBorderButtonDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-2xl border border-zinc-800 my-6">
      <ShimmerBorderButton>
        Shimmer Border Trace ✨
      </ShimmerBorderButton>
    </div>
  );
}
