"use client";

import React from "react";
import { AnimatedPromptInput } from "@/components/creative/animated-prompt-input";

export function AnimatedPromptInputDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <AnimatedPromptInput />
    </div>
  );
}
