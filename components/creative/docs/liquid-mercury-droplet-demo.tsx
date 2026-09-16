"use client";

import React from "react";
import { LiquidMercuryDroplet } from "@/components/creative/liquid-mercury-droplet";
import { usePlaygroundContext } from "./playground-context";

export function LiquidMercuryDropletDemo(props: any) {
  const ctx = usePlaygroundContext();
  const merged = { ...props, ...ctx };
  const {
    viscosity = 1,
    distortion = 1,
    metalness = 0.95,
    roughness = 0.1,
    tintColor = "#f1f5f9",
  } = merged;
  
  return (
    <div className="w-full max-w-2xl mx-auto h-[450px]">
      <LiquidMercuryDroplet
        viscosity={viscosity}
        distortion={distortion}
        metalness={metalness}
        roughness={roughness}
        tintColor={tintColor}
        scale={1.4}
        className="w-full h-full"
      />
    </div>
  );
}
