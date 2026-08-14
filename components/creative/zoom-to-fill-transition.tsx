"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ZoomToFillTransitionProps {
  thumbnailContent: React.ReactNode;
  fullContent: React.ReactNode;
  className?: string;
  layoutId?: string;
}

export function ZoomToFillTransition({
  thumbnailContent,
  fullContent,
  className,
  layoutId = "zoom-to-fill"
}: ZoomToFillTransitionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* The Thumbnail View */}
      <motion.div
        layoutId={`${layoutId}-wrapper`}
        className="w-48 h-32 rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <motion.div layoutId={`${layoutId}-content`} className="w-full h-full">
          {thumbnailContent}
        </motion.div>
      </motion.div>

      {/* The Full Screen View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              layoutId={`${layoutId}-wrapper`}
              className="w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden cursor-default relative bg-background mx-4"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-md"
              >
                ✕
              </button>
              
              <motion.div layoutId={`${layoutId}-content`} className="w-full h-full">
                {fullContent}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
