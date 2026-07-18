"use client";

import React, { useState } from "react";
import { Globe, GlobeMarker } from "@/components/creative/globe";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const TECH_HUB_MARKERS: GlobeMarker[] = [
  { location: [37.7595, -122.4367], size: 0.08 },  // San Francisco
  { location: [40.7128, -74.0060], size: 0.07 },   // New York
  { location: [51.5074, -0.1278], size: 0.06 },    // London
  { location: [35.6895, 139.6917], size: 0.07 },   // Tokyo
  { location: [19.0760, 72.8777], size: 0.08 },    // Mumbai
  { location: [1.3521, 103.8198], size: 0.06 },    // Singapore
  { location: [37.5665, 126.9780], size: 0.06 },   // Seoul
  { location: [47.6062, -122.3321], size: 0.05 },  // Seattle
  { location: [52.5200, 13.4050], size: 0.05 },    // Berlin
  { location: [22.3193, 114.1694], size: 0.06 },   // Hong Kong
];

const GLOBAL_CITIES_MARKERS: GlobeMarker[] = [
  { location: [48.8566, 2.3522], size: 0.06 },     // Paris
  { location: [55.7558, 37.6173], size: 0.06 },    // Moscow
  { location: [-33.8688, 151.2093], size: 0.06 },  // Sydney
  { location: [-23.5505, -46.6333], size: 0.06 },  // São Paulo
  { location: [30.0444, 31.2357], size: 0.05 },    // Cairo
  { location: [39.9042, 116.4074], size: 0.08 },   // Beijing
  { location: [28.6139, 77.2090], size: 0.07 },    // Delhi
  { location: [34.0522, -118.2437], size: 0.06 },  // Los Angeles
  { location: [-1.2921, 36.8219], size: 0.05 },    // Nairobi
  { location: [25.2048, 55.2708], size: 0.06 },    // Dubai
  { location: [41.0082, 28.9784], size: 0.05 },    // Istanbul
  { location: [13.7563, 100.5018], size: 0.05 },   // Bangkok
];

interface VariantConfig {
  color: string;
  baseColor: [number, number, number];
  glowColor: [number, number, number];
  dark: number;
  diffuse: number;
  mapBrightness: number;
  speed: number;
  theta: number;
  markers: GlobeMarker[];
}

const VARIANTS: {
  id: string;
  label: string;
  accent: string;
  description: string;
  config: VariantConfig;
}[] = [
  { 
    id: "midnight", 
    label: "Midnight Indigo", 
    accent: "#818cf8",
    description: "A premium dark globe with indigo markers — perfect for SaaS hero sections.",
    config: { 
      color: "#818cf8",
      baseColor: [0.06, 0.06, 0.12],
      glowColor: [0.1, 0.1, 0.2],
      dark: 1,
      diffuse: 1.2,
      mapBrightness: 6,
      speed: 1,
      theta: 0.3,
      markers: TECH_HUB_MARKERS,
    }
  },
  { 
    id: "cyber", 
    label: "Cyber Neon", 
    accent: "#22d3ee",
    description: "Electric cyan on deep black — cyberpunk vibes for tech platforms.",
    config: { 
      color: "#22d3ee",
      baseColor: [0.02, 0.06, 0.08],
      glowColor: [0.02, 0.12, 0.15],
      dark: 1,
      diffuse: 2,
      mapBrightness: 8,
      speed: 0.8,
      theta: 0.25,
      markers: GLOBAL_CITIES_MARKERS,
    }
  },
  { 
    id: "ember", 
    label: "Solar Ember", 
    accent: "#f97316",
    description: "Warm amber tones with a fiery glow — ideal for energy or analytics dashboards.",
    config: { 
      color: "#f97316",
      baseColor: [0.12, 0.05, 0.02],
      glowColor: [0.2, 0.08, 0.02],
      dark: 1,
      diffuse: 1.5,
      mapBrightness: 5,
      speed: 1.2,
      theta: 0.35,
      markers: TECH_HUB_MARKERS,
    }
  },
  { 
    id: "aurora", 
    label: "Aurora Green", 
    accent: "#34d399",
    description: "Emerald markers on dark earth — great for sustainability & environmental themes.",
    config: { 
      color: "#34d399",
      baseColor: [0.02, 0.08, 0.05],
      glowColor: [0.03, 0.15, 0.08],
      dark: 1,
      diffuse: 1.8,
      mapBrightness: 7,
      speed: 0.6,
      theta: 0.2,
      markers: GLOBAL_CITIES_MARKERS,
    }
  },
  { 
    id: "rose", 
    label: "Neon Rose", 
    accent: "#f472b6",
    description: "Hot pink markers with subtle magenta glow — stand out with bold personality.",
    config: { 
      color: "#f472b6",
      baseColor: [0.08, 0.02, 0.06],
      glowColor: [0.15, 0.03, 0.1],
      dark: 1,
      diffuse: 1.4,
      mapBrightness: 6,
      speed: 0.9,
      theta: 0.28,
      markers: TECH_HUB_MARKERS,
    }
  },
];

type VariantId = string;

export interface GlobeDemoProps {
  variant?: VariantId;
}

export function GlobeDemo({
  variant = "midnight"
}: GlobeDemoProps) {
  const activeConfig = VARIANTS.find(v => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-black min-h-[500px] md:min-h-[600px] flex items-center justify-center relative overflow-hidden group">
        {/* Ambient background glow */}
        <div 
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{ 
            background: `radial-gradient(ellipse at 50% 50%, ${activeConfig.accent}15 0%, transparent 70%)` 
          }}
        />

        <AnimatePresence mode="wait">
          {VARIANTS.map((v) => variant === v.id && (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full max-w-[420px] md:max-w-[480px]"
            >
              <Globe 
                color={v.config.color}
                baseColor={v.config.baseColor}
                glowColor={v.config.glowColor}
                dark={v.config.dark}
                diffuse={v.config.diffuse}
                mapBrightness={v.config.mapBrightness}
                speed={v.config.speed}
                theta={v.config.theta}
                markers={v.config.markers}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-1"
            >
              <span className="text-xs font-mono tracking-wider uppercase" style={{ color: activeConfig.accent }}>
                {activeConfig.label}
              </span>
              <p className="text-zinc-400 text-sm max-w-md">
                {activeConfig.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeConfig.accent }} />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">WebGL</span>
        </div>
      </div>
    </div>
  );
}
