"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Terminal, Activity, ShieldAlert, CheckCircle, Info } from "lucide-react";

export interface BadgeDemoProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "premium" | "glow";
}

export function BadgeDemo({ variant }: BadgeDemoProps) {
  // If variant is specified, render the specific showcase for that variant
  if (variant === "default") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Default Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge>Active Node</Badge>
          <Badge>System Online</Badge>
          <Badge>Default</Badge>
        </div>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Secondary Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="secondary">Archive</Badge>
          <Badge variant="secondary">v1.2.0</Badge>
        </div>
      </div>
    );
  }

  if (variant === "destructive") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Destructive Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="destructive" className="flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            Deprecated
          </Badge>
          <Badge variant="destructive">System Error</Badge>
          <Badge variant="destructive">Offline</Badge>
        </div>
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Outline Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="outline">Draft Mode</Badge>
          <Badge variant="outline">Optional</Badge>
          <Badge variant="outline">External Link</Badge>
        </div>
      </div>
    );
  }

  if (variant === "premium") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Premium Mesh Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="premium" className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            Enterprise
          </Badge>
          <Badge variant="premium">Pro Member</Badge>
          <Badge variant="premium">Lifetime Access</Badge>
        </div>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Custom Glow Variant</span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-1 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
            <Activity className="w-3 h-3 animate-pulse" />
            Live Stream
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            <CheckCircle className="w-3 h-3" />
            Verified
          </Badge>
        </div>
      </div>
    );
  }

  // Fallback: render the original full grid overview
  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md flex flex-wrap items-center justify-center gap-3">
      <Badge>Active</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Deprecated</Badge>
      <Badge variant="outline">Draft Mode</Badge>
      <Badge variant="premium" className="flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-yellow-300" />
        Enterprise
      </Badge>
      <Badge className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-1 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
        <Activity className="w-3 h-3" />
        Live Stream
      </Badge>
    </div>
  );
}
