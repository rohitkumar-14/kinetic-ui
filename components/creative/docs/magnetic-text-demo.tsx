"use client";

import React from "react";
import { MagneticText } from "@/components/creative/magnetic-text";

export default function MagneticTextDemo() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-zinc-950 border border-border rounded-xl">
      <div className="text-4xl md:text-6xl font-black text-white tracking-tighter">
        <MagneticText text="ATTRACTION" strength={40} />
      </div>
      <div className="text-xl md:text-2xl font-light text-zinc-500 mt-4 tracking-widest">
        <MagneticText text="IS INEVITABLE" strength={20} />
      </div>
      <p className="absolute bottom-8 text-zinc-600 text-sm">
        Hover over the text to pull the letters
      </p>
    </div>
  );
}
