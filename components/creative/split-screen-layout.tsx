"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SplitScreenLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  stickySide?: "left" | "right" | "none";
  splitRatio?: "50/50" | "40/60" | "60/40" | "30/70" | "70/30";
  stackOnMobile?: boolean;
  stickyHeight?: string;
}

const ratioClasses = {
  "50/50": "md:grid-cols-2",
  "40/60": "md:grid-cols-[4fr_6fr]",
  "60/40": "md:grid-cols-[6fr_4fr]",
  "30/70": "md:grid-cols-[3fr_7fr]",
  "70/30": "md:grid-cols-[7fr_3fr]",
};

export function SplitScreenLayout({
  leftContent,
  rightContent,
  stickySide = "left",
  splitRatio = "50/50",
  stackOnMobile = true,
  stickyHeight = "100vh",
  className,
  ...props
}: SplitScreenLayoutProps) {
  return (
    <div
      className={cn(
        "w-full",
        stackOnMobile ? "grid grid-cols-1" : "grid",
        ratioClasses[splitRatio],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full",
          stickySide === "left" ? "md:sticky md:top-0 md:h-[var(--sticky-height)] md:overflow-y-auto hidden-scrollbar" : "h-full"
        )}
        style={{ "--sticky-height": stickyHeight } as React.CSSProperties}
      >
        {leftContent}
      </div>
      <div
        className={cn(
          "w-full",
          stickySide === "right" ? "md:sticky md:top-0 md:h-[var(--sticky-height)] md:overflow-y-auto hidden-scrollbar" : "h-full"
        )}
        style={{ "--sticky-height": stickyHeight } as React.CSSProperties}
      >
        {rightContent}
      </div>
    </div>
  );
}
