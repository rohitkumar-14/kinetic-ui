"use client";

import React, { useState } from "react";
import { FloatingNavbar, FloatingNavbarVariant } from "@/components/creative/floating-navbar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlignJustify, Type, Square } from "lucide-react";

export function FloatingNavbarDemo({
  variant = "pill",
  color = "#6366f1",
  speed = 1
}: {
  variant?: "pill" | "underline" | "block";
  color?: string;
  speed?: number;
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[400px] flex items-center justify-center bg-grid-white/[0.02]">
          <FloatingNavbar 
            variant={variant}
            color={color}
            speed={speed}
            className="absolute top-1/2 -translate-y-1/2" // override fixed positioning for demo
            items={[
              { label: "Dashboard", href: "#" },
              { label: "Projects", href: "#" },
              { label: "Team", href: "#" },
              { label: "Settings", href: "#" }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
