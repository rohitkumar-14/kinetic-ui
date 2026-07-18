"use client";

import React, { useState, useEffect } from "react";
import { AnimatedCircularProgress, CircularProgressTheme } from "@/components/creative/animated-circular-progress";
import { Play, RotateCcw, Plus, Minus, Cpu, HardDrive, Wifi, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedCircularProgressDemo() {
  // Live stats values
  const [cpuVal, setCpuVal] = useState(42);
  const [ramVal, setRamVal] = useState(68);
  const [diskVal, setDiskVal] = useState(85);
  const [netVal, setNetVal] = useState(25);

  const [isPlaying, setIsPlaying] = useState(true);

  // Simulation interval for values
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCpuVal((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return Math.min(Math.max(prev + delta, 5), 98);
      });
      setRamVal((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return Math.min(Math.max(prev + delta, 40), 95);
      });
      setNetVal((prev) => {
        const delta = Math.floor(Math.random() * 15) - 7;
        return Math.min(Math.max(prev + delta, 10), 99);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setCpuVal(42);
    setRamVal(68);
    setDiskVal(85);
    setNetVal(25);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── Demo Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-white/5 bg-zinc-950/40 backdrop-blur-md">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Live Simulation</span>
          <span className="text-xs font-semibold text-zinc-200">Interactive Dashboard Widget</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulation Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 flex items-center gap-1.5",
              isPlaying
                ? "bg-white text-black border-white/10"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <Play className={cn("w-3.5 h-3.5", isPlaying && "fill-black")} />
            {isPlaying ? "Pause Stream" : "Resume Stream"}
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-1.5 text-zinc-400 bg-white/5 border border-white/5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            title="Reset values"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: CPU */}
        <div className="p-5 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md flex flex-col items-center text-center gap-4 group">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] tracking-wider uppercase border border-white/5 bg-white/5 px-2.5 py-0.75 rounded-full">
            <Cpu className="w-3 h-3 text-pink-500" />
            <span>CPU CORE</span>
          </div>

          <AnimatedCircularProgress
            value={cpuVal}
            theme="cyber"
            size={120}
            strokeWidth={9}
            label="Load"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCpuVal((v) => Math.max(v - 10, 0))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-zinc-500 w-10">adjust</span>
            <button
              onClick={() => setCpuVal((v) => Math.min(v + 10, 100))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Memory */}
        <div className="p-5 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md flex flex-col items-center text-center gap-4 group">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] tracking-wider uppercase border border-white/5 bg-white/5 px-2.5 py-0.75 rounded-full">
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>RAM</span>
          </div>

          <AnimatedCircularProgress
            value={ramVal}
            theme="emerald"
            size={120}
            strokeWidth={9}
            label="Memory"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setRamVal((v) => Math.max(v - 10, 0))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-zinc-500 w-10">adjust</span>
            <button
              onClick={() => setRamVal((v) => Math.min(v + 10, 100))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Storage */}
        <div className="p-5 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md flex flex-col items-center text-center gap-4 group">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] tracking-wider uppercase border border-white/5 bg-white/5 px-2.5 py-0.75 rounded-full">
            <HardDrive className="w-3 h-3 text-orange-500" />
            <span>STORAGE</span>
          </div>

          <AnimatedCircularProgress
            value={diskVal}
            theme="ember"
            size={120}
            strokeWidth={9}
            label="Used"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setDiskVal((v) => Math.max(v - 10, 0))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-zinc-500 w-10">adjust</span>
            <button
              onClick={() => setDiskVal((v) => Math.min(v + 10, 100))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Network */}
        <div className="p-5 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md flex flex-col items-center text-center gap-4 group">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] tracking-wider uppercase border border-white/5 bg-white/5 px-2.5 py-0.75 rounded-full">
            <Wifi className="w-3 h-3 text-rose-500" />
            <span>NETWORK</span>
          </div>

          <AnimatedCircularProgress
            value={netVal}
            theme="sunset"
            size={120}
            strokeWidth={9}
            label="Bandwidth"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setNetVal((v) => Math.max(v - 10, 0))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-zinc-500 w-10">adjust</span>
            <button
              onClick={() => setNetVal((v) => Math.min(v + 10, 100))}
              className="p-1 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
