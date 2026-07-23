"use client";

import React from "react";
import { AiArtifactSandbox } from "@/components/creative/ai-artifact-sandbox";

export function AiArtifactSandboxDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[350px]">
      <AiArtifactSandbox className="max-w-xl" />
    </div>
  );
}
