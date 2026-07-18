"use client";

import React, { useState } from "react";
import { DynamicIsland, DynamicIslandContent } from "@/components/creative/dynamic-island";
import { Phone, PhoneCall, PhoneOff, Music, Play, Pause, FastForward, Rewind, UploadCloud, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type State = "idle" | "incoming-call" | "active-call" | "music" | "upload";

export function DynamicIslandDemo({
  variant = "idle"
}: {
  variant?: "idle" | "incoming-call" | "active-call" | "music" | "upload";
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  React.useEffect(() => {
    if (variant === "upload") {
      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 bg-zinc-950 rounded-3xl border border-white/10 shadow-inner">
      
      {/* The Dynamic Island */}
      <div className="h-[200px] flex items-start justify-center">
        <DynamicIsland 
          // We let the layout animation handle width/height naturally, but we can set min bounds
          className="mx-auto"
        >
          {variant === "idle" && (
            <DynamicIslandContent id="idle" className="w-[120px] h-[36px] flex flex-row items-center justify-between px-4">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div className="w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 rounded-full" />
              </div>
            </DynamicIslandContent>
          )}

          {variant === "incoming-call" && (
            <DynamicIslandContent id="incoming-call" className="w-[320px] h-[80px] flex flex-row items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xl font-bold">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400 font-medium">Mom</span>
                  <span className="text-lg font-bold">Incoming...</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <PhoneOff className="w-5 h-5 text-white" />
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors animate-pulse"
                >
                  <PhoneCall className="w-5 h-5 text-white" />
                </button>
              </div>
            </DynamicIslandContent>
          )}

          {variant === "active-call" && (
            <DynamicIslandContent id="active-call" className="w-[200px] h-[40px] flex flex-row items-center justify-between px-4">
              <div className="flex items-center gap-2 text-green-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">12:45</span>
              </div>
              <div className="flex gap-1 items-center h-4">
                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-green-500 rounded-full" />
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-green-500 rounded-full" />
                <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-green-500 rounded-full" />
              </div>
            </DynamicIslandContent>
          )}

          {variant === "music" && (
            <DynamicIslandContent id="music" className="w-[300px] h-[100px] flex flex-row items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Album Art" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Resonance</span>
                  <span className="text-sm text-zinc-400">HOME</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Rewind className="w-5 h-5 hover:text-white cursor-pointer" />
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-white cursor-pointer" onClick={() => setIsPlaying(false)} />
                ) : (
                  <Play className="w-7 h-7 text-white cursor-pointer" onClick={() => setIsPlaying(true)} />
                )}
                <FastForward className="w-5 h-5 hover:text-white cursor-pointer" />
              </div>
            </DynamicIslandContent>
          )}

          {variant === "upload" && (
            <DynamicIslandContent id="upload" className="w-[280px] h-[60px] flex flex-row items-center justify-between px-5">
              <div className="flex items-center gap-3">
                {uploadProgress < 100 ? (
                  <UploadCloud className="w-6 h-6 text-blue-400" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                )}
                <span className="text-sm font-medium">
                  {uploadProgress < 100 ? "Uploading assets..." : "Upload complete"}
                </span>
              </div>
              
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                  <circle 
                    cx="20" cy="20" r="16" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="transparent" 
                    className="text-blue-500 transition-all duration-300 ease-out"
                    strokeDasharray={100}
                    strokeDashoffset={100 - uploadProgress}
                  />
                </svg>
                {uploadProgress === 100 && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="absolute inset-0 flex items-center justify-center text-green-400"
                  >
                  </motion.div>
                )}
              </div>
            </DynamicIslandContent>
          )}
        </DynamicIsland>
      </div>

    </div>
  );
}
