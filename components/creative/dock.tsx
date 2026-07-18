"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export type DockVariant = "bottom" | "top" | "floating";

interface DockProps {
  children: React.ReactNode;
  className?: string;
  variant?: DockVariant;
  /** Background color of the dock container */
  backgroundColor?: string;
}

export function Dock({
  children,
  className,
  variant = "bottom",
  backgroundColor = "rgba(0, 0, 0, 0.4)",
}: DockProps) {
  // Track mouse X position relative to the dock
  const mouseX = useMotionValue(Infinity);

  const isFloating = variant === "floating";

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "z-50 mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/10 px-4 pb-3 backdrop-blur-xl transition-all duration-300 shadow-2xl",
        variant === "bottom" && "fixed bottom-6 left-1/2 -translate-x-1/2",
        variant === "top" && "fixed top-6 left-1/2 -translate-x-1/2 rotate-180", // flip so items expand "down"
        isFloating && "relative",
        className
      )}
      style={{ backgroundColor }}
      role="navigation"
      aria-label="Dock Navigation"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { mouseX });
        }
        return child;
      })}
    </motion.div>
  );
}

interface DockItemProps {
  mouseX?: MotionValue<number>;
  children: React.ReactNode;
  href?: string;
  className?: string;
  /** Optional text to display on hover */
  label?: string;
  /** Action on click */
  onClick?: () => void;
}

export function DockItem({ mouseX, children, href, className, label, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Default values if not inside Dock (e.g. standalone)
  const defaultMouseX = useMotionValue(Infinity);
  const activeMouseX = mouseX || defaultMouseX;

  // Calculate distance from the mouse to the center of this item
  const distance = useTransform(activeMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to scale. The closer to 0 (center), the larger the scale.
  // We use a spring so the scale transition is bouncy and smooth.
  const scaleSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // Map distance to Y offset to lift the item slightly.
  const ySync = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref as any}
      href={href}
      onClick={onClick}
      style={{ width: scale, height: scale, y }}
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-full bg-white/10 text-white shadow-md border border-white/10 transition-colors hover:bg-white/20 outline-none",
        className
      )}
      whileTap={{ scale: 0.95 }}
    >
      {/* Label Tooltip */}
      {label && (
        <span
          className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 scale-0 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
        >
          {label}
        </span>
      )}
      
      {/* For icons inside, we scale them up relative to the container */}
      <span className="flex items-center justify-center w-1/2 h-1/2">
        {children}
      </span>
    </Comp>
  );
}
