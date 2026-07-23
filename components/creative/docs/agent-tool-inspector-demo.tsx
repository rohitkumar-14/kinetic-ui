"use client";

import React from "react";
import { AgentToolInspector } from "@/components/creative/agent-tool-inspector";

export function AgentToolInspectorDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[450px]">
      <AgentToolInspector className="max-w-2xl" />
    </div>
  );
}
