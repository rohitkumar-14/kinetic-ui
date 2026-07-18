"use client";

import React from "react";
import { GlassVideoPlayer } from "@/components/creative/glass-video-player";

export function GlassVideoPlayerDemo() {
  return (
    <div className="w-full bg-[#0A0A0A] rounded-xl border border-white/10 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto space-y-6 text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Premium Media Player</h2>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm">
          A completely custom, framer-motion powered video player. Features include auto-hiding glass controls, smooth volume sliders, and full-screen support.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto shadow-2xl">
        <GlassVideoPlayer 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          autoPlay
          loop
          muted
          className="aspect-video w-full border border-white/10 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]"
        />
      </div>
    </div>
  );
}
