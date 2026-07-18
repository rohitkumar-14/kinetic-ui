"use client";

import React, { useState } from "react";
import { GravityGridHero, GravityGridHeroVariant } from "@/components/creative/hero/gravity-grid-hero";
import { cn } from "@/lib/utils";
import { CircleDot, Network } from "lucide-react";

export function GravityGridHeroDemo({ 
  variant = "dots" 
}: { 
  variant?: GravityGridHeroVariant 
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        <div className="relative w-full h-[600px] overflow-hidden">
          <GravityGridHero 
            variant={variant}
            className="absolute inset-0 min-h-full h-full"
            badgeText="Interactive Physics"
            title={variant === "lines" ? "Vector Mesh" : "Gravity Grid"}
            description="A raw canvas implementation running at 60fps. Move your cursor to repel the points and watch the spring physics snap them back into place."
          />
        </div>
      </div>
    </div>
  );
}
