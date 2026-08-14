"use client";

import React from "react";
import { RetroGrid } from "@/components/creative/retro-grid";

export default function RetroGridDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-background border border-border rounded-xl relative overflow-hidden">
      
      {/* Background Grid */}
      <RetroGrid />
      
      {/* Foreground Content */}
      <div className="z-10 text-center flex flex-col items-center">
        <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-md">
          v2.0 Beta Live
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter max-w-xl">
          The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">design</span> is here.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md text-lg">
          Experience seamless animations, blazing fast performance, and beautiful retro aesthetics.
        </p>
        <button className="mt-8 px-8 py-3 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
      
    </div>
  );
}
