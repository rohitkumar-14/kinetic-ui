"use client";

import React, { useState } from "react";
import { ElasticDrawer } from "@/components/creative/elastic-drawer";

export function ElasticDrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-neutral-950 rounded-xl border border-white/10 relative overflow-hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-xl"
      >
        Open Elastic Drawer
      </button>

      {/* 
        Note: In a real app, ElasticDrawer renders in a React Portal or fixed to the viewport.
        For this isolated demo, we'll let it behave naturally fixed to the window.
      */}
      <ElasticDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Interactive Settings"
      />
    </div>
  );
}
