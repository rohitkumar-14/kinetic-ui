"use client";

import React from "react";
import { Loader } from "@/components/ui/loader";

export interface LoaderDemoProps {
  variant?: "spinner" | "dots" | "pulse" | "ring" | "bars" | "grid" | "sizes";
}

export function LoaderDemo({ variant }: LoaderDemoProps) {
  if (variant === "dots") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader variant="dots" className="text-indigo-400" />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader variant="pulse" className="text-pink-500" />
      </div>
    );
  }

  if (variant === "ring") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader variant="ring" className="text-purple-400" />
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader variant="bars" className="text-emerald-400" />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader variant="grid" className="text-cyan-400" />
      </div>
    );
  }

  if (variant === "sizes") {
    return (
      <div className="w-full max-w-sm mx-auto p-8 flex flex-wrap items-end justify-center gap-8 bg-zinc-950/20 border border-white/5 rounded-2xl">
        <Loader size="sm" />
        <Loader size="default" />
        <Loader size="lg" />
        <Loader size="xl" />
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className="w-full max-w-sm mx-auto p-8 flex items-center justify-center gap-4 bg-zinc-950/20 border border-white/5 rounded-2xl">
      <Loader />
    </div>
  );
}
