"use client";

import React from "react";
import { ThreeDCardPeel } from "@/components/creative/3d-card-peel";

export default function ThreeDCardPeelDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">3D Card Peeling</h2>
          <p className="text-zinc-400 max-w-sm">
            Hover over the card to physically peel it off the background, revealing the hidden layers underneath.
          </p>
        </div>

        <ThreeDCardPeel 
          frontImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
          backImage="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop"
        />
      </div>

    </div>
  );
}
