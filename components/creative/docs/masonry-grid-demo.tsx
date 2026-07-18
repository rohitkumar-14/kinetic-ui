'use client';

import React from 'react';
import { MasonryGrid } from '@/components/creative/masonry-grid';

const items = [
  { h: 'h-48', color: 'from-indigo-500 to-purple-500', label: 'Photography' },
  { h: 'h-64', color: 'from-pink-500 to-rose-500', label: 'Branding' },
  { h: 'h-40', color: 'from-emerald-500 to-teal-500', label: 'UI Design' },
  { h: 'h-56', color: 'from-amber-500 to-orange-500', label: 'Development' },
  { h: 'h-44', color: 'from-cyan-500 to-blue-500', label: 'Motion' },
  { h: 'h-52', color: 'from-violet-500 to-purple-500', label: 'Illustration' },
  { h: 'h-36', color: 'from-rose-500 to-pink-500', label: 'Typography' },
  { h: 'h-60', color: 'from-blue-500 to-indigo-500', label: 'Architecture' },
];

export function MasonryGridDemo({ gap = 4, animate = true, columnWidth = 250 }: any) {
  return (
    <div className="w-full">
      <MasonryGrid
        columnWidth={columnWidth}
        gap={gap}
        animate={animate}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`${item.h} rounded-xl bg-gradient-to-br ${item.color} flex items-end p-4 shadow-lg`}
          >
            <span className="text-white text-sm font-bold">{item.label}</span>
          </div>
        ))}
      </MasonryGrid>
    </div>
  );
}
