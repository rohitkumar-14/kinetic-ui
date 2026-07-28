"use client";

import React, { useState } from "react";
import { PricingCards, PricingVariant } from "@/components/creative/pricing-cards";
import { cn } from "@/lib/utils";
import { LayoutGrid, MousePointer2, Focus } from "lucide-react";

export function PricingCardsDemo({
  variant = "grid",
  color = "#ec4899",
  speed = 1,
  scale = 1
}: {
  variant?: PricingVariant;
  color?: string;
  speed?: number;
  scale?: number;
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        {/* We use a negative margin trick here because PricingCards natively comes with py-20, and we want to fit it in the demo container nicely */}
        <div className="relative w-full overflow-hidden -my-10 scale-[0.95]">
          <PricingCards 
            variant={variant}
            color={color}
            // @ts-ignore - passing just in case it's used
            speed={speed}
            // @ts-ignore
            scale={scale}
          />
        </div>
      </div>
    </div>
  );
}
