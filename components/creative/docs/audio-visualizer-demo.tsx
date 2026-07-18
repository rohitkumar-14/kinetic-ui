"use client";

import React from "react";
import { AudioVisualizer } from "@/components/creative/audio-visualizer";

export function AudioVisualizerDemo({ color = "#a855f7" }: { color?: string }) {
  // A public domain / royalty free audio file suitable for testing
  const SAMPLE_AUDIO = "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg";

  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center p-8 custom-scrollbar relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-black pointer-events-none" />
      
      <div className="z-10 text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Audio Visualizer</h2>
        <p className="text-zinc-400">Click play to initialize the Web Audio API.</p>
      </div>

      <AudioVisualizer 
        audioUrl={SAMPLE_AUDIO} 
        color={color}
        className="z-10"
      />
    </div>
  );
}
