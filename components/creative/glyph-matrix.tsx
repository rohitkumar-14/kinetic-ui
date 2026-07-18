"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GlyphTheme = "matrix" | "cyber" | "binary" | "runic";

interface GlyphMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: GlyphTheme;
  fontSize?: number;
  speed?: number;
  density?: number; // spacing multiplier, e.g. 1.2
  fadeSpeed?: number; // trail length: 0.04 (long trails) to 0.15 (short trails)
  interactive?: boolean;
  glow?: boolean;
}

const CHARSETS: Record<GlyphTheme, string> = {
  matrix: "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890:*+-<>|",
  cyber: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&{}[];:?/",
  binary: "01",
  runic: "ᚠᚢᚦᚨᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"
};

const THEME_COLORS: Record<GlyphTheme, { primary: string; glow: string; highlight: string }> = {
  matrix: {
    primary: "rgba(16, 185, 129, 0.85)", // Emerald
    glow: "#10b981",
    highlight: "#ffffff"
  },
  cyber: {
    primary: "rgba(236, 72, 153, 0.85)", // Pink
    glow: "#ec4899",
    highlight: "#22d3ee" // Cyan
  },
  binary: {
    primary: "rgba(59, 130, 246, 0.85)", // Blue
    glow: "#3b82f6",
    highlight: "#10b981" // Emerald
  },
  runic: {
    primary: "rgba(249, 115, 22, 0.85)", // Orange
    glow: "#f97316",
    highlight: "#ffe4e6" // Rose
  }
};

export function GlyphMatrix({
  theme = "matrix",
  fontSize = 14,
  speed = 1.2,
  density = 1.1,
  fadeSpeed = 0.06,
  interactive = true,
  glow = true,
  className,
  ...props
}: GlyphMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const activeCharset = CHARSETS[theme];
  const colors = THEME_COLORS[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Adjust for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-calculate columns
      columns = Math.floor(width / (fontSize * density));
      
      // Preserve or fill drops array
      const oldDrops = [...drops];
      drops = new Array(columns).fill(0).map((_, i) => {
        return oldDrops[i] !== undefined ? oldDrops[i] : Math.random() * -100;
      });
    };

    resize();

    // Use ResizeObserver to make component container responsive
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeSpeed})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < drops.length; i++) {
        let x = i * fontSize * density + (fontSize * density) / 2;
        let y = drops[i] * fontSize;

        // Reset if it goes off bottom randomly
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          y = 0;
        }

        // Draw character only when it's positive
        if (y > 0) {
          // Select character
          let char = activeCharset[Math.floor(Math.random() * activeCharset.length)];
          
          // Check mouse interaction
          const dx = mx !== null ? x - mx : Infinity;
          const dy = my !== null ? y - my : Infinity;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const isNearMouse = interactive && distance < 100;

          if (isNearMouse) {
            // Interactive glowing spotlight state
            ctx.fillStyle = colors.highlight;
            if (glow) {
              ctx.shadowColor = colors.glow;
              ctx.shadowBlur = 12;
            }

            // Scramble character heavily when cursor is near
            char = activeCharset[Math.floor(Math.random() * activeCharset.length)];

            // Repulsion displacement effect
            const force = (100 - distance) / 100; // 0 to 1
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * force * 8;
            y += Math.sin(angle) * force * 8;
          } else {
            // Standard state
            ctx.fillStyle = colors.primary;
            ctx.shadowBlur = 0; // Turn off shadow to boost performance
          }

          ctx.fillText(char, x, y);
        }

        // Increment drop y coordinate
        drops[i] += speed * (Math.random() * 0.4 + 0.8);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [theme, fontSize, speed, density, fadeSpeed, interactive, glow, colors, activeCharset]);

  // Track mouse coordinates relative to container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full h-full min-h-[300px] overflow-hidden bg-black select-none", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
