"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InfiniteMarqueeProps {
  className?: string;
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}

export function InfiniteMarquee({
  className,
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const getSpeedDuration = () => {
    switch (speed) {
      case "fast":
        return "20s";
      case "normal":
        return "40s";
      case "slow":
        return "80s";
      default:
        return "40s";
    }
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
      <div 
        className={cn(
          "w-full overflow-hidden flex relative",
          className
        )}
      >
        <div
          className={cn(
            "flex min-w-full shrink-0 items-center justify-around gap-4",
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: getSpeedDuration(),
            // We duplicate the children width to 200% so that we can translate -50% for a seamless loop
            width: "max-content", 
          }}
        >
          {/* We duplicate the children so it flows seamlessly */}
          <div className="flex shrink-0 items-center justify-around gap-4 px-2">
            {children}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-4 px-2" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
