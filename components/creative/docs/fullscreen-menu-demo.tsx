"use client";

import React, { useState } from "react";
import { FullscreenMenu, FullscreenMenuVariant } from "@/components/creative/fullscreen-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MoveDown, MoveUp, Scaling, Focus } from "lucide-react";

export function FullscreenMenuDemo({
  variant = "curtain"
}: {
  variant?: "curtain" | "slide" | "fade" | "zoom";
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[400px] flex items-center justify-center bg-grid-white/[0.02] border-t border-white/5">
          
          <div className="text-center space-y-4 relative z-0">
            <h3 className="text-2xl font-bold text-white">Main Content Area</h3>
            <p className="text-zinc-500 max-w-sm mx-auto">
              Click the menu button in the top right of this container to preview the Fullscreen Menu overlay.
            </p>
          </div>

          <FullscreenMenu 
            variant={variant}
            className="absolute inset-0"
          />

        </div>
      </div>
    </div>
  );
}
