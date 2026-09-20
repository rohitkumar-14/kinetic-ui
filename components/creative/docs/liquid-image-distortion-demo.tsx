"use client";

import React from "react";
import { LiquidImageDistortion } from "../liquid-image-distortion";

export default function LiquidImageDistortionDemo() {
  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 md:p-12 gap-8">
      <div className="max-w-2xl text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Liquid Distortion</h2>
        <p className="text-white/50">Hover and move your mouse over the image to interact with the WebGL fluid simulation.</p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        <LiquidImageDistortion 
          imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop"
          intensity={1.5}
          className="h-[500px] shadow-2xl shadow-indigo-500/10"
        />
      </div>
    </div>
  );
}
