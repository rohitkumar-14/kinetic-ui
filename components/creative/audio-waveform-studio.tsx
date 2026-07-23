"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Square, Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AudioWaveformStudioProps {
  barColor?: string;
  barCount?: number;
  className?: string;
}

export function AudioWaveformStudio({
  barColor = "#818cf8",
  barCount = 48,
  className,
}: AudioWaveformStudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phases = Array.from({ length: barCount }, () => Math.random() * Math.PI * 2);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width / barCount) - 4;

      for (let i = 0; i < barCount; i++) {
        phases[i] += 0.05 + (i % 3) * 0.01;
        const activeMultiplier = isPlaying || isMicActive ? 1 : 0.15;
        const amplitude = (Math.sin(phases[i]) * 0.4 + 0.5) * height * 0.7 * activeMultiplier;
        
        const x = i * (barWidth + 4);
        const y = (height - amplitude) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + amplitude);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, "#c084fc");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, amplitude, 6);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [barCount, barColor, isPlaying, isMicActive]);

  return (
    <div className={cn("w-full bg-zinc-950 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 items-center shadow-2xl relative overflow-hidden", className)}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-white tracking-wide text-sm">Waveform Spectrum</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMicActive(!isMicActive)}
            className={cn("p-2 rounded-full border transition-colors", isMicActive ? "bg-red-500/20 border-red-500 text-red-400" : "bg-zinc-900 border-white/10 text-zinc-400")}
          >
            {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="w-full h-36 flex items-center justify-center bg-black/60 rounded-2xl border border-white/5 p-4">
        <canvas ref={canvasRef} width={600} height={120} className="w-full h-full" />
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl",
          isPlaying ? "bg-red-500 text-white hover:bg-red-600" : "bg-white text-black hover:bg-zinc-200"
        )}
      >
        {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        {isPlaying ? "Pause Spectrum" : "Start Waveform"}
      </button>
    </div>
  );
}
