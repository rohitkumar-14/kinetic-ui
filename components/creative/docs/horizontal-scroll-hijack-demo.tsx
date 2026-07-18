import React from 'react';
import { HorizontalScrollHijack } from '@/components/creative/horizontal-scroll-hijack';

export function HorizontalScrollHijackDemo() {
  return (
    <div className="w-full h-[600px] overflow-y-auto bg-zinc-950 rounded-xl relative border border-white/10">
      <div className="h-[300px] flex items-center justify-center border-b border-white/10">
        <p className="text-muted-foreground font-mono">Scroll down \/</p>
      </div>
      <HorizontalScrollHijack>
        <div className="w-[100vw] h-[600px] shrink-0 flex items-center justify-center bg-indigo-500/10 text-4xl font-bold text-white">Section 1</div>
        <div className="w-[100vw] h-[600px] shrink-0 flex items-center justify-center bg-fuchsia-500/10 text-4xl font-bold text-white">Section 2</div>
        <div className="w-[100vw] h-[600px] shrink-0 flex items-center justify-center bg-emerald-500/10 text-4xl font-bold text-white">Section 3</div>
      </HorizontalScrollHijack>
      <div className="h-[500px] flex items-center justify-center border-t border-white/10">
        <p className="text-muted-foreground font-mono">End of timeline</p>
      </div>
    </div>
  );
}
