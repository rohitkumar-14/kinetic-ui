"use client";

import { HorizontalScrollPin } from "@/components/creative/horizontal-scroll-pin";

const mockItems = [
  {
    id: "1",
    title: "Phase 01: Concept",
    description: "Every great project begins with a single idea. We explore the boundaries of what is possible before writing a single line of code.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Phase 02: Design",
    description: "Translating concepts into visual language. We focus on typography, spatial relationships, and motion to create stunning interfaces.",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Phase 03: Build",
    description: "Where design meets engineering. Bringing static pixels to life with butter-smooth animations and robust architecture.",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Phase 04: Launch",
    description: "The final push. Optimizing for performance, accessibility, and SEO before introducing our work to the world.",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
  }
];

export function HorizontalScrollPinDemo({ itemCount = 4 }: { itemCount?: number }) {
  const items = mockItems.slice(0, itemCount);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      <div className="h-[600px] overflow-y-auto no-scrollbar pointer-events-auto relative">
        
        {/* Intro space */}
        <div className="h-screen flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Horizontal Scroll Pin</h2>
          <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto leading-relaxed">
            Keep scrolling down. The container will pin to the screen and translate your vertical scroll into horizontal movement.
          </p>
          <div className="mt-12 animate-bounce opacity-50">&darr;</div>
        </div>

        {/* The pinned component */}
        <HorizontalScrollPin items={items} />

        {/* Outro space */}
        <div className="h-[50vh] flex items-center justify-center text-zinc-500 font-mono text-sm">
          End of horizontal section.
        </div>

      </div>
    </div>
  );
}
