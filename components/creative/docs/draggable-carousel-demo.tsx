'use client';

import React from 'react';
import { DraggableCarousel } from '@/components/creative/draggable-carousel';

export function DraggableCarouselDemo() {
  const items = [
    { title: "Neon Nights", category: "Photography", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=3270&auto=format&fit=crop" },
    { title: "Aura Studio", category: "Branding", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3164&auto=format&fit=crop" },
    { title: "Nova", category: "Web Design", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3164&auto=format&fit=crop" },
    { title: "Synthwave", category: "3D Art", img: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=3270&auto=format&fit=crop" },
    { title: "Echo", category: "App Design", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=3270&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[500px] flex flex-col justify-center">
      <div className="mb-8 pl-4 border-l-2 border-indigo-500">
        <h3 className="text-2xl font-bold text-white mb-2">Featured Work</h3>
        <p className="text-zinc-400 font-medium">Click and drag horizontally to explore projects.</p>
      </div>

      <DraggableCarousel 
        items={items} 
        gap={24}
        className="w-full cursor-grab active:cursor-grabbing pb-8"
        itemClassName="w-[280px] md:w-[350px]"
        renderItem={(item) => (
          <div className="w-full group">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-zinc-900 border border-white/5 relative">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{item.title}</h4>
              <p className="text-sm text-zinc-500 font-medium">{item.category}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
