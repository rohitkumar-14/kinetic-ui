"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgGooeyFilterProps {
  className?: string;
  children: React.ReactNode;
  blur?: number;
  contrast?: number;
}

export function SvgGooeyFilter({
  className,
  children,
  blur = 10,
  contrast = 18,
}: SvgGooeyFilterProps) {
  const filterId = useId();

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Invisible SVG that only defines the filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={filterId}>
            {/* 1. Blur all the elements that use this filter */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            
            {/* 2. Dramatically increase the contrast of the alpha channel. 
                This forces the blurred edges to become sharp again, 
                causing overlapping shapes to merge into a gooey bridge. */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values={`
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 ${contrast} -7
              `}
              result="goo"
            />
            
            {/* 3. Blend the original graphics on top (optional depending on effect) 
                Here we just use the goo itself to color it. */}
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Container applying the filter */}
      <div 
        className="w-full h-full relative" 
        style={{ filter: `url(#${filterId})` }}
      >
        {children}
      </div>
    </div>
  );
}
