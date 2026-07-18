"use client";

import React, { useState, useRef, createContext, useContext } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { Maximize2, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Context to manage highest z-index across all windows
const DesktopContext = createContext<{
  highestZ: number;
  bringToFront: () => number;
  containerRef: React.RefObject<HTMLDivElement> | null;
}>({ highestZ: 10, bringToFront: () => 10, containerRef: null });

interface DesktopEnvironmentProps {
  children: React.ReactNode;
  className?: string;
  backgroundUrl?: string;
}

export function DesktopEnvironment({ children, className, backgroundUrl }: DesktopEnvironmentProps) {
  const [highestZ, setHighestZ] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  const bringToFront = () => {
    setHighestZ(prev => prev + 1);
    return highestZ + 1;
  };

  return (
    <DesktopContext.Provider value={{ highestZ, bringToFront, containerRef }}>
      <div 
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden bg-slate-900", className)}
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {children}
      </div>
    </DesktopContext.Provider>
  );
}

interface DraggableWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
  className?: string;
  onClose?: () => void;
}

export function DraggableWindow({
  id,
  title,
  children,
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 600, height: 400 },
  className,
  onClose
}: DraggableWindowProps) {
  const { bringToFront, containerRef } = useContext(DesktopContext);
  const [zIndex, setZIndex] = useState(10);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const dragControls = useDragControls();

  const handlePointerDown = (e: React.PointerEvent) => {
    setZIndex(bringToFront());
  };

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!isFullscreen}
      dragControls={dragControls}
      dragListener={false} // Disable dragging on the whole body
      dragConstraints={containerRef || undefined}
      dragMomentum={false}
      dragElastic={0}
      initial={{ x: defaultPosition.x, y: defaultPosition.y, scale: 0.95, opacity: 0 }}
      animate={{ 
        x: isFullscreen ? 0 : undefined,
        y: isFullscreen ? 0 : undefined,
        scale: 1, 
        opacity: 1,
        width: isFullscreen ? "100%" : defaultSize.width,
        height: isFullscreen ? "100%" : defaultSize.height,
      }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onPointerDown={handlePointerDown}
      style={{ zIndex }}
      className={cn(
        "absolute flex flex-col bg-slate-950/80 backdrop-blur-2xl border border-white/20 rounded-xl overflow-hidden shadow-2xl",
        isFullscreen && "rounded-none border-none",
        className
      )}
    >
      {/* Title Bar - Drag Handle */}
      <div 
        className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/10 select-none touch-none"
        onPointerDown={(e) => {
          handlePointerDown(e);
          dragControls.start(e);
        }}
        onDoubleClick={() => setIsFullscreen(!isFullscreen)}
      >
        <div className="flex gap-2 items-center w-16">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
            className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group"
          >
            <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
            className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center group"
          >
            <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        
        <div className="text-xs font-medium text-zinc-400">
          {title}
        </div>
        
        <div className="w-16" /> {/* Spacer for centering title */}
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-auto custom-scrollbar relative bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}
