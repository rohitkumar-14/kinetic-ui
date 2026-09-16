"use client";

import React from "react";
import { AIAgentFlow } from "@/components/creative/ai-agent-flow";

export function AIAgentFlowDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 flex items-center justify-center">
      <AIAgentFlow className="w-full" />
    </div>
  );
}
