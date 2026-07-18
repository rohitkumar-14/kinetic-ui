"use client";

import React, { useState } from "react";
import { LogoMarquee } from "@/components/creative/logo-marquee";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Figma, 
  Github, 
  Twitter, 
  Twitch, 
  Youtube, 
  Dribbble, 
  Codepen,
  Framer,
  Chrome,
  Slack
} from "lucide-react";

const VARIANTS = [
  { id: "horizontal", label: "Horizontal", accent: "#3b82f6" },
  { id: "vertical", label: "Vertical Stack", accent: "#10b981" },
  { id: "perspective", label: "3D Perspective", accent: "#8b5cf6" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const Logos = [
  { icon: Figma, name: "Figma" },
  { icon: Github, name: "GitHub" },
  { icon: Twitter, name: "Twitter" },
  { icon: Twitch, name: "Twitch" },
  { icon: Youtube, name: "YouTube" },
  { icon: Dribbble, name: "Dribbble" },
  { icon: Codepen, name: "CodePen" },
  { icon: Framer, name: "Framer" },
  { icon: Chrome, name: "Chrome" },
  { icon: Slack, name: "Slack" },
];

export interface LogoMarqueeDemoProps {
  variant?: VariantId;
}

export function LogoMarqueeDemo({
  variant = "horizontal"
}: LogoMarqueeDemoProps) {
  const activeVariant = variant;
  const v = VARIANTS.find(variantConfig => variantConfig.id === activeVariant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-12 h-[500px] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500" 
          style={{
            background: `radial-gradient(circle at center, ${v.accent} 0%, transparent 70%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center relative z-10 perspective-[1000px]"
          >
            {activeVariant === "horizontal" && (
              <div className="w-full max-w-4xl py-12">
                <LogoMarquee direction="left" speed={0.8} pauseOnHover>
                  {Logos.map((Logo, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                      <Logo.icon className="w-8 h-8" />
                      <span className="text-xl font-bold tracking-tight">{Logo.name}</span>
                    </div>
                  ))}
                </LogoMarquee>
              </div>
            )}

            {activeVariant === "vertical" && (
              <div className="w-full max-w-sm h-full max-h-[400px] flex justify-between gap-8">
                <LogoMarquee direction="up" speed={1} pauseOnHover className="w-1/2">
                  {Logos.map((Logo, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors p-4 bg-white/5 rounded-2xl border border-white/5 w-full">
                      <Logo.icon className="w-10 h-10" />
                      <span className="text-sm font-medium">{Logo.name}</span>
                    </div>
                  ))}
                </LogoMarquee>
                <LogoMarquee direction="down" speed={1.2} pauseOnHover className="w-1/2 hidden md:flex">
                  {Logos.map((Logo, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors p-4 bg-white/5 rounded-2xl border border-white/5 w-full">
                      <Logo.icon className="w-10 h-10" />
                      <span className="text-sm font-medium">{Logo.name}</span>
                    </div>
                  ))}
                </LogoMarquee>
              </div>
            )}

            {activeVariant === "perspective" && (
              <div className="w-full max-w-4xl h-[400px] flex flex-col justify-center gap-8 [transform:rotateX(25deg)_rotateY(-15deg)_rotateZ(5deg)] [transform-style:preserve-3d]">
                <LogoMarquee direction="left" speed={1.5} pauseOnHover={false}>
                  {Logos.map((Logo, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white">
                      <Logo.icon className="w-12 h-12 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                      <span className="text-3xl font-black tracking-tight">{Logo.name}</span>
                    </div>
                  ))}
                </LogoMarquee>
                <LogoMarquee direction="right" speed={1} pauseOnHover={false}>
                  {Logos.map((Logo, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-zinc-500">
                      <Logo.icon className="w-8 h-8" />
                      <span className="text-xl font-bold tracking-tight">{Logo.name}</span>
                    </div>
                  ))}
                </LogoMarquee>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
