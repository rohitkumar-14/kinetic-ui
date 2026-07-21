"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type LiquidVariant = "gooey" | "fill" | "swipe";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: number;
  scale?: number;
  withSound?: boolean;
  variant?: LiquidVariant;
}

export function LiquidButton({
  children,
  className,
  color,
  speed = 1,
  scale = 1,
  withSound = false,
  variant = "gooey",
  ...props
}: LiquidButtonProps) {
  const hasBg = className?.includes("bg-");
  const hasText = className?.includes("text-");
  const hoverDuration = 0.5 / speed;

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);
  };

  const getLiquidVariants = (): Variants => {
    switch (variant) {
      case "swipe":
        return {
          rest: { x: "-100%", y: "0%", scale: 1 },
          hover: { x: "0%", y: "0%", scale: 1 },
        };
      case "fill":
        return {
          rest: { y: "100%", x: "0%", scale: 1 },
          hover: { y: "0%", x: "0%", scale: 1 },
        };
      case "gooey":
      default:
        return {
          rest: { scale: 0, x: "0%", y: "0%" },
          hover: { scale: 1, x: "0%", y: "0%" },
        };
    }
  };

  const liquidVariants = getLiquidVariants();

  return (
    <>
      {/* SVG gooey liquid filter definitions */}
      <svg className="hidden w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquidGooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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

      <motion.button
        className={cn(
          "relative overflow-hidden px-8 py-3.5 rounded-full font-semibold text-sm transition-all active:scale-95",
          !hasBg && "bg-white",
          !hasText && "text-black",
          className
        )}
        style={{
          filter: "url(#liquidGooey)",
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          ...props.style,
        }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        initial="rest"
        whileHover="hover"
        animate="rest"
        {...(props as any)}
      >
        <span className="relative z-10">{children}</span>

        {/* Floating background gooey liquid layer */}
        <motion.span
          className="absolute -inset-2 rounded-full -z-10"
          style={{
            filter: "blur(5px)",
            backgroundColor: color || "#6366f1", // indigo-500
          }}
          variants={liquidVariants}
          transition={{ duration: hoverDuration, ease: "easeOut" }}
        />
      </motion.button>
    </>
  );
}
