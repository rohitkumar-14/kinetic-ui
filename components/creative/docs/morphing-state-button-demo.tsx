"use client";

import React from "react";
import { MorphingStateButton } from "@/components/creative/morphing-state-button";

export default function MorphingStateButtonDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Morphing State Button</h2>
          <p className="text-zinc-400">
            A production-ready micro-interaction button that physically morphs its layout during async operations.
          </p>
        </div>

        <MorphingStateButton 
          onClick={async () => {
            // Simulate an async action like a network request
            await new Promise(resolve => setTimeout(resolve, 2500));
          }} 
          idleText="Save Changes"
        />
      </div>
    </div>
  );
}
