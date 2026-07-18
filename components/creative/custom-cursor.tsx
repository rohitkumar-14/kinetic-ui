'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Eye, Plus, ArrowRight } from 'lucide-react';

export type CursorStyle = 'dot' | 'ring' | 'glow' | 'morph' | 'magnet';

interface CustomCursorProps {
  /** Accent color (hex). Default: "#818cf8" */
  color?: string;
  /** Trailing speed multiplier. Default: 1 */
  speed?: number;
  /** Base scale multiplier. Default: 1 */
  scale?: number;
  /** Visual style of the cursor. Default: "dot" */
  variant?: CursorStyle;
  className?: string;
}

export function CustomCursor({
  color = '#818cf8',
  speed = 1,
  scale = 1,
  variant = 'dot',
  className,
}: CustomCursorProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorData, setCursorData] = useState<{ type: string | null, text: string | null }>({ type: null, text: null });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Inner dot follows instantly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorNode = target.closest('[data-cursor], [data-cursor-text]') as HTMLElement | null;

      if (cursorNode) {
        const type = cursorNode.getAttribute('data-cursor');
        const text = cursorNode.getAttribute('data-cursor-text');
        setCursorData({ type, text });
        setIsHovering(true);
      } else {
        setCursorData({ type: null, text: null });
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          !!target.closest('button') ||
          !!target.closest('a') ||
          !!target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer');
        setIsHovering(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    // Smooth trailing via rAF
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      const lerpFactor = 0.12 * speed;
      outerPosRef.current.x = lerp(outerPosRef.current.x, posRef.current.x, lerpFactor);
      outerPosRef.current.y = lerp(outerPosRef.current.y, posRef.current.y, lerpFactor);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  // ── Variant styles ──────────────────────────────────────────────────────────
  const hasCustomData = !!cursorData.type || !!cursorData.text;
  const outerSize = hasCustomData ? 80 * scale : 32 * scale;
  const hoverScale = hasCustomData ? 1 : 2.5 * scale;
  const baseOpacity = isVisible ? 1 : 0;

  const outerStyle: React.CSSProperties = {
    width: outerSize,
    height: outerSize,
    opacity: baseOpacity,
    transition: `width 0.3s, height 0.3s, opacity 0.3s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s`,
    ...(isHovering || hasCustomData
      ? {
          width: outerSize * (hoverScale / scale),
          height: outerSize * (hoverScale / scale),
          backgroundColor: hasCustomData ? color : `${color}15`,
          borderColor: hasCustomData ? 'transparent' : `${color}80`,
          ...(variant === 'glow' ? { boxShadow: `0 0 20px ${color}40, 0 0 60px ${color}15` } : {}),
        }
      : {
          backgroundColor: variant === 'glow' ? `${color}08` : 'transparent',
          borderColor: variant === 'ring' || variant === 'dot' ? `${color}50` : `${color}30`,
          ...(variant === 'glow' ? { boxShadow: `0 0 12px ${color}20` } : {}),
        }),
  };

  const innerSize = variant === 'ring' ? 0 : 6 * scale;
  const innerStyle: React.CSSProperties = {
    width: innerSize,
    height: innerSize,
    opacity: baseOpacity,
    backgroundColor: color,
    transition: 'opacity 0.3s, width 0.2s, height 0.2s',
    ...(isHovering && variant !== 'ring' ? { width: 0, height: 0 } : {}),
  };

  // Morph: square when hovering, circle otherwise
  const outerBorderRadius = variant === 'morph' && isHovering ? '30%' : '50%';

  // Magnet: gets bigger on hover with softer spring
  const magnetExtra: React.CSSProperties =
    variant === 'magnet' && isHovering
      ? {
          width: outerSize * 3,
          height: outerSize * 3,
          borderStyle: 'dashed' as const,
        }
      : {};

  const renderIcon = () => {
    switch (cursorData.type) {
      case 'play': return <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />;
      case 'view': return <Eye className="w-6 h-6 text-white" />;
      case 'add': return <Plus className="w-6 h-6 text-white" />;
      case 'link': return <ArrowRight className="w-6 h-6 text-white -rotate-45" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Glow halo (glow variant only) */}
      {variant === 'glow' && (
        <div
          ref={glowRef}
          aria-hidden
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[99] rounded-full hidden md:block",
          )}
          style={{
            width: outerSize * 3,
            height: outerSize * 3,
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            opacity: baseOpacity,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Outer ring / shape */}
      <div
        ref={outerRef}
        aria-hidden
        className={cn(
          "fixed top-0 left-0 border-2 pointer-events-none z-[100] mix-blend-difference hidden md:block",
          className
        )}
        style={{
          ...outerStyle,
          borderRadius: outerBorderRadius,
          ...magnetExtra,
        }}
      >
        {hasCustomData && (
          <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-xs tracking-widest uppercase">
            {cursorData.text ? cursorData.text : renderIcon()}
          </div>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={innerStyle}
      />
    </>
  );
}
