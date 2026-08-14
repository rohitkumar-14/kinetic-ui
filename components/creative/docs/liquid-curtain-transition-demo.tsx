"use client";

import React, { useState } from "react";
import { LiquidCurtainTransition } from "@/components/creative/liquid-curtain-transition";

export default function LiquidCurtainTransitionDemo() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState<"A" | "B">("A");

  const handleTrigger = () => {
    if (isTriggered) return;
    setIsTriggered(true);
    
    // The enter animation takes 0.8s. Switch the content right as the screen is fully black.
    setTimeout(() => {
      setCurrentPage(prev => prev === "A" ? "B" : "A");
    }, 800);
  };

  const handleAnimationComplete = () => {
    setIsTriggered(false);
  };

  return (
    <div className="w-full h-[60vh] bg-background border border-border rounded-xl relative overflow-hidden">
      <LiquidCurtainTransition 
        isTriggered={isTriggered}
        onAnimationComplete={handleAnimationComplete}
        fill="#18181b" // zinc-900
      >
        {/* We just render the current page here. The component handles snapshotting implicitly 
            by keeping children rendered until the curtain covers them, but in our simple demo
            we just flip the state when the animation completes (which happens after exit).
            Wait, if we flip the state after exit, the new page will just pop in.
            We should flip the page content DURING the transition, i.e., when the screen is fully covered. 
            The LiquidCurtainTransition handles internal `showContent` state, so whatever children we pass 
            is always rendered as the "new" content. But we need to pass different children.
            Actually, let's just make the demo children change when `currentPage` changes, 
            and we change `currentPage` WHEN the button is clicked. 
            Wait, if we change `currentPage` immediately, it pops. 
            Let's update the `LiquidCurtainTransition` to accept a `triggerTransition` prop and manage its own children internally, 
            or we can just do a hacky timeout in the demo.
            Let's use a timeout for the demo, since the curtain takes 0.8s to fall. */}
        
        <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${currentPage === 'A' ? 'bg-zinc-50' : 'bg-zinc-100'}`}>
          <h2 className="text-4xl font-black text-zinc-900 mb-4">
            {currentPage === "A" ? "Home Page" : "About Page"}
          </h2>
          <p className="text-zinc-500 mb-8 max-w-sm text-center">
            {currentPage === "A" 
              ? "This is the initial page content. Click the button to transition." 
              : "You have arrived at the second page. Notice the smooth liquid sweep."}
          </p>
          <button 
            onClick={handleTrigger}
            className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            Go to {currentPage === "A" ? "About" : "Home"}
          </button>
        </div>
      </LiquidCurtainTransition>
    </div>
  );
}
