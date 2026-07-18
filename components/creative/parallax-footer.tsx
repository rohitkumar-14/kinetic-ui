"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  scrollContainer?: React.RefObject<any>;
  /** Parallax intensity — higher = more travel. Default: 30 */
  intensity?: number;
  /** Show the large watermark brand text behind the footer */
  watermark?: string;
  /** Gradient accent color (CSS color string) */
  accentColor?: string;
}

export function ParallaxFooter({
  children,
  className,
  scrollContainer,
  intensity = 30,
  watermark,
  accentColor = "#6366f1",
  ...props
}: ParallaxFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start end", "end end"],
  });

  // Parallax effect: slides up into view
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, "0%"]);
  // Slight scale for depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  // Fade-in on scroll — start partially visible so content isn't hidden in embedded containers
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <footer
      ref={containerRef}
      className={cn("@container relative w-full overflow-hidden", className)}
      {...props}
    >
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute -top-px left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-40 rounded-full blur-[100px] opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      <motion.div style={{ y, scale, opacity }} className="relative w-full h-full">
        {/* Watermark brand text */}
        {watermark && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden pb-4">
            <span
              className="text-[18cqw] @md:text-[14cqw] font-black tracking-tighter leading-none select-none whitespace-nowrap"
              style={{
                color: "transparent",
                WebkitTextStroke: `1px rgba(255,255,255,0.04)`,
              }}
            >
              {watermark}
            </span>
          </div>
        )}

        {/* Noise texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] bg-repeat" />

        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    </footer>
  );
}
