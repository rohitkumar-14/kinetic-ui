"use client";

import React from "react";
import { ChromaticGlassPrism } from "@/components/creative/chromatic-glass-prism";
import { usePlaygroundContext } from "./playground-context";

export function ChromaticGlassPrismDemo(props: any) {
  const ctx = usePlaygroundContext();
  const merged = { ...props, ...ctx };
  const {
    ior = 1.5,
    chromaticAberration = 0.5,
    thickness = 1.5,
    color = "#ffffff",
    shape = "icosahedron",
  } = merged;
  return (
    <div className="w-full max-w-3xl mx-auto h-[500px] rounded-xl overflow-hidden border border-white/10">
      <ChromaticGlassPrism
        ior={ior}
        chromaticAberration={chromaticAberration}
        thickness={thickness}
        color={color}
        shape={shape}
      />
    </div>
  );
}
