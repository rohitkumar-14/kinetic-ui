"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, Bell, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoIslandNavProps {
  className?: string;
}

export function BentoIslandNav({ className }: BentoIslandNavProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-4", className)}>
      <motion.div
        layout
        className="bg-black/90 border border-white/15 backdrop-blur-2xl rounded-full p-2 flex items-center gap-2 shadow-2xl z-20"
      >
        <button
          onClick={() => setActiveTab(activeTab === "explore" ? null : "explore")}
          className={cn("p-2.5 rounded-full transition-colors", activeTab === "explore" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <Compass className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab(activeTab === "notify" ? null : "notify")}
          className={cn("p-2.5 rounded-full transition-colors relative", activeTab === "notify" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        </button>
        <button
          onClick={() => setActiveTab(activeTab === "settings" ? null : "settings")}
          className={cn("p-2.5 rounded-full transition-colors", activeTab === "settings" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <Settings className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Expandable Bento Panel */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 w-72 bg-zinc-950 border border-white/10 rounded-3xl p-5 shadow-2xl z-10 text-white text-xs"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {activeTab}
              </span>
              <button onClick={() => setActiveTab(null)} className="text-zinc-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Dynamic Island Widget Panel for {activeTab}. Custom navigation controls and stats display here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
