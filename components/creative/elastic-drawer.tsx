"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripHorizontal, X } from "lucide-react";

interface ElasticDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function ElasticDrawer({
  isOpen,
  onClose,
  children,
  title = "Details",
  className,
}: ElasticDrawerProps) {
  const dragControls = useDragControls();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 0.8,
            }}
            drag="y"
            dragControls={dragControls}
            dragListener={false} // Only allow dragging from the handle area
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4} // The rubber-band effect!
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 h-[80vh] flex flex-col bg-neutral-900 border-t border-white/10 rounded-t-3xl shadow-2xl font-sans",
              className
            )}
          >
            {/* Drag Handle Area */}
            <div 
              className="w-full pt-4 pb-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 text-neutral-300">
              {children || (
                <div className="space-y-6">
                  <p>
                    This is an elastic drawer component powered by Framer Motion. Try grabbing the handle at the top and pulling it upwards to feel the <strong>rubber-band elastic overscroll resistance</strong>, just like native iOS sheets!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p>
                    Swipe down with velocity or drag past the threshold to snap the drawer closed.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
