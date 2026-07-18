"use client";

import React, { useState } from "react";
import { MagneticGallery } from "@/components/creative/magnetic-gallery";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071131384-001b85755536?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop",
];

const VARIANTS = [
  { id: "bento", label: "Bento Layout", accent: "#6366f1" },
  { id: "grid", label: "Uniform Grid", accent: "#10b981" },
  { id: "row", label: "Horizontal Row", accent: "#f97316" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

/* ─── Variant Data ─── */
const bentoImages = [
  {
    src: IMAGES[0],
    alt: "Abstract landscape",
    className: "@md:col-span-2 @md:row-span-2 h-full min-h-[300px] @md:min-h-[400px]",
  },
  {
    src: IMAGES[1],
    alt: "Architecture detail",
    className: "h-[200px] @md:h-full",
  },
  {
    src: IMAGES[2],
    alt: "Minimalist interior",
    className: "h-[200px] @md:h-full",
  },
];

const gridImages = [
  { src: IMAGES[3], alt: "Image 1", className: "h-[250px]" },
  { src: IMAGES[4], alt: "Image 2", className: "h-[250px]" },
  { src: IMAGES[5], alt: "Image 3", className: "h-[250px]" },
  { src: IMAGES[6], alt: "Image 4", className: "h-[250px]" },
  { src: IMAGES[0], alt: "Image 5", className: "h-[250px]" },
  { src: IMAGES[1], alt: "Image 6", className: "h-[250px]" },
];

const rowImages = [
  { src: IMAGES[2], alt: "Portrait 1", className: "h-[400px]" },
  { src: IMAGES[3], alt: "Portrait 2", className: "h-[400px]" },
  { src: IMAGES[4], alt: "Portrait 3", className: "h-[400px]" },
  { src: IMAGES[5], alt: "Portrait 4", className: "h-[400px]" },
];

export function MagneticGalleryDemo() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("bento");

  return (
    <div className="w-full flex flex-col gap-5">
      {/* ── Variant Tab Bar ── */}
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
              activeVariant === v.id
                ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
              {v.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Active variant preview ── */}
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden min-h-[600px] relative">
        <div className="text-center py-12 px-4 relative z-10 pointer-events-none">
          <h3 className="text-2xl font-bold text-white mb-2">Move Your Mouse</h3>
          <p className="text-zinc-400 text-sm">
            Notice how the images tilt to track your cursor globally.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full pb-12"
          >
            {activeVariant === "bento" && (
              <MagneticGallery images={bentoImages} />
            )}
            {activeVariant === "grid" && (
              <MagneticGallery images={gridImages} />
            )}
            {activeVariant === "row" && (
              <MagneticGallery 
                images={rowImages} 
                className="@md:grid-cols-4 @lg:grid-cols-4" 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
