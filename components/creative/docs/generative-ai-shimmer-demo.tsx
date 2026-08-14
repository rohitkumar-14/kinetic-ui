"use client";

import React, { useState, useEffect } from "react";
import { GenerativeAiShimmer } from "@/components/creative/generative-ai-shimmer";

export default function GenerativeAiShimmerDemo() {
  const [key, setKey] = useState(0);

  // Auto-replay the animation every 5 seconds for the demo
  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="max-w-2xl" key={key}>
        <GenerativeAiShimmer 
          text="The AI has successfully analyzed your codebase and discovered 3 major optimizations. It is currently compiling a comprehensive refactoring plan to reduce your bundle size by 40%." 
          className="text-2xl md:text-3xl font-medium tracking-tight"
        />
      </div>

    </div>
  );
}
