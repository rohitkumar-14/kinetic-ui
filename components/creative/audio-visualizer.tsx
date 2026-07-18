"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AudioVisualizerProps {
  audioUrl: string;
  color?: string;
  className?: string;
}

export function AudioVisualizer({
  audioUrl,
  color = "#a855f7",
  className,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafIdRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize Web Audio API
  const initAudio = () => {
    if (!audioRef.current || audioCtxRef.current) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    // Connect audio element to analyser
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    sourceRef.current = source;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setIsPlaying(false);
    const onCanPlay = () => setIsReady(true);
    
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('canplaythrough', onCanPlay);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('canplaythrough', onCanPlay);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      if (!canvasRef.current || !ctx) return;
      
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      let dataArray = new Uint8Array(0);
      if (analyserRef.current && isPlaying) {
        dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      // Draw Circular Visualizer
      const radius = Math.min(width, height) / 4;
      const barCount = 64; // How many bars to draw around the circle
      const maxBarHeight = radius * 0.8;

      for (let i = 0; i < barCount; i++) {
        // Map frequency data if available, otherwise just draw a flat circle
        let value = 0;
        if (dataArray.length > 0) {
          // Map the 64 bars to the lower half of the 128 frequency bins for more action
          value = dataArray[i]; 
        }

        const percent = value / 255;
        // Add a tiny baseline height so it's a visible circle even when quiet
        const barHeight = Math.max(percent * maxBarHeight, 2); 
        
        // Distribute evenly around a circle
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        
        // Create glowing stroke
        ctx.strokeStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.stroke();
      }

      // Draw center play button circle (static)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 0;
      ctx.fill();

      rafIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlaying, color]);

  return (
    <div className={cn("relative w-full aspect-square max-w-md mx-auto", className)}>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        crossOrigin="anonymous" 
        preload="auto"
      />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ touchAction: "none" }}
      />

      <button
        onClick={togglePlay}
        className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 z-10"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-1" />
        )}
      </button>
    </div>
  );
}
