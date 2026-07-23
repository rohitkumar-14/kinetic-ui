"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Eye, Layers, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AiArtifactSandboxProps {
  className?: string;
  initialMode?: "preview" | "code";
}

export function AiArtifactSandbox({
  className,
  initialMode = "preview",
}: AiArtifactSandboxProps) {
  const [mode, setMode] = useState<"preview" | "code">(initialMode);
  const [copied, setCopied] = useState(false);

  const sampleCode = `export default function Card() {\n  return (\n    <div className="p-6 bg-indigo-600 rounded-2xl text-white font-bold">\n      AI Generated Artifact\n    </div>\n  );\n}`;

  return (
    <div className={cn("w-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col", className)}>
      {/* Tab Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white">Artifact Viewer</span>
        </div>
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode("preview")}
            className={cn("flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium", mode === "preview" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white")}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            onClick={() => setMode("code")}
            className={cn("flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium", mode === "code" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white")}
          >
            <Code className="w-3.5 h-3.5" /> Code
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-8 min-h-[250px] flex items-center justify-center relative bg-black/40">
        {mode === "preview" ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl shadow-xl text-white text-center font-bold">
            ⚡ AI Component Artifact
          </motion.div>
        ) : (
          <div className="w-full relative">
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="p-4 rounded-xl bg-zinc-900 text-indigo-300 font-mono text-xs overflow-x-auto">
              {sampleCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
