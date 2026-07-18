"use client";

import React from "react";
import { WebcamShaderPortal } from "@/components/creative/webcam-shader-portal";

export function WebcamShaderPortalDemo({ variant = "default" }: { variant?: 'default' | 'glitch' | 'matrix' }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <WebcamShaderPortal variant={variant} className="w-full h-full" />
    </div>
  );
}
