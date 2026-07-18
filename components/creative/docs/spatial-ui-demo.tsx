"use client";

import React from "react";
import { SpatialCard, SpatialButton } from "@/components/creative/spatial-ui";
import { Eye, AppWindow, Cpu } from "lucide-react";

export function SpatialUIDemo() {
  return (
    <div className="w-full h-[600px] bg-[#0A0A0A] rounded-xl border border-white/10 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Background Gradient (Subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(120,119,198,0.1),_transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-lg">
        <SpatialCard className="w-full h-80">
          <div className="flex flex-col h-full justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">VisionOS</h3>
                  <p className="text-white/50 text-xs">Spatial Computing</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-light tracking-tight text-white">
                Immersive Interfaces
              </h2>
              <p className="text-white/60 text-sm max-w-xs mx-auto">
                Hover over this card to interact with the 3D depth, specular highlights, and magnetic buttons.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-4">
              <SpatialButton className="bg-indigo-500/80 border-indigo-400/50 flex items-center gap-2">
                <AppWindow className="w-4 h-4" />
                <span>Launch App</span>
              </SpatialButton>
              <SpatialButton className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Settings</span>
              </SpatialButton>
            </div>
          </div>
        </SpatialCard>
      </div>
    </div>
  );
}
