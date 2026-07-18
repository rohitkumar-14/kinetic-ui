'use client';

import React, { useRef } from 'react';
import { CursorTrail } from '@/components/creative/cursor-trail';

export function CursorTrailDemo({ color = "#6366f1", size = 150, blur = 50 }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col items-center justify-center group"
    >
      <CursorTrail 
        containerRef={containerRef} 
        color={color} 
        size={size} 
        blur={blur} 
        springConfig={{ stiffness: 80, damping: 25 }}
      />
      
      <div className="relative z-10 text-center pointer-events-none">
        <h3 className="text-4xl font-black text-white tracking-tighter mix-blend-difference mb-4">
          Move Your Cursor
        </h3>
        <p className="text-zinc-400 font-medium max-w-sm mx-auto mix-blend-difference">
          Notice the elastic gradient orb smoothly trailing behind your mouse movements.
        </p>
      </div>
    </div>
  );
}
