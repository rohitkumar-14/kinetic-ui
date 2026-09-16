"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripVertical, Bot, Sparkles } from "lucide-react";

interface LlmCompareSliderProps {
  modelA_Name?: string;
  modelB_Name?: string;
  modelA_Content?: React.ReactNode;
  modelB_Content?: React.ReactNode;
  className?: string;
}

export function LlmCompareSlider({
  modelA_Name = "GPT-4",
  modelB_Name = "Claude 3 Opus",
  modelA_Content,
  modelB_Content,
  className,
}: LlmCompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  // Fallback demo content
  const defaultContentA = (
    <div className="space-y-4">
      <p>Here is a generic explanation of quantum computing:</p>
      <p>Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers.</p>
      <div className="p-3 bg-neutral-900 rounded-md border border-neutral-800 font-mono text-sm text-neutral-300">
        Time: 2.4s | Tokens: 45
      </div>
    </div>
  );

  const defaultContentB = (
    <div className="space-y-4">
      <p>Here is an <span className="text-emerald-400 bg-emerald-400/10 px-1 rounded">intuitive</span> explanation of quantum computing:</p>
      <p>Think of classical computing as a coin that can only show <span className="text-emerald-400 bg-emerald-400/10 px-1 rounded">Heads or Tails</span>. Quantum computing is like a coin <span className="text-emerald-400 bg-emerald-400/10 px-1 rounded">spinning in the air</span>—it can represent multiple states simultaneously.</p>
      <div className="p-3 bg-neutral-900 rounded-md border border-neutral-800 font-mono text-sm text-neutral-300">
        Time: 1.8s | Tokens: 62
      </div>
    </div>
  );

  const contentA = modelA_Content || defaultContentA;
  const contentB = modelB_Content || defaultContentB;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] select-none rounded-xl overflow-hidden border border-white/10 bg-neutral-950 font-sans",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
    >
      {/* Background Layer: Model A */}
      <div className="absolute inset-0 p-6 flex flex-col bg-neutral-950 text-neutral-200">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10 text-neutral-400">
          <Bot size={18} />
          <span className="font-semibold">{modelA_Name}</span>
        </div>
        <div className="flex-1 pr-6 max-w-[90%]">
          {contentA}
        </div>
      </div>

      {/* Foreground Layer: Model B (clipped) */}
      <div 
        className="absolute inset-0 p-6 flex flex-col bg-neutral-900 text-neutral-200 pointer-events-none border-r border-indigo-500/30 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10 text-indigo-300">
          <Sparkles size={18} />
          <span className="font-semibold">{modelB_Name}</span>
        </div>
        <div className="flex-1 pr-6 max-w-[90%]">
          {contentB}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-indigo-500 cursor-ew-resize hover:bg-indigo-400 transition-colors"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-indigo-600 rounded-md flex items-center justify-center shadow-lg border border-indigo-400">
          <GripVertical size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}
