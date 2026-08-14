"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { SpotlightCard } from "@/components/creative/spotlight-card";
import { Component } from "lucide-react";

export interface PreviewCardProps {
  slug: string;
  title: string;
  description: string;
}

export function PreviewCard({ slug, title, description }: PreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once: false ensures the heavy iframe unmounts when scrolled out of view, saving massive memory/GPU
  const isInView = useInView(ref, { once: false, margin: "0px" });

  return (
    <Link href={`/docs/components/${slug}`} className="block group h-full">
      <SpotlightCard className="h-full bg-zinc-950/50 border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col">
        
        {/* Preview Container (Lazy Loaded Iframe) */}
        <div 
          ref={ref}
          className="relative w-full h-72 bg-black/50 border-b border-white/5 overflow-hidden group-hover:bg-black transition-colors"
        >
          {isInView ? (
            <iframe
              src={`/preview/${slug}`}
              className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              style={{ border: "none" }}
              title={`Preview of ${title}`}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
            </div>
          )}
          
          {/* Overlay to intercept clicks (since iframe pointer-events-none already does this, this is extra safety) */}
          <div className="absolute inset-0 z-10" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
              <Component className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-lg text-white group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

      </SpotlightCard>
    </Link>
  );
}
