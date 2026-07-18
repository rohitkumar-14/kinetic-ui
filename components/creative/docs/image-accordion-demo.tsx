"use client";

import { ImageAccordion } from "@/components/creative/image-accordion";

const mockAccordionItems = [
  {
    id: "1",
    title: "The Vision",
    subtitle: "Phase 01",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Architecture",
    subtitle: "Phase 02",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Engineering",
    subtitle: "Phase 03",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Deployment",
    subtitle: "Phase 04",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Scale",
    subtitle: "Phase 05",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop"
  }
];

export function ImageAccordionDemo() {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 p-4 md:p-8 flex flex-col items-center">
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Fluid Accordion</h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">Hover over the image strips to expand them</p>
      </div>
      
      <ImageAccordion 
        items={mockAccordionItems} 
        className="h-[400px] md:h-[600px] max-w-6xl mx-auto rounded-3xl"
      />

    </div>
  );
}
