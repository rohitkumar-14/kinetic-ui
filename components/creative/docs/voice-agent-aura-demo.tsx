"use client";

import React, { useState, useEffect } from "react";
import { VoiceAgentAura } from "@/components/creative/voice-agent-aura";
import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";

export function VoiceAgentAuraDemo({
  color1 = "#4f46e5",
  color2 = "#c026d3",
  color3 = "#38bdf8",
  speed = 1.0,
}: {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(0);

  // Simulate audio input when active
  useEffect(() => {
    let animationFrame: number;
    let time = 0;

    const simulateAudio = () => {
      if (isActive) {
        time += 0.1;
        // Generate a pseudo-random looking audio waveform using sine waves
        const v = (Math.sin(time) * 0.5 + 0.5) * 
                  (Math.sin(time * 3.4) * 0.5 + 0.5) * 
                  (Math.sin(time * 0.2) > 0 ? 1 : 0.2); // occasional pauses
        setVolume(v);
      } else {
        // Smoothly return to 0 when disabled
        setVolume((prev) => Math.max(0, prev - 0.05));
      }
      animationFrame = requestAnimationFrame(simulateAudio);
    };

    animationFrame = requestAnimationFrame(simulateAudio);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive]);

  return (
    <div className="w-full max-w-2xl mx-auto h-[400px] rounded-xl overflow-hidden border border-white/10 relative group">
      <VoiceAgentAura 
        volume={volume} 
        color1={color1} 
        color2={color2} 
        color3={color3} 
        speed={speed} 
      />
      
      {/* Overlay UI */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-xl backdrop-blur-md border transition-colors ${
            isActive 
              ? 'bg-red-500/20 text-red-200 border-red-500/50' 
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          {isActive ? <Mic size={18} className="animate-pulse" /> : <MicOff size={18} />}
          {isActive ? "Listening..." : "Click to Speak"}
        </motion.button>
      </div>
    </div>
  );
}
