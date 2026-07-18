"use client";

import React from "react";
import { AICommandPalette } from "@/components/creative/ai-command-palette";

export function AICommandPaletteDemo({ placeholder = "Ask AI or search commands..." }: { placeholder?: string }) {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center py-12 px-4 bg-zinc-950/50 rounded-xl border border-white/5">
      <AICommandPalette placeholder={placeholder} />
    </div>
  );
}
