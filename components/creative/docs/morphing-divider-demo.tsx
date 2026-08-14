"use client";

import React from "react";
import { MorphingDivider } from "@/components/creative/morphing-divider";

export default function MorphingDividerDemo() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-between bg-zinc-950 border border-border rounded-xl overflow-hidden relative">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Dark Section</h2>
        <p className="text-zinc-400 max-w-md text-center">
          Notice how the divider fluidly animates its path to create an organic connection to the next section.
        </p>
      </div>

      <div className="w-full">
        {/* The divider uses currentColor by default, so we can set text color to match the next section */}
        <MorphingDivider className="text-zinc-100" />
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center bg-zinc-100 p-8">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Light Section</h2>
        <p className="text-zinc-600 max-w-md text-center">
          The morphing divider bridges the gap seamlessly.
        </p>
      </div>
    </div>
  );
}
