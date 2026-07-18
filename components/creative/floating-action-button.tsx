"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FABAction {
  id: string | number;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface FloatingActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: FABAction[];
  position?: "bottom-right" | "bottom-left";
  icon?: React.ReactNode;
}

export function FloatingActionButton({
  actions,
  position = "bottom-right",
  icon = <Plus className="w-6 h-6" />,
  className,
  ...props
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const positionClasses = position === "bottom-right" 
    ? "bottom-6 right-6 md:bottom-8 md:right-8 items-end" 
    : "bottom-6 left-6 md:bottom-8 md:left-8 items-start";

  return (
    <div 
      ref={containerRef}
      className={cn("fixed z-50 flex flex-col gap-4", positionClasses, className)}
      {...props}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 pb-2"
            role="menu"
            aria-orientation="vertical"
          >
            {actions.map((action, i) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: (actions.length - i - 1) * 0.05 }}
                onClick={() => {
                  action.onClick?.();
                  setIsOpen(false);
                }}
                role="menuitem"
                aria-label={action.label}
                className={cn(
                  "group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full",
                  position === "bottom-right" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 hover:scale-110 transition-all shadow-lg border border-white/10">
                  {action.icon}
                </div>
                <span className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap shadow-lg">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20 z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {icon}
        </motion.div>
      </button>
    </div>
  );
}
