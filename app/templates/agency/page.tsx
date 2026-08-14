"use client";

import React, { useState } from "react";
import { LiquidGlassNav } from "@/components/creative/liquid-glass-nav";
import { PortalScroll } from "@/components/creative/portal-scroll";
import { SwipeableStack } from "@/components/creative/swipeable-stack";
import { MagneticButton } from "@/components/creative/magnetic-button";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "culture", label: "Culture" },
  { id: "contact", label: "Contact" },
];

const CARDS = [
  { id: "1", title: "Project Alpha", color: "bg-red-500", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: "2", title: "Project Beta", color: "bg-blue-500", imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2564&auto=format&fit=crop" },
  { id: "3", title: "Project Gamma", color: "bg-green-500", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop" },
];

export default function AgencyTemplate() {
  const [active, setActive] = useState("work");

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      
      {/* Sticky Liquid Nav */}
      <div className="fixed top-8 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <LiquidGlassNav items={NAV_ITEMS} activeId={active} onChange={setActive} />
        </div>
      </div>

      {/* Hero Portal Scroll */}
      <section className="relative w-full">
        <PortalScroll src="https://en.wikipedia.org/wiki/Creative_director" showBadge={false} />
      </section>

      {/* Selected Works Stack */}
      <section className="min-h-screen py-32 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="text-center mb-24 z-10">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Selected Works</h2>
          <p className="text-cyan-400 mt-4 font-mono tracking-widest text-sm">SWIPE TO EXPLORE</p>
        </div>

        <div className="relative z-20 w-full max-w-sm aspect-[3/4]">
          <SwipeableStack
            cards={CARDS.map(c => ({
              id: c.id,
              title: c.title,
              subtitle: "Selected Work",
              imageUrl: c.imageUrl
            }))}
            className="bg-transparent"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 flex flex-col items-center justify-center border-t border-white/10 relative overflow-hidden">
        <h2 className="text-5xl md:text-8xl font-black mb-16 text-center tracking-tighter max-w-3xl leading-tight">
          Let's build something <span className="italic font-light text-cyan-400">unreasonable</span>.
        </h2>
        
        <MagneticButton className="px-12 py-6 bg-white text-black rounded-full font-bold text-xl transition-transform hover:scale-110">
          Get in Touch
        </MagneticButton>
      </footer>

    </div>
  );
}
