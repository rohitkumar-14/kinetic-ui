"use client";

import React from "react";
import { StreamingMarkdownRenderer } from "@/components/creative/streaming-markdown-renderer";

export function StreamingMarkdownRendererDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <StreamingMarkdownRenderer content="# Hello World\n\nThis is a streaming markdown renderer.\n\n- It supports lists\n- And **bold** text" isStreaming={true} />
    </div>
  );
}
