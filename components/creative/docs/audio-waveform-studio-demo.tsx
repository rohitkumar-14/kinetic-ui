"use client";

import React from "react";
import { AudioWaveformStudio } from "@/components/creative/audio-waveform-studio";

export function AudioWaveformStudioDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[400px]">
      <AudioWaveformStudio className="max-w-xl" />
    </div>
  );
}
