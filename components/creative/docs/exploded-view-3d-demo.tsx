"use client";

import React from "react";
import { ExplodedView3D } from "@/components/creative/exploded-view-3d";
import { usePlaygroundContext } from "./playground-context";

export function ExplodedView3DDemo(props: any) {
  const ctx = usePlaygroundContext();
  const merged = { ...props, ...ctx };
  const {
    explosionProgress = 0.6,
    autoRotate = false,
    accentColor = "#6366f1",
    showPins = true,
  } = merged;
  return (
    <div className="w-full max-w-3xl mx-auto h-[520px]">
      <ExplodedView3D
        explosionProgress={explosionProgress}
        autoRotate={autoRotate}
        accentColor={accentColor}
        showPins={showPins}
        className="w-full h-full"
      />
    </div>
  );
}
