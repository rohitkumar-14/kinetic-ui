"use client";

import React, { useState } from "react";
import {
  DirectionalHover,
  DirectionalHoverEffect,
} from "@/components/creative/directional-hover";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Eye,
  Heart,
  Bookmark,
  ExternalLink,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";

// ─── Card data for the gallery ────────────────────────────────────────────────
interface CardItem {
  id: number;
  label: string;
  sublabel: string;
  emoji: string;
  gradient: string;
}

const CARD_DATA: CardItem[] = [
  { id: 1, label: "Dashboard", sublabel: "Analytics", emoji: "📊", gradient: "from-indigo-500/20 to-violet-500/10" },
  { id: 2, label: "Workflow", sublabel: "Automation", emoji: "⚡", gradient: "from-cyan-500/20 to-blue-500/10" },
  { id: 3, label: "Design", sublabel: "System", emoji: "🎨", gradient: "from-rose-500/20 to-pink-500/10" },
  { id: 4, label: "Security", sublabel: "Shield", emoji: "🛡️", gradient: "from-emerald-500/20 to-teal-500/10" },
  { id: 5, label: "AI Engine", sublabel: "Inference", emoji: "🧠", gradient: "from-amber-500/20 to-orange-500/10" },
  { id: 6, label: "Deploy", sublabel: "Cloud", emoji: "☁️", gradient: "from-purple-500/20 to-fuchsia-500/10" },
];

// ─── Overlay content builders per variant ─────────────────────────────────────
function SlideOverlay({ item }: { item: CardItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-white p-4">
      <ArrowUpRight className="h-7 w-7" />
      <span className="text-sm font-bold tracking-wide">View {item.label}</span>
      <span className="text-[11px] text-white/60">Click to open</span>
    </div>
  );
}

function FadeOverlay({ item }: { item: CardItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white p-4">
      <div className="flex gap-4">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Bookmark className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      <span className="text-xs text-white/50 mt-1">Quick Actions</span>
    </div>
  );
}

function ScaleOverlay({ item }: { item: CardItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white p-4">
      <Sparkles className="h-6 w-6 text-amber-300" />
      <span className="text-sm font-semibold">{item.sublabel}</span>
      <div className="flex items-center gap-1 text-[11px] text-white/50">
        <Eye className="h-3 w-3" /> Preview
      </div>
    </div>
  );
}

function FlipOverlay({ item }: { item: CardItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-white p-4">
      <div className="text-3xl">{item.emoji}</div>
      <span className="text-sm font-bold">{item.label}</span>
      <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{item.sublabel}</span>
    </div>
  );
}

function BlurOverlay({ item }: { item: CardItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-white p-4">
      <Play className="h-8 w-8 fill-white" />
      <span className="text-xs font-medium tracking-wider uppercase text-white/70">
        Play Demo
      </span>
    </div>
  );
}

// ─── Variant definitions ──────────────────────────────────────────────────────
const VARIANTS: {
  id: DirectionalHoverEffect;
  label: string;
  accent: string;
  description: string;
  overlayBuilder: (item: CardItem) => React.ReactNode;
}[] = [
  {
    id: "slide",
    label: "Slide",
    accent: "#818cf8",
    description: "Classic directional slide — the overlay enters from whichever edge your cursor crosses.",
    overlayBuilder: (item) => <SlideOverlay item={item} />,
  },
  {
    id: "fade",
    label: "Fade",
    accent: "#22d3ee",
    description: "A subtle opacity crossfade with quick-action buttons — elegant and minimal.",
    overlayBuilder: (item) => <FadeOverlay item={item} />,
  },
  {
    id: "scale",
    label: "Scale",
    accent: "#f59e0b",
    description: "The overlay scales from the entry edge like an expanding curtain reveal.",
    overlayBuilder: (item) => <ScaleOverlay item={item} />,
  },
  {
    id: "flip",
    label: "3D Flip",
    accent: "#a855f7",
    description: "A perspective-aware 3D card flip — the overlay rotates in from the entry direction.",
    overlayBuilder: (item) => <FlipOverlay item={item} />,
  },
  {
    id: "blur",
    label: "Blur Slide",
    accent: "#f43f5e",
    description: "A dreamy entrance combining directional movement with a gaussian blur dissolve.",
    overlayBuilder: (item) => <BlurOverlay item={item} />,
  },
];

export interface DirectionalHoverDemoProps {
  effect?: DirectionalHoverEffect;
}

export function DirectionalHoverDemo({
  effect = "slide"
}: DirectionalHoverDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === effect) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

        <div className="relative p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={effect}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Card grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {CARD_DATA.map((item) => (
                  <DirectionalHover
                    key={item.id}
                    effect={effect}
                    color={activeConfig.accent}
                    className="rounded-2xl cursor-pointer"
                    overlayContent={activeConfig.overlayBuilder(item)}
                  >
                    <div
                      className={cn(
                        "h-36 md:h-44 w-full rounded-2xl border border-white/5 bg-gradient-to-br flex flex-col items-center justify-center gap-2",
                        item.gradient
                      )}
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-sm font-semibold text-white/80">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        {item.sublabel}
                      </span>
                    </div>
                  </DirectionalHover>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom info bar */}
        <div className="border-t border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={effect}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-zinc-400 max-w-lg"
            >
              <span className="font-semibold text-white mr-1.5" style={{ color: activeConfig.accent }}>
                {activeConfig.label}:
              </span>
              {activeConfig.description}
            </motion.p>
          </AnimatePresence>
          <div className="hidden md:flex items-center gap-2 opacity-30">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Hover cards
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
