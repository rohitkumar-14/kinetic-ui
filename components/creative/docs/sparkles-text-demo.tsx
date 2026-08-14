"use client";

import React from "react";
import { SparklesText } from "@/components/creative/sparkles-text";

export default function SparklesTextDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-background border border-border rounded-xl">
      <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
        Ship your ideas with{" "}
        <SparklesText 
          text="Magic" 
          colors={{ first: "#FFD700", second: "#FF4500" }} 
          className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
        />
      </h2>
      <p className="text-muted-foreground mt-4 max-w-sm text-center">
        Add that extra bit of delight to your typography with dynamic, physics-based SVG sparkles.
      </p>
    </div>
  );
}
