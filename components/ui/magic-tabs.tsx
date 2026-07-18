'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUXSounds } from '@/hooks/use-ux-sounds';

interface MagicTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  activeClassName?: string;
}

export function MagicTabs({ tabs, activeTab, onChange, className, activeClassName }: MagicTabsProps) {
  const { playSound } = useUXSounds();

  const handleTabClick = (id: string) => {
    if (activeTab !== id) {
      playSound('pop');
      onChange(id);
    }
  };

  return (
    <div className={cn("flex space-x-1 rounded-xl bg-muted/40 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "relative w-full rounded-lg px-3 py-1.5 text-sm font-medium transition-colors outline-none",
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/80 hover:bg-muted/50"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="bubble"
              className={cn("absolute inset-0 bg-background shadow-sm rounded-lg", activeClassName)}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
