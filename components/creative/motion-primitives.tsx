"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Fade In ─────────────────────────────────────────────────────────────────
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}
export function FadeIn({ children, className, delay = 0, duration = 0.5, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Slide Up ────────────────────────────────────────────────────────────────
interface SlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  yOffset?: number;
}
export function SlideUp({ children, className, delay = 0, duration = 0.6, yOffset = 40, ...props }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Scale In ────────────────────────────────────────────────────────────────
interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialScale?: number;
}
export function ScaleIn({ children, className, delay = 0, duration = 0.5, initialScale = 0.8, ...props }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.175, 0.885, 0.32, 1.275] }} // BackOut ease
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Blur In ─────────────────────────────────────────────────────────────────
interface BlurInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialBlur?: string;
}
export function BlurIn({ children, className, delay = 0, duration = 0.8, initialBlur = "10px", ...props }: BlurInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: `blur(${initialBlur})` }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Rotate In ───────────────────────────────────────────────────────────────
interface RotateInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialRotation?: number;
}
export function RotateIn({ children, className, delay = 0, duration = 0.6, initialRotation = -15, ...props }: RotateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: initialRotation, scale: 0.95 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}


// ── Stagger Container & Item ────────────────────────────────────────────────
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  delayChildren?: number;
  staggerChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  yOffset?: number;
}

export function StaggerItem({ children, className, yOffset = 30, ...props }: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
