'use client';

import React, { useRef } from 'react';
import { HoverImagePreview } from '@/components/creative/hover-image-preview';

export function HoverImagePreviewDemo({ imageWidth = 350, imageHeight = 250 }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: "1",
      label: "Neon Nights",
      subtext: "Brand Identity",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=3270&auto=format&fit=crop"
    },
    {
      id: "2",
      label: "Aura Studio",
      subtext: "Web Development",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3164&auto=format&fit=crop"
    },
    {
      id: "3",
      label: "Nova Ecosystem",
      subtext: "UX/UI Design",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3164&auto=format&fit=crop"
    },
    {
      id: "4",
      label: "Synthwave",
      subtext: "Product Strategy",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=3270&auto=format&fit=crop"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[500px]"
    >
      <HoverImagePreview 
        items={projects} 
        containerRef={containerRef}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        className="max-w-4xl mx-auto mt-8"
      />
    </div>
  );
}
