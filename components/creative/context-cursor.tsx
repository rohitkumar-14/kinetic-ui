"use client";

import React, { createContext, useContext, useState, useEffect, RefObject } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type CursorState = {
  text?: string;
  icon?: React.ReactNode;
  size?: number;
  color?: string;
  variant?: "default" | "solid" | "outline" | "invisible";
};

type CursorContextType = {
  cursor: CursorState;
  setCursor: (state: CursorState) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursorState] = useState<CursorState>({ variant: "default", size: 16 });

  const setCursor = (state: CursorState) => {
    setCursorState(prev => ({ ...prev, ...state }));
  };

  const resetCursor = () => {
    setCursorState({ variant: "default", size: 16 });
  };

  return (
    <CursorContext.Provider value={{ cursor, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

export interface ContextCursorProps {
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function ContextCursor({ containerRef, className }: ContextCursorProps) {
  const { cursor } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const container = containerRef?.current || window;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        cursorX.set(clientX - rect.left);
        cursorY.set(clientY - rect.top);
      } else {
        cursorX.set(clientX);
        cursorY.set(clientY);
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    container.addEventListener("mousemove", handleMouseMove as EventListener);
    container.addEventListener("touchmove", handleMouseMove as EventListener);
    
    if (containerRef?.current) {
      container.addEventListener("mouseleave", handleMouseLeave as EventListener);
      container.addEventListener("mouseenter", handleMouseEnter as EventListener);
    } else {
      document.body.addEventListener("mouseleave", handleMouseLeave as EventListener);
      document.body.addEventListener("mouseenter", handleMouseEnter as EventListener);
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      container.removeEventListener("touchmove", handleMouseMove as EventListener);
      
      if (containerRef?.current) {
        container.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        container.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      } else {
        document.body.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        document.body.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      }
    };
  }, [cursorX, cursorY, isVisible, containerRef]);

  const size = cursor.size || 16;

  // Prevent rendering if global document doesn't have pointer events (e.g. mobile)
  // Simple heuristic: if we're on a small screen, we might want to hide custom cursors entirely.
  // For this component, we'll let the user handle it via CSS media queries.

  return (
    <motion.div
      className={cn(
        "pointer-events-none z-[100] flex items-center justify-center rounded-full overflow-hidden hidden md:flex",
        containerRef ? "absolute" : "fixed",
        cursor.variant === "invisible" ? "opacity-0" : "opacity-100",
        className
      )}
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: cursor.variant === "solid" ? (cursor.color || "white") : "transparent",
        border: cursor.variant === "outline" ? `1px solid ${cursor.color || "white"}` : "none",
        color: cursor.variant === "solid" ? "black" : (cursor.color || "white"),
        mixBlendMode: cursor.variant === "default" ? "difference" : "normal",
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: cursor.variant === "solid" ? (cursor.color || "white") : (cursor.variant === "default" ? "white" : "transparent"),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {(cursor.text || cursor.icon) && (
          <motion.div
            key={cursor.text || "icon"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center justify-center whitespace-nowrap text-xs font-semibold px-2"
          >
            {cursor.icon && <span className="mr-1">{cursor.icon}</span>}
            {cursor.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
