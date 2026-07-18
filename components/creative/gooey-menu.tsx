"use client";

import React, { useState, useId, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GooeyMenuLayout = "radial" | "row" | "column" | "arc" | "grid";

interface GooeyMenuProps {
  children: React.ReactNode;
  /** Custom icon for the toggle button */
  icon?: React.ReactNode;
  className?: string;
  /** Layout pattern for menu items. Default: "radial" */
  layout?: GooeyMenuLayout;
  /** Distance items travel from center (px). Default: 80 */
  radius?: number;
  /** Accent color for the toggle button (hex). */
  color?: string;
  /** Size of the main toggle button in px. Default: 64 */
  size?: number;
  /** SVG filter blur strength. Higher = gooier. Default: 10 */
  blur?: number;
  /** Starting angle in degrees for radial/arc layouts. Default: 0 */
  startAngle?: number;
  /** Spread angle in degrees for arc layout. Default: 180 */
  spreadAngle?: number;
}

// ── Position calculators per layout ──────────────────────────────────────────
function getItemPosition(
  layout: GooeyMenuLayout,
  index: number,
  total: number,
  radius: number,
  startAngle: number,
  spreadAngle: number
): { x: number; y: number } {
  switch (layout) {
    case "radial": {
      const angle = ((startAngle + index * (360 / total)) * Math.PI) / 180;
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    }
    case "arc": {
      const step = total > 1 ? spreadAngle / (total - 1) : 0;
      const angle = ((startAngle + index * step) * Math.PI) / 180;
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    }
    case "row":
      return {
        x: (index - (total - 1) / 2) * (radius * 0.9),
        y: 0,
      };
    case "column":
      return {
        x: 0,
        y: (index - (total - 1) / 2) * (radius * 0.9),
      };
    case "grid": {
      const cols = Math.ceil(Math.sqrt(total));
      const col = index % cols;
      const row = Math.floor(index / cols);
      const offsetX = ((cols - 1) / 2) * radius * 0.8;
      const totalRows = Math.ceil(total / cols);
      const offsetY = ((totalRows - 1) / 2) * radius * 0.8;
      return {
        x: col * radius * 0.8 - offsetX,
        y: row * radius * 0.8 - offsetY - radius * 0.5,
      };
    }
    default:
      return { x: 0, y: 0 };
  }
}

export function GooeyMenu({
  children,
  icon,
  className,
  layout = "radial",
  radius = 80,
  color,
  size = 64,
  blur = 10,
  startAngle = 0,
  spreadAngle = 180,
}: GooeyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterId = useId().replace(/:/g, "_");
  const items = React.Children.toArray(children);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  // Adaptive item size proportional to the main button
  const itemScale = size / 64;

  return (
    <>
      {/* SVG filter — unique ID per instance so multiple menus don't collide */}
      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`goo${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className={cn("relative flex items-center justify-center", className)}>
        <div
          className="relative flex items-center justify-center"
          style={{ filter: `url(#goo${filterId})` }}
        >
          {items.map((item, i) => {
            const pos = getItemPosition(layout, i, items.length, radius, startAngle, spreadAngle);

            return (
              <motion.div
                key={i}
                className="absolute z-0 flex items-center justify-center"
                initial={false}
                animate={
                  isOpen
                    ? { x: pos.x, y: pos.y, scale: 1, opacity: 1 }
                    : { x: 0, y: 0, scale: 0.6, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 24,
                  delay: isOpen ? i * 0.06 : (items.length - i) * 0.03,
                }}
              >
                {item}
              </motion.div>
            );
          })}

          {/* Main Toggle Button */}
          <motion.button
            className={cn(
              "relative z-10 flex items-center justify-center rounded-full shadow-lg outline-none",
              !color && "bg-foreground text-background"
            )}
            style={{
              width: size,
              height: size,
              ...(color
                ? { backgroundColor: color, color: "#fff" }
                : {}),
            }}
            onClick={toggle}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.05 }}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 0.9 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {icon || (
                <svg
                  width={24 * itemScale}
                  height={24 * itemScale}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Backdrop overlay when open */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggle}
            aria-hidden
          />
        )}
      </div>
    </>
  );
}

export function GooeyMenuItem({
  children,
  className,
  onClick,
  label,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Tooltip label shown below the item */
  label?: string;
  /** Custom background color for this item */
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full shadow-md outline-none transition-colors",
          !color && !className?.includes("bg-") && "bg-foreground text-background",
          className
        )}
        style={color ? { backgroundColor: color, color: "#fff" } : undefined}
        onClick={onClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
      >
        {children}
      </motion.button>
      {label && (
        <span className="text-[10px] font-medium text-zinc-400 whitespace-nowrap pointer-events-none select-none">
          {label}
        </span>
      )}
    </div>
  );
}
