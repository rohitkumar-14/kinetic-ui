"use client";

import React, { useRef, useCallback } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GenerativeAudioBtnProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  soundType?: "click" | "glitch" | "pop";
}

export function GenerativeAudioBtn({
  children,
  className,
  soundType = "click",
  ...props
}: GenerativeAudioBtnProps) {
  // Use a ref to store the AudioContext so we reuse it
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume context if it was suspended (browser policy)
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = useCallback((type: "down" | "up") => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (soundType === "click") {
        // A mechanical, high-tech click
        osc.type = "sine";
        if (type === "down") {
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
          gainNode.gain.setValueAtTime(1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
        } else {
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
          gainNode.gain.setValueAtTime(0.5, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
        }
      } else if (soundType === "pop") {
        // A bubbly pop sound
        osc.type = "sine";
        osc.frequency.setValueAtTime(type === "down" ? 400 : 500, now);
        osc.frequency.exponentialRampToValueAtTime(type === "down" ? 600 : 700, now + 0.1);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(1, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (soundType === "glitch") {
        // A sci-fi glitchy zap
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(type === "down" ? 150 : 250, now);
        osc.frequency.linearRampToValueAtTime(type === "down" ? 50 : 100, now + 0.1);
        
        // Add a simple lowpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        
        osc.disconnect();
        osc.connect(filter);
        filter.connect(gainNode);

        gainNode.gain.setValueAtTime(0.8, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      console.error("Web Audio API not supported or blocked", e);
    }
  }, [soundType]);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onPointerDown={() => playSound("down")}
      onPointerUp={() => playSound("up")}
      onPointerLeave={() => {
        // Optional: cancel any state if needed
      }}
      className={cn(
        "relative px-6 py-3 rounded-lg font-medium text-white bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden transition-colors hover:bg-zinc-800",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
