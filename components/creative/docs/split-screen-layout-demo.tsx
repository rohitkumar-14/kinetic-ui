'use client';

import React from 'react';
import { SplitScreenLayout } from '@/components/creative/split-screen-layout';

export function SplitScreenLayoutDemo({ splitRatio = "50/50", stickySide = "left" }: any) {
  return (
    <div className="w-full h-[400px] overflow-y-auto rounded-xl border border-white/10 bg-zinc-950">
      <SplitScreenLayout
        splitRatio={splitRatio}
        stickySide={stickySide}
        stickyHeight="400px"
        leftContent={
          <div className="p-8 flex flex-col justify-center h-full min-h-[350px] bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-r border-white/10">
            <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">Pinned Side</div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Sticky Content</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              This side stays pinned to the viewport while the other side scrolls freely. Perfect for product showcases or split narratives.
            </p>
          </div>
        }
        rightContent={
          <div className="p-8 space-y-6 min-h-[350px]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-6 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center min-h-[150px]">
                <h4 className="font-bold text-white mb-2">Section {i}</h4>
                <p className="text-sm text-zinc-400 font-light">Scrollable content block {i} on the pane. Keep scrolling to see the left side remain pinned.</p>
              </div>
            ))}
            <div className="py-12 text-center text-zinc-600 text-sm">
              End of content
            </div>
          </div>
        }
      />
    </div>
  );
}
