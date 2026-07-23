"use client";

import React from "react";
import { LiquidMetaballCursor } from "@/components/creative/liquid-metaball-cursor";

export function LiquidMetaballCursorDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[400px]">
      <LiquidMetaballCursor className="max-w-xl" />
    </div>
  );
}
