"use client";

import React, { useState, useEffect } from "react";
import { SlotMachineReel } from "@/components/creative/slot-machine-reel";
import { RefreshCcw } from "lucide-react";

const WORDS = ["JACKPOT!", "WINNER!!", "AWESOME!", "KINETIC!", "SHADERS!"];

export function SlotMachineReelDemo() {
  const [spinning, setSpinning] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Pick next word
    setWordIndex((prev) => (prev + 1) % WORDS.length);

    // Stop spinning after 1 second
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };

  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center gap-8 bg-neutral-900 rounded-xl border border-white/10">
      <SlotMachineReel 
        value={WORDS[wordIndex]} 
        spinning={spinning} 
      />

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg transition-colors disabled:opacity-50"
      >
        <RefreshCcw size={18} className={spinning ? "animate-spin" : ""} />
        {spinning ? "Spinning..." : "Pull Lever"}
      </button>
    </div>
  );
}
