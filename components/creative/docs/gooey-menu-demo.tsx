"use client";

import React, { useState } from "react";
import {
  GooeyMenu,
  GooeyMenuItem,
  GooeyMenuLayout,
} from "@/components/creative/gooey-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Heart,
  Share2,
  Bell,
  Plus,
  Home,
  Search,
  Settings,
  User,
  Mail,
  Star,
  Download,
  Palette,
  Music,
  Zap,
} from "lucide-react";

const VARIANTS: {
  id: string;
  label: string;
  accent: string;
  description: string;
  layout: GooeyMenuLayout;
  radius: number;
  startAngle?: number;
  spreadAngle?: number;
  color: string;
  items: { icon: React.ReactNode; label: string; itemColor?: string }[];
}[] = [
  {
    id: "radial",
    label: "Radial",
    accent: "#818cf8",
    description: "Classic circular burst — items spread evenly around the toggle in a full 360° ring.",
    layout: "radial",
    radius: 85,
    color: "#818cf8",
    items: [
      { icon: <Camera className="h-5 w-5" />, label: "Camera" },
      { icon: <Heart className="h-5 w-5" />, label: "Like" },
      { icon: <Share2 className="h-5 w-5" />, label: "Share" },
      { icon: <Bell className="h-5 w-5" />, label: "Alerts" },
    ],
  },
  {
    id: "arc",
    label: "Arc Fan",
    accent: "#22d3ee",
    description: "Items fan out in a customizable arc — perfect for bottom nav or corner placements.",
    layout: "arc",
    radius: 90,
    startAngle: 200,
    spreadAngle: 140,
    color: "#22d3ee",
    items: [
      { icon: <Home className="h-5 w-5" />, label: "Home" },
      { icon: <Search className="h-5 w-5" />, label: "Search" },
      { icon: <User className="h-5 w-5" />, label: "Profile" },
      { icon: <Settings className="h-5 w-5" />, label: "Settings" },
      { icon: <Mail className="h-5 w-5" />, label: "Mail" },
    ],
  },
  {
    id: "row",
    label: "Horizontal",
    accent: "#f59e0b",
    description: "A clean horizontal expansion — items slide out left and right from center.",
    layout: "row",
    radius: 70,
    color: "#f59e0b",
    items: [
      { icon: <Star className="h-5 w-5" />, label: "Fave" },
      { icon: <Download className="h-5 w-5" />, label: "Save" },
      { icon: <Share2 className="h-5 w-5" />, label: "Share" },
    ],
  },
  {
    id: "column",
    label: "Vertical",
    accent: "#a855f7",
    description: "Items stack vertically — ideal for sidebar floating action buttons.",
    layout: "column",
    radius: 70,
    color: "#a855f7",
    items: [
      { icon: <Palette className="h-5 w-5" />, label: "Theme" },
      { icon: <Music className="h-5 w-5" />, label: "Audio" },
      { icon: <Zap className="h-5 w-5" />, label: "Quick" },
      { icon: <Star className="h-5 w-5" />, label: "Fave" },
    ],
  },
  {
    id: "colorful",
    label: "Colorful",
    accent: "#f43f5e",
    description: "Each item gets its own vibrant color — great for creative or playful interfaces.",
    layout: "radial",
    radius: 90,
    color: "#f43f5e",
    items: [
      { icon: <Camera className="h-5 w-5" />, label: "Snap", itemColor: "#3b82f6" },
      { icon: <Heart className="h-5 w-5" />, label: "Love", itemColor: "#ec4899" },
      { icon: <Share2 className="h-5 w-5" />, label: "Share", itemColor: "#10b981" },
      { icon: <Bell className="h-5 w-5" />, label: "Notify", itemColor: "#f59e0b" },
      { icon: <Star className="h-5 w-5" />, label: "Star", itemColor: "#a855f7" },
      { icon: <Download className="h-5 w-5" />, label: "Save", itemColor: "#06b6d4" },
    ],
  },
];

type VariantId = string;

export interface GooeyMenuDemoProps {
  variant?: string;
}

export function GooeyMenuDemo({ variant = "radial" }: GooeyMenuDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeConfig.accent}10 0%, transparent 60%)`,
          }}
        />

        <div className="relative h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <GooeyMenu
                layout={activeConfig.layout}
                radius={activeConfig.radius}
                color={activeConfig.color}
                startAngle={activeConfig.startAngle}
                spreadAngle={activeConfig.spreadAngle}
                icon={<Plus className="h-6 w-6" />}
              >
                {activeConfig.items.map((item, i) => (
                  <GooeyMenuItem
                    key={i}
                    label={item.label}
                    color={item.itemColor}
                  >
                    {item.icon}
                  </GooeyMenuItem>
                ))}
              </GooeyMenu>
            </motion.div>
          </AnimatePresence>

          {/* Hint text */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
              Click the button to expand
            </span>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="border-t border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={variant}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-zinc-400 max-w-lg"
            >
              <span
                className="font-semibold mr-1.5"
                style={{ color: activeConfig.accent }}
              >
                {activeConfig.label}:
              </span>
              {activeConfig.description}
            </motion.p>
          </AnimatePresence>
          <div className="hidden md:flex items-center gap-2 opacity-30">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              SVG Filter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
