"use client";

import { CoverFlowCarousel } from "@/components/creative/cover-flow-carousel";

const mockAlbums = [
  {
    id: "1",
    title: "Midnight City",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Neon Genesis",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Ethereal Space",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Quantum Flow",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Neural Network",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Cyberpunk 2077",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop"
  }
];

export function CoverFlowCarouselDemo() {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Cover Flow 3D</h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">Drag horizontally to rotate the carousel</p>
      </div>
      
      <CoverFlowCarousel 
        items={mockAlbums} 
        itemWidth={320}
      />
    </div>
  );
}
