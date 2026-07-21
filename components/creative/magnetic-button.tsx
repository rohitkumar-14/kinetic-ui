"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MagneticVariant = "standard" | "heavy" | "bouncy";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticPull?: number;
  scale?: number;
  speed?: number;
  color?: string;
  withSound?: boolean;
  variant?: MagneticVariant;
}

export function MagneticButton({
  children,
  className,
  magneticPull = 0.3,
  scale,
  speed,
  color,
  withSound = false,
  variant = "standard",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    const activePull = scale !== undefined ? scale * 0.35 : magneticPull;

    setPosition({
      x: middleX * activePull,
      y: middleY * activePull,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPosition({ x: 0, y: 0 });
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);
  };

  const hasBg = className?.includes("bg-");
  const hasText = className?.includes("text-");
  const isTransparent = className?.includes("bg-transparent") || className?.includes("border");

  const customStyle: React.CSSProperties = { ...props.style };
  if (color) {
    if (isTransparent) {
      if (!customStyle.borderColor) customStyle.borderColor = color;
      if (!customStyle.color) customStyle.color = color;
    } else {
      if (!customStyle.backgroundColor) customStyle.backgroundColor = color;
      if (!customStyle.color) customStyle.color = "#ffffff";
    }
  }

  const getPhysics = () => {
    const baseSpeed = speed || 1;
    switch (variant) {
      case "heavy":
        return { stiffness: 100 * baseSpeed, damping: 30 / baseSpeed, mass: 2 };
      case "bouncy":
        return { stiffness: 400 * baseSpeed, damping: 10 / baseSpeed, mass: 0.5 };
      case "standard":
      default:
        return { stiffness: 150 * baseSpeed, damping: 15 / baseSpeed, mass: 0.1 };
    }
  };

  const physics = getPhysics();

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", ...physics }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        !hasBg && "bg-primary hover:bg-primary/90",
        !hasText && "text-primary-foreground",
        className
      )}
      style={customStyle}
      {...(props as any)}
    >
      <motion.span
        className="inline-flex items-center justify-center"
        animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
        transition={{ type: "spring", ...physics }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
