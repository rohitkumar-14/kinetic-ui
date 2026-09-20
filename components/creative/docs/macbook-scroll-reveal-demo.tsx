"use client";

import React from "react";
import { MacBookScrollReveal } from "../macbook-scroll-reveal";

export default function MacBookScrollRevealDemo() {
  return (
    <div className="w-full bg-neutral-950">
      <div className="h-[50vh] flex items-center justify-center border-b border-white/5">
        <p className="text-white/50 tracking-widest text-sm uppercase">Scroll down to reveal</p>
      </div>
      
      <MacBookScrollReveal 
        src="https://en.wikipedia.org/wiki/Creative_coding" 
        title="Discover the unseen."
        badge="INTERACTIVE 3D"
      />
      
      <div className="h-[50vh] flex items-center justify-center border-t border-white/5">
        <p className="text-white/50 tracking-widest text-sm uppercase">End of scroll</p>
      </div>
    </div>
  );
}
