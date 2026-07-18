"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  gridClassName?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
}

export function GalleryLightbox({
  images,
  gridClassName,
  aspectRatio = "video",
  className,
  ...props
}: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % images.length);
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const handleClose = () => {
    setSelectedIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const getAspectClass = () => {
    switch(aspectRatio) {
      case "video": return "aspect-video";
      case "square": return "aspect-square";
      case "portrait": return "aspect-[3/4]";
      default: return "";
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Grid Layout */}
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", gridClassName)}>
        {images.map((image, index) => (
          <motion.div
            key={`grid-${image.id}`}
            className={cn("relative overflow-hidden rounded-xl cursor-pointer bg-zinc-900 group", getAspectClass())}
            onClick={() => setSelectedIndex(index)}
            layoutId={`gallery-image-${image.id}`}
            whileHover={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Optional overlay indicator */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-auto"
              onClick={handleClose}
            />

            {/* Controls */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-8 h-8" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              </>
            )}

            {/* Active Image */}
            <div className="relative z-[105] max-w-5xl w-full max-h-[85vh] p-4 md:p-8 flex items-center justify-center pointer-events-auto shadow-2xl">
              <motion.img
                key={`modal-${activeImage.id}`}
                layoutId={`gallery-image-${activeImage.id}`}
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl bg-zinc-950"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              
              {activeImage.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-[-2rem] md:bottom-0 left-0 right-0 text-center pointer-events-none"
                >
                  <span className="inline-block bg-black/60 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full border border-white/10">
                    {activeImage.caption}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
