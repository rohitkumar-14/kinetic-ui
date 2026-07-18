'use client';

import React from 'react';
import { BrokenGrid, BrokenGridItem } from '@/components/creative/broken-grid';

export function BrokenGridDemo({ animate = true, gap = 4, columns = 12 }: any) {
  return (
    <div className="w-full min-h-[400px] overflow-x-auto rounded-xl border border-white/10 bg-zinc-950 p-4 sm:p-8 hidden-scrollbar">
      <div className="min-w-[768px]">
        <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-8 text-center">Desktop Grid View</div>
        <BrokenGrid columns={columns} gap={gap} animate={animate}>
          <BrokenGridItem colSpan={7} rowSpan={2} zIndex={1}>
          <div className="h-64 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-end p-6 shadow-xl">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-1">Featured</div>
              <h3 className="text-xl font-bold text-white">Hero Image Block</h3>
            </div>
          </div>
        </BrokenGridItem>
        
        <BrokenGridItem colSpan={5} zIndex={2} offsetY="20px">
          <div className="h-40 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-end p-5 shadow-xl">
            <span className="text-white text-sm font-bold">Overlapping Card</span>
          </div>
        </BrokenGridItem>

        <BrokenGridItem colSpan={5} zIndex={3} offsetX="-10px">
          <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-end p-5 shadow-xl">
            <span className="text-white text-sm font-bold">Offset Element</span>
          </div>
        </BrokenGridItem>

        <BrokenGridItem colSpan={4} zIndex={1}>
          <div className="h-48 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-end p-5 shadow-xl">
            <span className="text-white text-sm font-bold">Tall Block</span>
          </div>
        </BrokenGridItem>

        <BrokenGridItem colSpan={8} zIndex={2} offsetY="-15px">
          <div className="h-36 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-end p-5 shadow-xl">
            <span className="text-white text-sm font-bold">Wide Spanning Element</span>
          </div>
        </BrokenGridItem>
        </BrokenGrid>
      </div>
    </div>
  );
}
