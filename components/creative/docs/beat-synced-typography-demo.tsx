"use client";

import React from "react";
import { BeatSyncedTypography } from "@/components/creative/beat-synced-typography";

export function BeatSyncedTypographyDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <BeatSyncedTypography />
    </div>
  );
}
