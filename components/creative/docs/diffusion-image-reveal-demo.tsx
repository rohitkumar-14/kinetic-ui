"use client";

import React from "react";
import { DiffusionImageReveal } from "@/components/creative/diffusion-image-reveal";

export function DiffusionImageRevealDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-zinc-950 p-4 border border-border rounded-xl">
      <div className="w-full max-w-2xl h-[400px]">
        {/* Placeholder image from unsplash */}
        <DiffusionImageReveal 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
        />
      </div>
      <p className="text-zinc-500 text-sm mt-4 text-center">
        Scroll down or wait for the component to intersect to see the shader transition.
      </p>
    </div>
  );
}
