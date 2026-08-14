"use client";

import React from "react";
import { CssDeviceMockup } from "@/components/creative/css-device-mockup";

export default function CssDeviceMockupDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[700px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="flex flex-col items-center w-full">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Pure CSS Device Mockup</h2>
          <p className="text-zinc-400 max-w-sm">
            Move your mouse around to rotate the 3D device. The screen is a real React container.
          </p>
        </div>

        <CssDeviceMockup mockupWidth={280}>
          <div className="p-4 flex flex-col gap-4 text-black">
            <h1 className="text-2xl font-bold mt-4 tracking-tighter">Kinetic UI Mobile</h1>
            <p className="text-sm text-zinc-500">Welcome to the future of mobile interfaces.</p>
            
            <div className="h-32 bg-blue-500 rounded-xl shadow-inner flex items-center justify-center text-white font-bold">
              Hero Section
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-zinc-100 rounded-xl" />
              <div className="h-24 bg-zinc-100 rounded-xl" />
              <div className="h-24 bg-zinc-100 rounded-xl" />
              <div className="h-24 bg-zinc-100 rounded-xl" />
            </div>
            
            <div className="h-32 bg-zinc-900 rounded-xl shadow-inner flex items-center justify-center text-white font-bold">
              Footer
            </div>
          </div>
        </CssDeviceMockup>
      </div>

    </div>
  );
}
