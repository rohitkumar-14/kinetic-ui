"use client";

import React from "react";
import { VolumetricLightBeam } from "@/components/creative/volumetric-light-beam";
import { usePlaygroundContext } from "./playground-context";

export function VolumetricLightBeamDemo(props: any) {
  const ctx = usePlaygroundContext();
  const merged = { ...props, ...ctx };
  const {
    beamIntensity = 1.6,
    beamColor = "#60a5fa",
    coneAngle = 0.45,
    dustCount = 180,
  } = merged;
  return (
    <div className="w-full max-w-3xl mx-auto h-[500px]">
      <VolumetricLightBeam
        beamIntensity={beamIntensity}
        beamColor={beamColor}
        coneAngle={coneAngle}
        dustCount={dustCount}
      />
    </div>
  );
}
