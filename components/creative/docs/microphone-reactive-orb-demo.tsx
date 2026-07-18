"use client";

import React from "react";
import { MicrophoneReactiveOrb } from "@/components/creative/microphone-reactive-orb";

export function MicrophoneReactiveOrbDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <MicrophoneReactiveOrb />
    </div>
  );
}
