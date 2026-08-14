"use client";

import React from "react";
import { GenerativeAudioBtn } from "@/components/creative/generative-audio-btn";

export default function GenerativeAudioBtnDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Generative Audio UI</h2>
          <p className="text-zinc-400 max-w-sm">
            Click these buttons to hear physical sound effects synthesized entirely in the browser using the Web Audio API. Turn on your volume!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <GenerativeAudioBtn soundType="click">
            Mechanical Click
          </GenerativeAudioBtn>
          
          <GenerativeAudioBtn soundType="pop">
            Bubbly Pop
          </GenerativeAudioBtn>
          
          <GenerativeAudioBtn soundType="glitch">
            Sci-Fi Glitch
          </GenerativeAudioBtn>
        </div>
      </div>

    </div>
  );
}
