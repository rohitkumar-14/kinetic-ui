'use client';

import React from 'react';
import { AnimatedCounter, StatsSection } from '@/components/creative/animated-counter';

export function AnimatedCounterDemo({ duration = 2, direction = "up", value = 500 }: any) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8">
      <div className="text-center mb-8">
        <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">Animated Statistics</div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Numbers That Come Alive</h3>
      </div>
      
      {/* Re-mount on parameter change for preview purposes by passing key */}
      <div key={`${value}-${duration}-${direction}`}>
        <StatsSection
          stats={[
            { value: value, label: "Projects Shipped", prefix: "+" },
            { value: 99, label: "Client Satisfaction", suffix: "%" },
            { value: 2.5, label: "Revenue Generated", prefix: "$", suffix: "M", decimals: 1 },
            { value: 15, label: "Years Experience" },
          ]}
          className="text-white"
        />
      </div>
    </div>
  );
}
