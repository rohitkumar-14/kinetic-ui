"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
}

export interface GlassTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (id: string) => void;
  /** Optional custom ID for layout animations if using multiple instances on the same page */
  layoutId?: string;
}

export function GlassTabs({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  layoutId = "glass-tab-indicator",
  className,
  ...props
}: GlassTabsProps) {
  const [internalTab, setInternalTab] = useState(tabs[0]?.id);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalTab;

  const handleTabChange = (id: string) => {
    if (controlledActiveTab === undefined) {
      setInternalTab(id);
    }
    onChange?.(id);
  };

  return (
    <div
      className={cn(
        "relative flex items-center p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative px-5 py-2 text-sm font-medium transition-colors duration-300 outline-none",
              isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
            style={{
              // Prevent tap highlight on mobile
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 z-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  // The backdrop-blur is actually what creates the physical glass distortion 
                  // as it slides over the background colors.
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
