"use client";

import React from "react";
import { BeforeAfterSlider } from "@/components/creative/before-after-slider";

export default function BeforeAfterSliderDemo() {
  return (
    <div className="w-full flex items-center justify-center p-6 md:p-12 bg-background border border-border rounded-xl">
      <div className="w-full max-w-4xl shadow-2xl rounded-xl">
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop"
          afterImage="https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?q=80&w=2070&auto=format&fit=crop"
        />
      </div>
    </div>
  );
}
