"use client";

import React from "react";
import { MultiplayerCursorEcosystem } from "@/components/creative/multiplayer-cursor-ecosystem";
import { Button } from "@/components/ui/button";

export function MultiplayerCursorEcosystemDemo({ ghostMode = true }: { ghostMode?: boolean }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10">
      <MultiplayerCursorEcosystem ghostMode={ghostMode} className="w-full h-full flex items-center justify-center">
        <div className="z-10 text-center max-w-sm flex flex-col gap-4 pointer-events-auto mt-8">
          <h2 className="text-2xl font-bold text-white tracking-tighter">Collaborative Cursors</h2>
          <p className="text-zinc-400 text-sm">Move your mouse around. Ghost users will follow along.</p>
          <Button variant="secondary" className="mx-auto cursor-pointer">Hover Me</Button>
        </div>
      </MultiplayerCursorEcosystem>
    </div>
  );
}
