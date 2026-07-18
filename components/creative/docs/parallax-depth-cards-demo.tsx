"use client";

import { ParallaxDepthCards } from "@/components/creative/parallax-depth-cards";

const mockCards = [
  {
    id: "1",
    title: "The Silent Forest",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    description: "Deep in the heart of the ancient woods, nature reclaims what was once lost. The silence here is heavy, broken only by the wind."
  },
  {
    id: "2",
    title: "Urban Geometry",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
    description: "Concrete mountains and glass valleys. The city breathes through its structured grid, a testament to modern human engineering."
  },
  {
    id: "3",
    title: "Neon Nights",
    category: "Cyberpunk",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2070&auto=format&fit=crop",
    description: "When the sun goes down, the electric glow takes over. A symphony of artificial lights painting the wet pavement in vibrant hues."
  },
  {
    id: "4",
    title: "Ocean's Edge",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop",
    description: "Where the unstoppable force meets the immovable object. The eternal dance between the roaring waves and the silent cliffs."
  }
];

export function ParallaxDepthCardsDemo({ itemCount = 4 }: { itemCount?: number }) {
  const items = mockCards.slice(0, itemCount);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      <div className="h-[600px] overflow-y-auto no-scrollbar pointer-events-auto relative">
        
        {/* Header Space */}
        <div className="h-[50vh] flex flex-col items-center justify-center text-white relative z-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Sticky Card Stack</h2>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Scroll down to stack &darr;</p>
        </div>

        {/* The Component */}
        {/* We add a wrapper to ensure the sticky context works properly within the scrollable demo container */}
        <div className="relative w-full">
          <ParallaxDepthCards items={items} />
        </div>

      </div>
    </div>
  );
}
