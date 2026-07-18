"use client";

import { useCallback, useRef, useEffect } from "react";

type AudioType = "hover" | "click" | "success";

export function useUIAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to comply with browser autoplay policies
    const initAudioContext = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener("click", initAudioContext, { once: true });
    window.addEventListener("keydown", initAudioContext, { once: true });

    return () => {
      window.removeEventListener("click", initAudioContext);
      window.removeEventListener("keydown", initAudioContext);
    };
  }, []);

  const playSound = useCallback((type: AudioType) => {
    if (!audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case "hover":
        // Soft, quick subtle tick/blip
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case "click":
        // Sharp, mechanical pop
        osc.type = "triangle";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case "success":
        // Short futuristic major chord arpeggio effect
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(554.37, now + 0.05); // C#5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(880, now + 0.15); // A5

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gainNode.gain.setValueAtTime(0.1, now + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
        break;
    }
  }, []);

  const playHover = useCallback(() => playSound("hover"), [playSound]);
  const playClick = useCallback(() => playSound("click"), [playSound]);
  const playSuccess = useCallback(() => playSound("success"), [playSound]);

  return { playHover, playClick, playSuccess, playSound };
}
