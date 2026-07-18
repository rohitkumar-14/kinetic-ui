"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SmartNavbarProps extends Omit<HTMLMotionProps<"nav">, "children"> {
  children: React.ReactNode;
  threshold?: number;
  glass?: boolean;
  container?: React.RefObject<HTMLElement>;
}

export function SmartNavbar({
  children,
  threshold = 50,
  glass = true,
  container,
  className,
  ...props
}: SmartNavbarProps) {
  const { scrollY } = useScroll({ container });
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > threshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Only update hidden state if we've actually scrolled a decent amount
    // or if we're near the top
    if (latest <= threshold) {
      setHidden(false);
    } else if (latest > previous + 5) {
      // Scrolling down
      setHidden(true);
    } else if (latest < previous - 5) {
      // Scrolling up
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-colors duration-300",
        isScrolled && glass
          ? "bg-background/70 backdrop-blur-md border-b border-border/50"
          : "bg-transparent border-transparent",
        !glass && isScrolled ? "bg-background border-b border-border/50" : "",
        className
      )}
      {...props}
    >
      {children}
    </motion.nav>
  );
}
