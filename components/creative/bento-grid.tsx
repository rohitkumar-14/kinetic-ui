"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BentoVariant = "standard" | "glow" | "scale";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
  color?: string;
  variant?: BentoVariant;
}

export function BentoGrid({
  children,
  className,
  speed = 1,
  scale = 1,
  color,
  variant = "standard",
}: BentoGridProps) {
  // Pass playground props down to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { speed, scale, color, variant } as any);
    }
    return child;
  });

  return (
    <div className="@container w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 / speed },
          },
        }}
        className={cn("grid grid-cols-1 @md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full", className)}
      >
        {childrenWithProps}
      </motion.div>
    </div>
  );
}

interface BentoCardProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  speed?: number;
  scale?: number;
  color?: string;
  variant?: BentoVariant;
}

export function BentoCard({
  className,
  title,
  description,
  icon,
  header,
  children,
  speed = 1,
  scale = 1,
  color,
  variant = "standard",
}: BentoCardProps) {
  const [hovered, setHovered] = React.useState(false);

  const hoverVariants = {
    standard: { y: -5 * scale },
    glow: { y: 0, boxShadow: color ? `0 0 25px ${color}30` : "0 0 25px rgba(255,255,255,0.1)" },
    scale: { y: 0, scale: 1.02 * scale },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7 / speed, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={hoverVariants[variant]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative rounded-3xl group/bento p-6 flex flex-col space-y-4 overflow-hidden border border-border/50 bg-background/50 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-border",
        className
      )}
      style={{
        borderColor: hovered && color && variant !== "glow" ? color : undefined,
      }}
    >
      {/* Subtle hover gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            hovered && color
              ? `linear-gradient(135deg, ${color}10 0%, ${color}00 70%)`
              : undefined,
        }}
      />

      {header && (
        <div className="flex-1 w-full min-h-[8rem] rounded-2xl overflow-hidden bg-muted/50 border border-border/50 relative">
          {header}
        </div>
      )}

      <div className="group-hover/bento:translate-x-1 transition-transform duration-300 z-10 flex flex-col h-full justify-end">
        {icon && <div className="mb-3 text-zinc-400">{icon}</div>}
        {title && (
          <h3 className="font-semibold text-lg text-foreground tracking-tight mb-2">
            {title}
          </h3>
        )}
        {description && (
          <div className="font-light text-muted-foreground text-sm leading-relaxed">
            {description}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}
