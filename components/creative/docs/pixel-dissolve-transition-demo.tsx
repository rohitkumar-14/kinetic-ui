"use client";

import React, { useState } from "react";
import { PixelDissolveTransition } from "@/components/creative/pixel-dissolve-transition";

export default function PixelDissolveTransitionDemo() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState<"A" | "B">("A");

  const handleTrigger = () => {
    if (isTriggered) return;
    setIsTriggered(true);
    
    // The dissolve animation takes roughly 800ms to cover the screen.
    // Switch the content right as the screen is fully covered by pixels.
    setTimeout(() => {
      setCurrentPage(prev => prev === "A" ? "B" : "A");
    }, 800);
  };

  const handleAnimationComplete = () => {
    setIsTriggered(false);
  };

  return (
    <div className="w-full h-[60vh] bg-background border border-border rounded-xl relative overflow-hidden">
      <PixelDissolveTransition 
        isTriggered={isTriggered}
        onAnimationComplete={handleAnimationComplete}
        gridSize={12} // 12x12 grid = 144 pixels
        pixelColor="#18181b" // zinc-900
      >
        <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${currentPage === 'A' ? 'bg-zinc-50' : 'bg-emerald-50'}`}>
          <h2 className="text-4xl font-black text-zinc-900 mb-4">
            {currentPage === "A" ? "Level 1" : "Level 2"}
          </h2>
          <p className="text-zinc-500 mb-8 max-w-sm text-center">
            {currentPage === "A" 
              ? "Click the button to transition via a pixelated dissolve effect." 
              : "You have arrived at the second level. The pixels scattered away to reveal this."}
          </p>
          <button 
            onClick={handleTrigger}
            className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Start Transition
          </button>
        </div>
      </PixelDissolveTransition>
    </div>
  );
}
