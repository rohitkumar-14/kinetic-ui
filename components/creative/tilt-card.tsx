"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type TiltVariant = "standard" | "reverse" | "push";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Max tilt rotation in degrees. Default: 15 */
  tiltIntensity?: number;
  /** Animation speed multiplier. Default: 1 */
  speed?: number;
  /** Initial scale modifier. Default: 1 */
  scale?: number;
  /** Base hover color. */
  color?: string;
  /** The interaction variant. Default: "standard" */
  variant?: TiltVariant;
}

export function TiltCard({
  children,
  className,
  tiltIntensity = 15,
  speed = 1,
  scale = 1,
  color,
  variant = "standard",
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const activeStiffness = 150 * speed;
  const activeDamping = 20 / speed;

  const mouseXSpring = useSpring(x, { stiffness: activeStiffness, damping: activeDamping });
  const mouseYSpring = useSpring(y, { stiffness: activeStiffness, damping: activeDamping });

  const activeIntensity = tiltIntensity * scale;
  const invert = variant === "reverse" ? -1 : 1;

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [activeIntensity * invert, -activeIntensity * invert]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-activeIntensity * invert, activeIntensity * invert]);
  const translateZ = useTransform(mouseXSpring, () => {
    if (variant === "push") {
      // Calculate distance from center to push down
      const distance = Math.sqrt(x.get() ** 2 + y.get() ** 2);
      return distance * -50; 
    }
    return 0;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      style={{
        rotateX,
        rotateY,
        z: translateZ,
        transformStyle: "preserve-3d",
        borderColor: hovered && color ? color : undefined,
        boxShadow: hovered && color ? `0 0 20px ${color}15` : undefined,
        ...props.style,
      }}
      className={cn(
        "relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-colors duration-300",
        className
      )}
      {...(props as any)}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full w-full">
        {children}
      </div>

      {/* Gloss effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: color
            ? `linear-gradient(135deg, ${color}20 0%, ${color}00 50%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
          transform: "translateZ(1px)",
        }}
      />
    </motion.div>
  );
}
