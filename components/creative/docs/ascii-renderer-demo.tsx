"use client";

import React, { useState } from "react";
import { AsciiRenderer } from "@/components/creative/ascii-renderer";
import { Camera, Image as ImageIcon, Video, SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AsciiRendererDemoProps {
  mode?: "image" | "video" | "webcam";
  resolution?: number;
  color?: string;
  fontSize?: number;
}

export function AsciiRendererDemo({
  mode = "image",
  resolution = 120,
  color = "#22c55e",
  fontSize = 8
}: AsciiRendererDemoProps) {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden border-2 border-zinc-800 bg-black relative shadow-2xl group">
        
        {/* Decorative Terminal Header */}
        <div className="absolute top-0 left-0 w-full h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between z-10">
          <div className="flex items-center gap-2 text-zinc-500">
            <SquareTerminal className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest">Ascii_Renderer.exe [{mode}]</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
        </div>

        {/* Renderer Container */}
        <div className="pt-10 w-full flex justify-center bg-black min-h-[400px]">
          {mode === "image" && (
            <AsciiRenderer
              key={`image-${resolution}-${color}-${fontSize}`}
              src="/landscape_night_1782932469534.png"
              resolution={resolution}
              color={color}
              fontSize={fontSize}
            />
          )}

          {mode === "video" && (
            <AsciiRenderer
              key={`video-${resolution}-${color}-${fontSize}`}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              isVideo={true}
              resolution={resolution}
              color={color}
              fontSize={fontSize}
            />
          )}

          {mode === "webcam" && (
            <AsciiRenderer
              key={`webcam-${resolution}-${color}-${fontSize}`}
              useWebcam={true}
              resolution={resolution}
              color={color}
              fontSize={fontSize}
            />
          )}
        </div>
      </div>
      
      {mode === "webcam" && (
        <p className="text-zinc-500 text-sm font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Waiting for camera permissions...
        </p>
      )}
    </div>
  );
}
