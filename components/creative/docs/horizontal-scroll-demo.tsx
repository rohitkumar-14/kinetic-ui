"use client";

import { HorizontalScroll, ScrollCard } from "@/components/creative/horizontal-scroll";
import { MoveRight } from "lucide-react";
import { useRef } from "react";

const CARDS = [
  {
    id: 1,
    title: "Cinematic Horizons",
    description: "Explore the vast unknown in 4K resolution.",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Urban Jungle",
    description: "The concrete metropolis illuminated by neon.",
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d1b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Abstract Flow",
    description: "Fluid dynamics captured in real-time.",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Deep Space",
    description: "Nebulas and galaxies beyond our reach.",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Minimalist Geometry",
    description: "Clean lines and sharp contrasts.",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Final Frontier",
    description: "Where our journey ends, another begins.",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop",
  },
];

export function HorizontalScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 relative h-[600px] overflow-y-auto">
      <div className="flex h-48 items-center justify-center bg-zinc-900 border-b border-white/5">
        <span className="font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-4">
          Scroll Down <MoveRight className="w-4 h-4 rotate-90 animate-bounce" />
        </span>
      </div>
      
      {/* We pass the containerRef to allow useScroll to track this specific div */}
      <HorizontalScroll containerRef={containerRef as any} className="bg-zinc-950">
        {CARDS.map((card) => (
          <ScrollCard card={card} key={card.id} />
        ))}
      </HorizontalScroll>

      <div className="flex h-48 items-center justify-center bg-zinc-900 border-t border-white/5">
        <span className="font-semibold text-zinc-400 uppercase tracking-widest">
          End of Section
        </span>
      </div>
    </div>
  );
}
