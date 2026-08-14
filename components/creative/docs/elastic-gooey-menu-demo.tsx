"use client";

import React from "react";
import { ElasticGooeyMenu } from "@/components/creative/elastic-gooey-menu";

export default function ElasticGooeyMenuDemo() {
  return (
    <div className="w-full relative flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
      
      {/* Background Content to show menu overlaying */}
      <div className="text-center z-10 px-8">
        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Elastic Stretchy Menu</h2>
        <p className="text-zinc-400 max-w-lg mx-auto">
          Click the menu button in the top right. Watch how the SVG path physically stretches and snaps into place using bezier curve interpolation.
        </p>
      </div>

      {/* 
        Normally ElasticGooeyMenu is used at the root layout with fixed positioning.
        For this local demo, we force it absolute using wrapper styles inside the component if needed, 
        or just let it cover the whole viewport.
        Since it uses 'fixed', clicking the button will cover the whole screen, which is great for demos!
      */}
      <ElasticGooeyMenu 
        links={[
          { label: "Home", href: "#" },
          { label: "Work", href: "#" },
          { label: "Studio", href: "#" },
          { label: "Contact", href: "#" }
        ]}
      />

    </div>
  );
}
