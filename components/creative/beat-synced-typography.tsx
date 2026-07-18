"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useAnimationFrame } from "framer-motion";
import { Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BeatSyncedTypographyProps {
  text: string;
  audioUrl?: string; // Optional URL. If not provided, it will simulate a beat.
  className?: string;
  glitchColor?: string;
}

export function BeatSyncedTypography({ 
  text, 
  audioUrl, 
  className,
  glitchColor = "#ef4444" // Red-500
}: BeatSyncedTypographyProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  const containerControls = useAnimation();
  const textControls = useAnimation();
  const glitchControls = useAnimation();

  useEffect(() => {
    // If audioUrl is provided, initialize Audio element (but don't play yet)
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl]);

  const togglePlayback = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      // Reset animations
      containerControls.start({ scale: 1, rotate: 0 });
      textControls.start({ opacity: 1, x: 0, filter: "blur(0px)" });
      glitchControls.start({ opacity: 0 });
    } else {
      if (audioRef.current) {
        // Setup Audio Context if not already done
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;
          
          const source = audioContext.createMediaElementSource(audioRef.current);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          
          source.connect(analyser);
          analyser.connect(audioContext.destination); // Route to speakers
          
          analyserRef.current = analyser;
          dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        }
        
        // AudioContext requires a user gesture to resume in some browsers
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  useAnimationFrame(() => {
    if (!isPlaying) return;

    let bassLevel = 0;

    if (analyserRef.current && dataArrayRef.current) {
      // Real Audio Data
      analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
      // Sample lowest frequencies for "bass" beat
      let sum = 0;
      for (let i = 0; i < 5; i++) {
        sum += dataArrayRef.current[i];
      }
      bassLevel = (sum / 5) / 255.0; // 0 to 1
    } else {
      // Simulation mode if no audioUrl provided
      // A simple sine wave simulation mapped roughly to a 120BPM beat
      const time = Date.now() / 1000;
      bassLevel = Math.pow(Math.sin(time * Math.PI * 2), 4); // sharp peaks
    }

    // Threshold for a "beat" hit
    const BEAT_THRESHOLD = 0.7;

    if (bassLevel > BEAT_THRESHOLD) {
      // High bass: trigger scaling and glitch effects
      const intensity = (bassLevel - BEAT_THRESHOLD) / (1 - BEAT_THRESHOLD); // 0 to 1 based on how far past threshold
      
      containerControls.set({ 
        scale: 1 + intensity * 0.1, // Max scale 1.1
        rotate: (Math.random() - 0.5) * intensity * 2 // slight rotation shake
      });
      
      textControls.set({
        filter: `blur(${intensity * 4}px)`, // Max blur 4px
        x: (Math.random() - 0.5) * intensity * 10
      });

      // Glitch layer
      glitchControls.set({
        opacity: intensity,
        x: (Math.random() - 0.5) * intensity * 20,
        y: (Math.random() - 0.5) * intensity * 10,
        clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`
      });

    } else {
      // Decay back to normal
      containerControls.start({ scale: 1, rotate: 0, transition: { duration: 0.1 } });
      textControls.start({ filter: "blur(0px)", x: 0, transition: { duration: 0.1 } });
      glitchControls.start({ opacity: 0, transition: { duration: 0.1 } });
    }
  });

  // Split text for individual character styling if needed, but for raw performance on a fast loop, a single block is better.
  return (
    <div className={cn("relative flex flex-col items-center justify-center w-full min-h-[400px] bg-black overflow-hidden rounded-3xl", className)}>
      
      {/* Visualizer Area */}
      <div className="flex-1 flex items-center justify-center relative w-full h-full">
        <motion.div 
          animate={containerControls}
          className="relative select-none"
        >
          {/* Main Text */}
          <motion.h1 
            animate={textControls}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mix-blend-difference"
          >
            {text}
          </motion.h1>

          {/* Glitch Overlay (Red) */}
          <motion.h1 
            animate={glitchControls}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter absolute top-0 left-0 pointer-events-none"
            style={{ color: glitchColor, mixBlendMode: "screen" }}
          >
            {text}
          </motion.h1>

          {/* Glitch Overlay (Cyan) - Opposite direction */}
          <motion.h1 
            animate={glitchControls}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter absolute top-0 left-0 pointer-events-none text-cyan-400"
            style={{ mixBlendMode: "screen", x: "-10px", scale: 1.02 }}
          >
            {text}
          </motion.h1>

        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 flex flex-col items-center gap-3">
        {!audioUrl && (
          <span className="text-xs font-mono text-zinc-500 bg-zinc-900/80 px-3 py-1 rounded-full border border-white/10">
            SIMULATION MODE
          </span>
        )}
        <button
          onClick={togglePlayback}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl",
            isPlaying
              ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20"
              : "bg-white text-black hover:bg-zinc-200"
          )}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" /> Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Play
            </>
          )}
        </button>
      </div>
    </div>
  );
}
