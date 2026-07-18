"use client";

import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ExpandableSidebarVariant = "hover" | "click" | "floating";

interface SidebarContextProps {
  isExpanded: boolean;
  variant: ExpandableSidebarVariant;
}

const SidebarContext = createContext<SidebarContextProps>({
  isExpanded: false,
  variant: "hover",
});

interface ExpandableSidebarProps {
  children: React.ReactNode;
  className?: string;
  variant?: ExpandableSidebarVariant;
  /** Width in pixels when collapsed */
  collapsedWidth?: number;
  /** Width in pixels when expanded */
  expandedWidth?: number;
}

export function ExpandableSidebar({
  children,
  className,
  variant = "hover",
  collapsedWidth = 72,
  expandedWidth = 260,
}: ExpandableSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (variant === "hover") setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (variant === "hover") setIsExpanded(false);
  };

  const handleClick = () => {
    if (variant === "click" || variant === "floating") {
      setIsExpanded(!isExpanded);
    }
  };

  const isFloating = variant === "floating";

  return (
    <SidebarContext.Provider value={{ isExpanded, variant }}>
      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        initial={false}
        animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={cn(
          "h-full shrink-0 flex flex-col bg-zinc-950 border-r border-white/10 shadow-2xl overflow-hidden",
          isFloating ? "absolute left-0 top-0 bottom-0 z-50 rounded-r-2xl" : "relative",
          variant !== "hover" && "cursor-pointer",
          className
        )}
      >
        {children}
      </motion.aside>
      
      {/* Backdrop for floating variant */}
      <AnimatePresence>
        {isFloating && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  className?: string;
  isActive?: boolean;
}

export function SidebarItem({ icon, label, href, className, isActive }: SidebarItemProps) {
  const { isExpanded } = useContext(SidebarContext);
  const Comp = href ? "a" : "div";

  return (
    <Comp
      href={href}
      className={cn(
        "flex items-center gap-4 px-5 py-3 transition-colors duration-200 outline-none w-full",
        isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5",
        href && "cursor-pointer",
        className
      )}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
        {icon}
      </div>
      
      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, filter: "blur(4px)", x: -10 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", x: -10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="whitespace-nowrap font-medium text-sm flex-1 truncate"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Comp>
  );
}

interface SidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  const { isExpanded } = useContext(SidebarContext);
  
  return (
    <div className={cn("px-5 py-6 flex items-center min-h-[80px]", className)}>
      <AnimatePresence mode="popLayout">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap flex-1 truncate"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"
          >
            {/* A small generic indicator when collapsed if they pass a complex header */}
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
