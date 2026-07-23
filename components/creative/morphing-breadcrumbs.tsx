"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home, Folder, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MorphingBreadcrumbsProps {
  className?: string;
}

export function MorphingBreadcrumbs({ className }: MorphingBreadcrumbsProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const items = [
    { label: "Home", icon: <Home className="w-3.5 h-3.5" />, options: ["Dashboard", "Overview", "Analytics"] },
    { label: "Components", icon: <Folder className="w-3.5 h-3.5" />, options: ["Buttons", "Cards", "Navigation"] },
    { label: "MorphingBreadcrumbs", icon: <FileText className="w-3.5 h-3.5" />, options: ["Usage", "API Reference", "Examples"] },
  ];

  return (
    <div className={cn("flex items-center gap-2 p-3 bg-zinc-950 border border-white/10 rounded-2xl text-xs font-mono text-zinc-300 relative select-none", className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-zinc-900 transition-colors hover:text-white"
            >
              <span className="text-indigo-400">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </button>

            <AnimatePresence>
              {openDropdown === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 mt-2 w-36 bg-zinc-900 border border-white/10 rounded-xl p-1 shadow-2xl z-20"
                >
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOpenDropdown(null)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {idx < items.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
        </React.Fragment>
      ))}
    </div>
  );
}
