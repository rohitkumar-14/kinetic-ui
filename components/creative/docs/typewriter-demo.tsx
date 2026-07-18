'use client';

import React from 'react';
import { Typewriter } from '@/components/creative/typewriter';

export function TypewriterDemo({ speed = 50, deleteSpeed = 30, waitTime = 2000, loop = true }: any) {
  const words = [
    "next-generation user interfaces.",
    "physics-based micro-interactions.",
    "highly scalable design systems.",
    "award-winning digital experiences."
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          We build <br className="md:hidden" />
          <span className="text-indigo-400">
            <Typewriter 
              text={words} 
              speed={speed} 
              deleteSpeed={deleteSpeed}
              waitTime={waitTime}
              loop={loop}
              cursorClassName="text-indigo-500"
            />
          </span>
        </h2>
        <p className="mt-6 text-zinc-400 font-medium max-w-lg mx-auto">
          The typewriter effect is perfect for landing page heroes where you want to highlight multiple value propositions without taking up vertical space.
        </p>
      </div>
    </div>
  );
}
