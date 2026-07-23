"use client";

import React, { useState } from "react";
import { Download, Copy, Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeExporterProps {
  className?: string;
}

export function ThemeExporter({ className }: ThemeExporterProps) {
  const [primary, setPrimary] = useState("#6366f1");
  const [accent, setAccent] = useState("#a855f7");
  const [copied, setCopied] = useState(false);

  const cssOutput = `@theme {\n  --color-primary: ${primary};\n  --color-accent: ${accent};\n  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}`;

  return (
    <div className={cn("w-full bg-zinc-950 border border-white/10 rounded-3xl p-6 font-mono text-xs text-zinc-300 shadow-2xl flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-white tracking-wide text-sm">Tailwind v4 Theme Exporter</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Primary Color</label>
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            className="w-full h-10 rounded-xl bg-black border border-white/10 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Accent Color</label>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-full h-10 rounded-xl bg-black border border-white/10 cursor-pointer"
          />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            navigator.clipboard.writeText(cssOutput);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/10 text-white hover:bg-zinc-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy CSS"}
        </button>
        <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-indigo-300 overflow-x-auto">
          {cssOutput}
        </pre>
      </div>
    </div>
  );
}
