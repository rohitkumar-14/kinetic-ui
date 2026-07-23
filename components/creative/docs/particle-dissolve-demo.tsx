"use client";

import React from "react";
import { ParticleDissolve } from "@/components/creative/particle-dissolve";

export function ParticleDissolveDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[400px]">
      <ParticleDissolve className="max-w-xl" />
    </div>
  );
}
