"use client";

import React from "react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options?: confetti.Options;
}

export const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  ({ children, className, onClick, options, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        ...options,
      });

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "px-6 py-3 rounded-full font-bold transition-all duration-200 active:scale-95",
          "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg hover:shadow-xl hover:from-violet-400 hover:to-fuchsia-400",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ConfettiButton.displayName = "ConfettiButton";
