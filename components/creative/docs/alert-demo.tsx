"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export interface AlertDemoProps {
  variant?: "default" | "destructive" | "warning" | "success" | "premium";
}

export function AlertDemo({ variant }: AlertDemoProps) {
  if (variant === "default") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Alert className="bg-zinc-950/40 border-white/5 backdrop-blur-md">
          <Info className="h-4 w-4 text-indigo-400" />
          <AlertTitle className="text-sm font-semibold text-zinc-200">System Notification</AlertTitle>
          <AlertDescription className="text-xs text-zinc-400 font-light mt-1">
            A new version of the layout builder is ready. Save your current files before upgrading.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (variant === "destructive") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Alert variant="destructive" className="bg-zinc-950/20 border-red-500/20 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm font-semibold text-red-400">Critical Error</AlertTitle>
          <AlertDescription className="text-xs text-red-500/80 font-light mt-1">
            Your project configuration has outdated properties. Please review package dependencies.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (variant === "warning") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Alert className="bg-zinc-950/40 border-yellow-500/10 backdrop-blur-md">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-sm font-semibold text-yellow-500">Warning Alert</AlertTitle>
          <AlertDescription className="text-xs text-zinc-400 font-light mt-1">
            Local database synchronization took longer than expected. Retrying link connections...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (variant === "success") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Alert className="bg-zinc-950/40 border-emerald-500/15 backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <AlertTitle className="text-sm font-semibold text-emerald-400">Success Status</AlertTitle>
          <AlertDescription className="text-xs text-zinc-400 font-light mt-1">
            Database migrated successfully. All index nodes are fully operational and responding at 12ms.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (variant === "premium") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Alert className="bg-zinc-950/50 border-indigo-500/30 backdrop-blur-lg shadow-[0_0_20px_rgba(99,102,241,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          <AlertTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center gap-1.5">
            Enterprise Feature Unlocked
          </AlertTitle>
          <AlertDescription className="text-xs text-zinc-400 font-light mt-1">
            You now have access to limitless computing, dynamic CDN edges, and premium custom GLSL shaders.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Fallback: list of alerts
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <Alert className="bg-zinc-950/40 border-white/5 backdrop-blur-md">
        <Info className="h-4 w-4 text-indigo-400" />
        <AlertTitle className="text-sm font-semibold text-zinc-200">System Notification</AlertTitle>
        <AlertDescription className="text-xs text-zinc-400 font-light">
          A new version of the layout builder is ready. Save your current files before upgrading.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive" className="bg-zinc-950/20 border-red-500/20 text-red-400">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-sm font-semibold text-red-400">Critical Error</AlertTitle>
        <AlertDescription className="text-xs text-red-500/80 font-light">
          Your project configuration has outdated properties. Please review package dependencies.
        </AlertDescription>
      </Alert>
    </div>
  );
}
