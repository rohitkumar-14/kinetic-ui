"use client";

import React from "react";
import { AudioVisualizer3D } from "@/components/creative/audio-visualizer-3d";

export interface AudioVisualizer3DDemoProps {
  wireframe?: boolean;
  color?: string;
}

export function AudioVisualizer3DDemo({
  wireframe = true,
  color = "#10b981"
}: AudioVisualizer3DDemoProps) {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        <AudioVisualizer3D 
          key={`${wireframe}-${color}`}
          audioSrc="/sample.mp3" 
          color={color}
          wireframe={wireframe}
          className="h-[400px] w-full"
        />
        
        {/* Mock Album Overlay */}
        <div className="absolute top-6 left-6 pointer-events-none drop-shadow-md">
          <p className="text-white font-bold tracking-tight">
            {wireframe ? "Neon Dreams" : "Liquid State"}
          </p>
          <p className="text-sm font-medium" style={{ color: color }}>
            {wireframe ? "Synthwave Collective" : "Ambient Radio"}
          </p>
        </div>
      </div>
    </div>
  );
}
