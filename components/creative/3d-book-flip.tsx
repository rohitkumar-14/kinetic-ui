"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface BookPage {
  id: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

const DEMO_PAGES: BookPage[] = [
  {
    id: "cover",
    front: (
      <div className="w-full h-full bg-indigo-950 flex flex-col items-center justify-center p-8 text-center border-4 border-indigo-900 shadow-inner">
        <h1 className="text-3xl font-serif font-bold text-indigo-100 mb-4">The Kinetic Arts</h1>
        <p className="text-indigo-300 font-serif italic">A visual journey through code.</p>
      </div>
    ),
    back: (
      <div className="w-full h-full bg-neutral-100 p-8 flex flex-col justify-center text-neutral-800">
        <p className="font-serif italic text-center">Published by Kinetic UI, 2026</p>
      </div>
    )
  },
  {
    id: "page1",
    front: (
      <div className="w-full h-full bg-neutral-50 p-8 text-neutral-900 flex flex-col">
        <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-2">Chapter 1: The Canvas</h2>
        <p className="font-serif leading-relaxed mb-4 text-justify">
          In the beginning, there was only the blank DOM. A vast, empty void waiting to be painted with pixels and logic.
        </p>
        <p className="font-serif leading-relaxed text-justify">
          Then came the framework, bringing order to the chaos. Components emerged like stars in the night sky.
        </p>
        <div className="mt-auto text-xs text-center text-neutral-400">1</div>
      </div>
    ),
    back: (
      <div className="w-full h-full bg-neutral-50 p-8 text-neutral-900 flex flex-col">
        <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-2">Chapter 2: Motion</h2>
        <p className="font-serif leading-relaxed mb-4 text-justify">
          Static pages were no longer enough. The user demanded life, reaction, and physics.
        </p>
        <p className="font-serif leading-relaxed text-justify">
          Springs, dampings, and mass calculations turned cold mathematics into warm, tactile experiences.
        </p>
        <div className="mt-auto text-xs text-center text-neutral-400">2</div>
      </div>
    )
  },
  {
    id: "backcover",
    front: (
      <div className="w-full h-full bg-neutral-50 p-8 text-neutral-900 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-neutral-200 rounded-full mb-8 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        </div>
        <h2 className="text-xl font-serif font-bold mb-2">Fin.</h2>
      </div>
    ),
    back: (
      <div className="w-full h-full bg-indigo-950 flex items-center justify-center p-8">
        <div className="w-16 h-16 border-2 border-indigo-500/30 rounded-lg flex items-center justify-center">
          <span className="text-indigo-500 font-bold">K</span>
        </div>
      </div>
    )
  }
];

export function ThreeDBookFlip({ className }: { className?: string }) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < DEMO_PAGES.length - 1) {
      setCurrentPage((c) => c + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((c) => c - 1);
    }
  };

  return (
    <div className={cn("relative w-full h-[500px] flex items-center justify-center perspective-[1500px] bg-neutral-950 rounded-xl overflow-hidden", className)}>
      
      {/* Table/Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Book Container */}
      <div className="relative w-[300px] h-[420px] transform-style-3d transition-transform duration-500">
        
        {/* Back cover (always stays at the very bottom right, representing the end of the book) */}
        <div className="absolute inset-0 bg-indigo-950 rounded-r-xl shadow-[20px_20px_40px_rgba(0,0,0,0.8)] border border-indigo-900/50" />
        
        {/* Pages */}
        {DEMO_PAGES.map((page, index) => {
          // A page is "turned" if its index is strictly less than the currentPage.
          // The current page is visible on the right.
          // Turned pages are visible on the left.
          const isTurned = index < currentPage;
          const isCurrent = index === currentPage;
          const zIndex = DEMO_PAGES.length - index;

          return (
            <motion.div
              key={page.id}
              className="absolute inset-0 origin-left transform-style-3d"
              style={{ zIndex: isTurned ? index : zIndex }}
              initial={false}
              animate={{
                rotateY: isTurned ? -180 : 0,
                // Add a tiny bit of z-translation to prevent z-fighting when stacked
                z: isTurned ? index : -index,
              }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 12,
                mass: 0.8
              }}
            >
              {/* Front of Page (Right side when not turned) */}
              <div 
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-r-xl border-y border-r border-black/10 bg-white",
                  isCurrent ? "shadow-[inset_20px_0_40px_rgba(0,0,0,0.1)]" : ""
                )}
                style={{ backfaceVisibility: "hidden" }}
              >
                {page.front}
                {/* Book spine shading */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply pointer-events-none" />
              </div>

              {/* Back of Page (Left side when turned) */}
              <div 
                className="absolute inset-0 overflow-hidden rounded-l-xl border-y border-l border-black/10 bg-white"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                {page.back}
                {/* Book spine shading (reversed) */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent mix-blend-multiply pointer-events-none" />
              </div>
            </motion.div>
          );
        })}

        {/* Center Spine Crease */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/40 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-50 transform -translate-x-1/2" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 flex gap-4 z-50">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors backdrop-blur-md border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === DEMO_PAGES.length}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors backdrop-blur-md border border-white/10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
