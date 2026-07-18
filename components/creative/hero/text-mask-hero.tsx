"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Sparkles } from "lucide-react";

export type TextMaskHeroVariant = "gradient" | "video";

interface TextMaskHeroProps {
  variant?: TextMaskHeroVariant;
  text?: string;
  subtext?: string;
  videoSrc?: string;
  gradient?: string;
  className?: string;
}

export function TextMaskHero({
  variant = "gradient",
  text = "CREATIVE",
  subtext = "Scroll to discover the magic behind the mask.",
  videoSrc = "https://cdn.pixabay.com/video/2021/08/11/84687-587212476_large.mp4",
  gradient = "linear-gradient(45deg, #ff0055, #0000ff, #00ff99, #ff0055)",
  className,
}: TextMaskHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    if (!textContainerRef.current) return;

    // Initial scale-up entrance animation
    gsap.fromTo(
      textContainerRef.current,
      { scale: 0.82, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "power4.out" }
    );
  }, { scope: containerRef });

  // Update spotlight coordinates using GSAP for buttery smooth spring interpolation
  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(containerRef.current, {
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const handleTouchMove = contextSafe((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    gsap.to(containerRef.current, {
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      "--mouse-x": "50%",
      "--mouse-y": "50%",
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "@container group relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white cursor-none select-none",
        className
      )}
      style={{
        // Set default centered values on mount
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      {/* Dynamic ambient cursor lighting behind text */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background: `radial-gradient(circle 380px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            variant === "gradient" ? "rgba(99, 102, 241, 0.15)" : "rgba(244, 63, 94, 0.15)"
          }, transparent 80%)`,
        }}
      />

      {/* Top subtle decorative badge */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-semibold tracking-[0.25em] uppercase text-zinc-400">
        <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
        Interactive Mask Experience
      </div>

      {/* Dual Text Layer Container */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        {/* Layer 1: Background Outline Text (Always Visible) */}
        <h1 className="absolute text-[15cqw] font-black leading-none tracking-tighter uppercase text-center w-full text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
          {text}
        </h1>

        {/* Layer 2: Masked Foreground Filled Text (Visible only within spotlight) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            maskImage: "radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 80%)",
          }}
        >
          {variant === "gradient" ? (
            <h1
              className="text-[15cqw] font-black leading-none tracking-tighter uppercase text-center w-full bg-clip-text text-transparent select-none"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: gradient,
                backgroundSize: "300% 300%",
                animation: "gradient-shift 8s ease infinite",
              }}
            >
              {text}
            </h1>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                src={videoSrc}
              />
              <div className="absolute inset-0 bg-black flex items-center justify-center mix-blend-multiply">
                <h1 className="text-[15cqw] font-black leading-none tracking-tighter uppercase text-center w-full text-white select-none">
                  {text}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Styled inline animation keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `,
        }}
      />

      {/* Foreground Content */}
      <div className="z-10 absolute bottom-12 flex flex-col items-center text-center px-4">
        <p className="text-xs @md:text-sm text-zinc-500 uppercase tracking-[0.2em] mb-2">
          Hover or drag over the text
        </p>
        <p className="text-sm @md:text-base text-zinc-300 max-w-md mx-auto mb-6">
          {subtext}
        </p>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-lg animate-bounce">
          <ArrowDown className="w-4 h-4 text-white/50" />
        </div>
      </div>
    </section>
  );
}
