'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Settings2, Copy, Check } from 'lucide-react';

export interface HeroParticlesProps {
  particleCount?: number;
  minRadius?: number;
  maxRadius?: number;
  particleSpeed?: number;
  color?: string;
  lineColor?: string;
  shadowColor?: string;
  connectionDistance?: number;
  repulsionForce?: number;
  interactive?: boolean;
  themePreset?: 'constellation' | 'ambient' | 'matrix' | 'nebula' | 'firefly';
  className?: string;
  speed?: number;
  scale?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed?: number;
  pulseTime?: number;
}

const PRESETS = {
  constellation: {
    particleCount: 75,
    minRadius: 1,
    maxRadius: 3,
    particleSpeed: 0.4,
    connectionDistance: 100,
    repulsionForce: 1.5,
    interactive: true,
    particleColorDark: '#9333ea',
    particleColorLight: '#7c3aed',
    lineColorDark: '#6366f1',
    lineColorLight: '#4f46e5',
    shadowColor: 'rgba(99, 102, 241, 0.5)',
  },
  nebula: {
    particleCount: 40,
    minRadius: 3,
    maxRadius: 7,
    particleSpeed: 0.15,
    connectionDistance: 150,
    repulsionForce: 2.5,
    interactive: true,
    particleColorDark: '#ec4899',
    particleColorLight: '#db2777',
    lineColorDark: '#f472b6',
    lineColorLight: '#db2777',
    shadowColor: 'rgba(236, 72, 153, 0.6)',
  },
  matrix: {
    particleCount: 110,
    minRadius: 1,
    maxRadius: 2.5,
    particleSpeed: 1.2,
    connectionDistance: 0,
    repulsionForce: 0.8,
    interactive: true,
    particleColorDark: '#22c55e',
    particleColorLight: '#16a34a',
    lineColorDark: 'transparent',
    lineColorLight: 'transparent',
    shadowColor: 'rgba(34, 197, 94, 0.4)',
  },
  firefly: {
    particleCount: 35,
    minRadius: 2,
    maxRadius: 5,
    particleSpeed: 0.3,
    connectionDistance: 0,
    repulsionForce: 2.0,
    interactive: true,
    particleColorDark: '#f59e0b',
    particleColorLight: '#d97706',
    lineColorDark: 'transparent',
    lineColorLight: 'transparent',
    shadowColor: 'rgba(245, 158, 11, 0.7)',
  },
  ambient: {
    particleCount: 60,
    minRadius: 0.8,
    maxRadius: 1.8,
    particleSpeed: 0.2,
    connectionDistance: 120,
    repulsionForce: 1.0,
    interactive: true,
    particleColorDark: '#06b6d4',
    particleColorLight: '#0d9488',
    lineColorDark: '#06b6d4',
    lineColorLight: '#0d9488',
    shadowColor: 'rgba(6, 182, 212, 0.3)',
  },
};

export function HeroParticles({
  particleCount,
  minRadius,
  maxRadius,
  particleSpeed,
  color,
  lineColor,
  shadowColor,
  connectionDistance,
  repulsionForce,
  interactive = true,
  themePreset = 'constellation',
  className,
  speed = 1,
  scale = 1,
}: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });
  const animFrameRef = useRef<number>(0);

  // Framework-agnostic dark mode detection (works without next-themes)
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDarkMode(hasDarkClass || mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = isDarkMode;
    const preset = PRESETS[themePreset] || PRESETS.constellation;

    const activeCount = particleCount ?? preset.particleCount;
    const activeMinRadius = (minRadius ?? preset.minRadius) * scale;
    const activeMaxRadius = (maxRadius ?? preset.maxRadius) * scale;
    const activeSpeed = (particleSpeed ?? preset.particleSpeed) * speed;
    const activeConnDist = connectionDistance !== undefined ? connectionDistance : preset.connectionDistance;
    const activeRepForce = repulsionForce ?? preset.repulsionForce;
    const activeInteractive = interactive ?? preset.interactive;
    const activeColor = color ?? (isDark ? preset.particleColorDark : preset.particleColorLight);
    const activeLineColor = lineColor ?? (color || (isDark ? preset.lineColorDark : preset.lineColorLight));
    const activeShadowColor = shadowColor ?? (color ? `${color}80` : preset.shadowColor);

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const finalCount = isMobile ? Math.ceil(activeCount / 2) : activeCount;

      for (let i = 0; i < finalCount; i++) {
        const radius = Math.random() * (activeMaxRadius - activeMinRadius) + activeMinRadius;
        const alpha = Math.random() * 0.35 + 0.15;

        const vx = themePreset === 'matrix'
          ? (Math.random() - 0.5) * 0.1
          : (Math.random() - 0.5) * activeSpeed;
        const vy = themePreset === 'matrix'
          ? Math.random() * 0.5 + activeSpeed
          : (Math.random() - 0.5) * activeSpeed;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          radius,
          alpha,
          baseAlpha: alpha,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseTime: Math.random() * Math.PI * 2,
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : canvas.clientWidth;
      const h = parent ? parent.clientHeight : canvas.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
        initParticles();
      }
    };

    const drawParticles = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        animFrameRef.current = requestAnimationFrame(drawParticles);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mr = mouseRef.current.radius;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (themePreset === 'matrix') {
          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10 || p.x > canvas.width + 10) {
            p.x = Math.random() * canvas.width;
          }
        } else {
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        let forceX = 0;
        let forceY = 0;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (activeInteractive && dist < mr && mx !== -1000) {
          const force = (mr - dist) / mr;
          forceX = (dx / dist) * force * activeRepForce * 12;
          forceY = (dy / dist) * force * activeRepForce * 12;
          p.alpha = Math.min(p.baseAlpha * 2.5, 0.85);
        } else {
          if (themePreset === 'firefly') {
            if (p.pulseTime !== undefined && p.pulseSpeed !== undefined) {
              p.pulseTime += p.pulseSpeed;
              p.alpha = p.baseAlpha * (Math.sin(p.pulseTime) * 0.55 + 0.65);
            }
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        const renderX = p.x + forceX;
        const renderY = p.y + forceY;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.shadowBlur = themePreset === 'matrix' ? 3 : 8;
        ctx.shadowColor = activeShadowColor;
        ctx.fillStyle = activeColor;
        ctx.fill();
        ctx.restore();
      });

      if (activeConnDist > 0) {
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < activeConnDist) {
              const lineAlpha = ((activeConnDist - dist) / activeConnDist) * 0.12;
              ctx.save();
              ctx.globalAlpha = lineAlpha;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = activeLineColor;
              ctx.lineWidth = 0.75;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(drawParticles);
    };

    // Use ResizeObserver so the canvas reacts to its own container resizing
    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    // Initial size
    resizeCanvas();
    // Start the animation loop
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(drawParticles);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      } else {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    particleCount,
    minRadius,
    maxRadius,
    particleSpeed,
    color,
    lineColor,
    shadowColor,
    connectionDistance,
    repulsionForce,
    interactive,
    themePreset,
    isDarkMode,
    speed,
    scale,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none opacity-80', className)}
      style={{ zIndex: 0 }}
    />
  );
}

/** Self-contained preview wrapper for the docs page — handles its own height and dark background. */
export function HeroParticlesPreview(props: HeroParticlesProps) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-border/50"
      style={{ height: '400px', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span style={{ position: 'relative', zIndex: 1, color: '#52525b', fontSize: '12px', pointerEvents: 'none' }}>
        Hover around the card area
      </span>
      <HeroParticles {...props} />
    </div>
  );
}


export function HeroParticlesPlayground() {
  const [themePreset, setThemePreset] = useState<'constellation' | 'ambient' | 'matrix' | 'nebula' | 'firefly'>('constellation');
  const [particleCount, setParticleCount] = useState(75);
  const [particleSpeed, setParticleSpeed] = useState(0.4);
  const [connectionDistance, setConnectionDistance] = useState(100);
  const [interactive, setInteractive] = useState(true);
  const [showHUD, setShowHUD] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sync settings when themePreset changes
  useEffect(() => {
    const preset = PRESETS[themePreset];
    if (preset) {
      setParticleCount(preset.particleCount);
      setParticleSpeed(preset.particleSpeed);
      setConnectionDistance(preset.connectionDistance);
      setInteractive(preset.interactive);
    }
  }, [themePreset]);

  const copyJSX = () => {
    const code = `<HeroParticles
  themePreset="${themePreset}"
  particleCount={${particleCount}}
  particleSpeed={${particleSpeed}}
  connectionDistance={${connectionDistance}}
  interactive={${interactive}}
/>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-2xl border border-border overflow-hidden" style={{ height: '550px' }}>
      {/* Dynamic Background Canvas — fills the whole playground */}
      <HeroParticles
        themePreset={themePreset}
        particleCount={particleCount}
        particleSpeed={particleSpeed}
        connectionDistance={connectionDistance}
        interactive={interactive}
        className="opacity-95"
      />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Preset pills + HUD toggle */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4" style={{ zIndex: 20 }}>
        <div className="flex flex-wrap gap-1.5 bg-black/45 backdrop-blur-xl border border-white/10 p-1 rounded-full shadow-lg">
          {(['constellation', 'nebula', 'matrix', 'firefly', 'ambient'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setThemePreset(p)}
              className={cn(
                'px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full transition-all duration-300',
                themePreset === p
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowHUD(!showHUD)}
          className={cn(
            'p-2.5 rounded-full border bg-black/45 backdrop-blur-xl transition-all shadow-lg',
            showHUD ? 'border-indigo-500/30 text-indigo-400' : 'border-white/10 text-zinc-400 hover:text-white'
          )}
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* HUD panel — anchored bottom-left */}
      {showHUD && (
        <div
          className="absolute bottom-4 left-4 w-full max-w-[340px] bg-black/65 backdrop-blur-2xl border border-white/10 rounded-xl p-5 shadow-2xl flex flex-col gap-4 text-white"
          style={{ zIndex: 20 }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <h4 className="text-xs font-bold tracking-widest uppercase text-zinc-300">Canvas Live Tweaks</h4>
            </div>
            <button
              onClick={copyJSX}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy JSX</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Density (Nodes)</span>
                <span>{particleCount}</span>
              </div>
              <input
                type="range" min="10" max="200" step="5"
                value={particleCount} onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Speed Factor</span>
                <span>{particleSpeed.toFixed(2)}x</span>
              </div>
              <input
                type="range" min="0.05" max="3.0" step="0.05"
                value={particleSpeed} onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Link Threshold</span>
                <span>{connectionDistance}px</span>
              </div>
              <input
                type="range" min="0" max="250" step="10"
                value={connectionDistance} onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <label className="flex items-center justify-between cursor-pointer border-t border-white/5 pt-2">
              <span className="text-[11px] font-mono text-zinc-400">Cursor Repulsion</span>
              <input
                type="checkbox"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 rounded border-white/10 bg-black text-indigo-500"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
