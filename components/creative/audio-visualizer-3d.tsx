"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { Play, Pause } from "lucide-react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface AudioVisualizer3DProps extends React.HTMLAttributes<HTMLDivElement> {
  audioSrc: string;
  wireframe?: boolean;
  color?: string;
  className?: string;
}

// Separate component for the 3D mesh that hooks into the render loop
function VisualizerMesh({
  analyser,
  dataArray,
  isPlaying,
  wireframe,
  color,
}: {
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
  isPlaying: boolean;
  wireframe: boolean;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Smooth out the values using linear interpolation
  const targetScale = useRef(1);
  const targetDistort = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    if (analyser && dataArray && isPlaying) {
      analyser.getByteFrequencyData(dataArray as any);

      // Bass frequencies (lower indices) for scale
      let bassSum = 0;
      for (let i = 0; i < 10; i++) {
        bassSum += dataArray[i];
      }
      const bassAvg = bassSum / 10; // 0 to 255

      // Mids/Highs for distortion
      let highSum = 0;
      for (let i = 20; i < 60; i++) {
        highSum += dataArray[i];
      }
      const highAvg = highSum / 40; // 0 to 255

      // Map values to mesh parameters
      // Scale bounces between 1 and 1.5 based on bass
      targetScale.current = 1 + (bassAvg / 255) * 0.5;
      
      // Distortion goes from 0.1 to 1.5 based on highs
      targetDistort.current = 0.2 + (highAvg / 255) * 1.5;
    } else {
      // Decay back to rest state when paused/stopped
      targetScale.current = THREE.MathUtils.lerp(targetScale.current, 1, 0.05);
      targetDistort.current = THREE.MathUtils.lerp(targetDistort.current, 0.2, 0.05);
    }

    // Smoothly apply the target values
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
      0.15
    );
    materialRef.current.distort = THREE.MathUtils.lerp(
      materialRef.current.distort,
      targetDistort.current,
      0.15
    );

    // Slowly rotate the mesh for a continuous ambient feel
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        wireframe={wireframe}
        roughness={0.2}
        metalness={0.8}
        speed={2}
      />
    </mesh>
  );
}

export function AudioVisualizer3D({
  audioSrc,
  wireframe = false,
  color = "#6366f1", // indigo-500
  className,
  ...props
}: AudioVisualizer3DProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Initialize Audio Context on user interaction (required by browsers)
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      if (audioRef.current) {
        const source = ctx.createMediaElementSource(audioRef.current);
        const analyser = ctx.createAnalyser();
        // High FFT size for smooth data
        analyser.fftSize = 512;
        // Smoothing time constant prevents jitter
        analyser.smoothingTimeConstant = 0.8;
        
        source.connect(analyser);
        analyser.connect(ctx.destination);
        
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      }
    }
  };

  const togglePlay = () => {
    initAudio();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioContextRef.current?.resume();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle track ending
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", onEnded);
      return () => audio.removeEventListener("ended", onEnded);
    }
  }, []);

  return (
    <div className={cn("relative w-full h-[500px] overflow-hidden rounded-2xl bg-zinc-950", className)} {...props}>
      <audio ref={audioRef} src={audioSrc} crossOrigin="anonymous" preload="auto" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          
          <VisualizerMesh 
            analyser={analyserRef.current}
            dataArray={dataArrayRef.current}
            isPlaying={isPlaying}
            wireframe={wireframe}
            color={color}
          />
        </Canvas>
      </div>

      {/* Control Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <button
          onClick={togglePlay}
          className="pointer-events-auto relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-2xl transition-all hover:scale-110 hover:bg-white/20 active:scale-95 outline-none"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current ml-1" />
          )}
        </button>
      </div>
    </div>
  );
}
