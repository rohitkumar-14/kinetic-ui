"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ArrowRight } from "lucide-react";

export interface MorphItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  description?: string;
}

export interface MorphTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MorphItem[];
  variant?: "cards" | "list" | "bento";
}

export function MorphTransition({
  items = [],
  variant = "cards",
  className,
  ...props
}: MorphTransitionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div className={cn("w-full relative", className)} {...props}>
      {/* ─── Base Layouts ─── */}
      <div
        className={cn(
          "grid gap-6",
          variant === "cards" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          variant === "list" && "grid-cols-1 max-w-2xl mx-auto",
          variant === "bento" && "grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-[600px]"
        )}
      >
        {items.map((item, i) => (
          <motion.div
            layoutId={`container-${item.id}`}
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={cn(
              "cursor-pointer bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors group relative",
              variant === "cards" && "flex flex-col h-72",
              variant === "list" && "flex flex-row items-center h-24 p-3 gap-4",
              variant === "bento" && [
                "flex flex-col absolute inset-0 md:relative",
                i === 0 && "md:col-span-2 md:row-span-2",
                i === 1 && "md:col-span-2 md:row-span-1",
                i === 2 && "md:col-span-2 md:row-span-1",
              ]
            )}
          >
            {item.image && (
              <motion.div 
                layoutId={`image-container-${item.id}`}
                className={cn(
                  "overflow-hidden",
                  variant === "cards" && "w-full h-40",
                  variant === "list" && "w-16 h-16 rounded-2xl shrink-0",
                  variant === "bento" && "absolute inset-0 w-full h-full"
                )}
              >
                <motion.img
                  layoutId={`image-${item.id}`}
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {variant === "bento" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                )}
              </motion.div>
            )}

            <div
              className={cn(
                "flex-1 z-10",
                variant === "cards" && "p-5",
                variant === "list" && "p-2",
                variant === "bento" && "absolute bottom-0 left-0 p-6 w-full"
              )}
            >
              <motion.h5
                layoutId={`title-${item.id}`}
                className={cn(
                  "font-bold text-white tracking-tight",
                  variant === "bento" && i === 0 ? "text-3xl" : "text-lg"
                )}
              >
                {item.title}
              </motion.h5>
              {item.subtitle && (
                <motion.p
                  layoutId={`subtitle-${item.id}`}
                  className="text-zinc-400 text-sm mt-1"
                >
                  {item.subtitle}
                </motion.p>
              )}
            </div>
            
            {variant === "list" && (
              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                <ArrowRight className="w-5 h-5 text-white/50" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ─── Expanded Modal View ─── */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`container-${selectedItem.id}`}
              className="relative w-full max-w-4xl bg-zinc-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 pointer-events-auto flex flex-col md:flex-row h-[90vh] md:h-[600px]"
            >
              {selectedItem.image && (
                <motion.div 
                  layoutId={`image-container-${selectedItem.id}`}
                  className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden shrink-0"
                >
                  <motion.img
                    layoutId={`image-${selectedItem.id}`}
                    src={selectedItem.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950/20 to-transparent" />
                </motion.div>
              )}

              <div className="p-8 md:p-12 flex flex-col justify-center flex-1 overflow-y-auto">
                <div>
                  <motion.h5
                    layoutId={`title-${selectedItem.id}`}
                    className="font-black text-4xl text-white mb-3 tracking-tight"
                  >
                    {selectedItem.title}
                  </motion.h5>
                  {selectedItem.subtitle && (
                    <motion.p
                      layoutId={`subtitle-${selectedItem.id}`}
                      className="text-indigo-400 font-semibold mb-8 tracking-wide uppercase text-sm"
                    >
                      {selectedItem.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-zinc-400 leading-relaxed space-y-4"
                  >
                    <p>
                      {selectedItem.description ||
                        "Detailed description goes here. This highly fluid morphing animation retains context by visually connecting the source element to its destination."}
                    </p>
                    <p>
                      Click the close button or anywhere outside this card to seamlessly morph back to the original layout position using Framer Motion's shared layout IDs.
                    </p>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
