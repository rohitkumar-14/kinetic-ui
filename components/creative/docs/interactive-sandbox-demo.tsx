"use client";

import React from "react";
import { InteractiveSandbox } from "@/components/creative/interactive-sandbox";

export function InteractiveSandboxDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[400px]">
      <InteractiveSandbox className="max-w-2xl" />
    </div>
  );
}
