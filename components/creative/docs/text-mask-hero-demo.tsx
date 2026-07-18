"use client";

import React, { useState } from "react";
import { TextMaskHero, TextMaskHeroVariant } from "@/components/creative/hero/text-mask-hero";
import { cn } from "@/lib/utils";
import { Video, Palette, Sparkles, Droplets } from "lucide-react";

export function TextMaskHeroDemo({
  variant = "gradient",
  gradient = "linear-gradient(45deg, #ff0055, #0000ff, #00ff99, #ff0055)",
  videoSrc = "https://cdn.pixabay.com/video/2021/08/11/84687-587212476_large.mp4",
  text = "COLORFUL",
  subtext = "Scroll to discover the magic behind the mask."
}: {
  variant?: "video" | "gradient";
  gradient?: string;
  videoSrc?: string;
  text?: string;
  subtext?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        <div className="relative w-full h-[600px] overflow-hidden">
          <TextMaskHero 
            variant={variant}
            className="absolute inset-0 min-h-full h-full"
            text={text}
            subtext={subtext}
            gradient={gradient}
            videoSrc={videoSrc}
          />
        </div>
      </div>
    </div>
  );
}
