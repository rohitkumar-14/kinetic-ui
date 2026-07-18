"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollProgress, ScrollProgressTheme } from "@/components/creative/scroll-progress";
import { Sliders, Eye, Sparkles, Navigation, Globe, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollProgressDemo() {
  const [theme, setTheme] = useState<ScrollProgressTheme>("cyber");
  const [variant, setVariant] = useState<"bar" | "circle">("bar");
  const [height, setHeight] = useState(4);
  const [size, setSize] = useState(48);
  const [glow, setGlow] = useState(true);

  // Local scroll container simulation
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  const handleSimulatedScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) return;
    setSimulatedProgress(el.scrollTop / total);
  };

  const handleResetSimulatedScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const THEMES: { id: ScrollProgressTheme; label: string; accent: string }[] = [
    { id: "cyber", label: "Cyberpunk", accent: "#ec4899" },
    { id: "emerald", label: "Emerald", accent: "#10b981" },
    { id: "ember", label: "Ember", accent: "#ef4444" },
    { id: "sunset", label: "Sunset", accent: "#f43f5e" },
    { id: "white", label: "Minimalist", accent: "#ffffff" },
  ];

  const CIRCLE_RADIUS = (size - 4) / 2;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE - simulatedProgress * CIRCLE_CIRCUMFERENCE;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* ── Control Panel ── */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-5 p-5 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Configuration</span>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5 mt-0.5">
            <Sliders className="w-4 h-4 text-zinc-400" />
            Scroll Parameters
          </h3>
        </div>

        {/* Variant Select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-zinc-400">Indicator Variant</label>
          <div className="grid grid-cols-2 gap-2">
            {(["bar", "circle"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={cn(
                  "p-2 text-xs font-semibold rounded-xl border text-center transition-all duration-200 capitalize",
                  variant === v
                    ? "bg-white text-black border-white/10"
                    : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                )}
              >
                {v} Indicator
              </button>
            ))}
          </div>
        </div>

        {/* Theme Select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-zinc-400">Theme Preset</label>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "p-2 text-[11px] font-medium rounded-xl border text-left transition-all duration-200",
                  theme === t.id
                    ? "bg-white text-black border-white/10"
                    : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Height Slider (for bar) */}
        {variant === "bar" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Bar Height</span>
              <span className="text-zinc-200">{height}px</span>
            </div>
            <input
              type="range"
              min={2}
              max={10}
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        )}

        {/* Size Slider (for circle) */}
        {variant === "circle" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Circle Size</span>
              <span className="text-zinc-200">{size}px</span>
            </div>
            <input
              type="range"
              min={36}
              max={64}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        )}

        {/* Glow Option */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-zinc-200">Glow Accent</span>
            <span className="text-[10px] text-zinc-500">Enable neon drop shadow</span>
          </div>
          <button
            onClick={() => setGlow(!glow)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              glow ? "bg-white" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out",
                glow ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>

      {/* ── Simulated Browser/Device Preview ── */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-zinc-950 flex flex-col relative overflow-hidden h-[420px]">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-white/5 font-mono text-[11px] text-zinc-400 z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span>mock-viewport.net/agency-showcase</span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans font-bold">Preview Stage</span>
        </div>

        {/* Simulated Top Progress Bar */}
        {variant === "bar" && (
          <div
            className="absolute top-[37px] left-0 right-0 z-20 transition-all duration-75"
            style={{
              height: height,
              background:
                theme === "cyber"
                  ? "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)"
                  : theme === "emerald"
                  ? "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)"
                  : theme === "ember"
                  ? "linear-gradient(90deg, #f97316 0%, #ef4444 100%)"
                  : theme === "sunset"
                  ? "linear-gradient(90deg, #eab308 0%, #f43f5e 100%)"
                  : "linear-gradient(90deg, #ffffff 0%, #a1a1aa 100%)",
              width: `${simulatedProgress * 100}%`,
              boxShadow: glow
                ? `0 2px 8px ${
                    theme === "cyber"
                      ? "rgba(236, 72, 153, 0.6)"
                      : theme === "emerald"
                      ? "rgba(16, 185, 129, 0.6)"
                      : theme === "ember"
                      ? "rgba(239, 44, 68, 0.6)"
                      : theme === "sunset"
                      ? "rgba(244, 63, 94, 0.6)"
                      : "rgba(255, 255, 255, 0.3)"
                  }`
                : "none",
            }}
          />
        )}

        {/* Simulated Floating Circle Progress */}
        {variant === "circle" && (
          <button
            onClick={handleResetSimulatedScroll}
            className={cn(
              "absolute bottom-4 right-4 z-20 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300",
              simulatedProgress === 0 ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
            )}
            style={{
              width: size,
              height: size,
              boxShadow: glow
                ? `0 4px 12px ${
                    theme === "cyber"
                      ? "rgba(236, 72, 153, 0.4)"
                      : theme === "emerald"
                      ? "rgba(16, 185, 129, 0.4)"
                      : theme === "ember"
                      ? "rgba(239, 44, 68, 0.4)"
                      : theme === "sunset"
                      ? "rgba(244, 63, 94, 0.4)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`
                : "none",
            }}
          >
            <svg className="absolute -rotate-90 transform w-full h-full" viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={4}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={CIRCLE_RADIUS}
                fill="none"
                stroke={
                  theme === "cyber"
                    ? "#ec4899"
                    : theme === "emerald"
                    ? "#10b981"
                    : theme === "ember"
                    ? "#ef4444"
                    : theme === "sunset"
                    ? "#f43f5e"
                    : "#ffffff"
                }
                strokeWidth={4}
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>
            <span className="text-[9px] font-mono font-bold text-zinc-400">
              {Math.round(simulatedProgress * 100)}%
            </span>
          </button>
        )}

        {/* Scrollable Sandbox Body */}
        <div
          ref={scrollContainerRef}
          onScroll={handleSimulatedScroll}
          className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6 scroll-smooth"
        >
          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Interactive Sandbox</span>
            <h4 className="text-xl font-bold text-white">Scroll down inside this box to test progress indicators</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We built this local viewport simulator so you don't have to scroll the whole page to test. Scroll down to see progress update!
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/5" />

          {/* Dummy content block 1 */}
          <div className="flex flex-col gap-3 py-10 bg-white/5 px-5 rounded-xl border border-white/5">
            <h5 className="text-sm font-semibold text-zinc-200">1. Creative Agency Layouts</h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Premium agency websites require rich, immersive layout animations that showcase work smoothly. Standard progress indicators can make a site feel rigid, which is why dynamic custom gradients and light glows add that modern, creative flare.
            </p>
          </div>

          {/* Dummy content block 2 */}
          <div className="flex flex-col gap-3 py-10 bg-white/5 px-5 rounded-xl border border-white/5">
            <h5 className="text-sm font-semibold text-zinc-200">2. Performance Optimizations</h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Our scroll components are optimized to avoid layout thrashing. By utilizing hardware-accelerated CSS and Framer Motion spring solvers, updates render at a clean 60+ FPS on all screen sizes, including tablets and mobile devices.
            </p>
          </div>

          {/* Dummy content block 3 */}
          <div className="flex flex-col gap-3 py-10 bg-white/5 px-5 rounded-xl border border-white/5">
            <h5 className="text-sm font-semibold text-zinc-200">3. Responsive Customization</h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Whether you choose the minimalist top bar or the clickable floating circular action button, you can customize the glow parameters, stroke width, and transition constants directly via standard props.
            </p>
          </div>

          <div className="py-2 flex items-center justify-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest gap-2">
            <span>End of stream</span>
            <button
              onClick={handleResetSimulatedScroll}
              className="text-xs font-semibold text-white bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 px-2 py-1 rounded transition-colors uppercase font-sans tracking-normal"
            >
              Scroll to top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
