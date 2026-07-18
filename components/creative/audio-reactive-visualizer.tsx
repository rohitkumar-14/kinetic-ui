"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";

const vertexShader = `
uniform float uTime;
uniform float uAudioData;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normal;
  vPosition = position;
  
  // 3D Noise function based on position and time
  float noise = sin(position.x * 4.0 + uTime) * sin(position.y * 4.0 + uTime) * sin(position.z * 4.0 + uTime);
  
  // Displace vertices along their normals based on audio volume and noise
  vec3 newPosition = position + normal * noise * (uAudioData * 1.5);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uAudioData;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Map normals to base color for iridescent effect
  vec3 baseColor = vec3(0.5) + 0.5 * vNormal;
  
  // Add a cyber-punk tint that reacts to audio intensity (Cyan to Magenta)
  vec3 tint = mix(vec3(0.0, 1.0, 0.8), vec3(1.0, 0.0, 0.8), uAudioData * 2.0);
  
  // Add fresnel rim lighting for depth
  float viewFactor = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
  float rim = 1.0 - max(viewFactor, 0.0);
  rim = smoothstep(0.6, 1.0, rim);
  
  // Combine base color, tint, and a bright white rim flash on heavy bass beats
  vec3 finalColor = mix(baseColor * tint, vec3(1.0), rim * uAudioData);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function VisualizerMesh({ analyserRef, dataArrayRef }: { analyserRef: any, dataArrayRef: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAudioData: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      let avgVolume = 0;
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const sum = dataArrayRef.current.reduce((a: any, b: any) => a + b, 0);
        // Normalize volume (0.0 to 1.0)
        avgVolume = (sum / dataArrayRef.current.length) / 255;
      }
      
      // Smoothly interpolate the audio uniform to prevent jittering
      materialRef.current.uniforms.uAudioData.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uAudioData.value,
        avgVolume,
        0.15
      );
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true} // Render as a highly detailed wireframe mesh
        transparent
      />
    </mesh>
  );
}

export interface AudioReactiveVisualizerProps {
  audioSrc: string;
  className?: string;
}

export function AudioReactiveVisualizer({ audioSrc, className }: AudioReactiveVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioInitialized) {
        // Initialize Web Audio API context on first play to comply with browser auto-play policies
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audioRef.current);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        setAudioInitialized(true);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={cn("relative w-full h-[600px] bg-black rounded-2xl overflow-hidden group", className)}>
      <audio ref={audioRef} src={audioSrc} crossOrigin="anonymous" loop />
      
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} className="z-0">
        <VisualizerMesh analyserRef={analyserRef} dataArrayRef={dataArrayRef} />
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button 
          onClick={toggleAudio}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-mono text-sm transition-all"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "PAUSE_TRACK" : "INIT_AUDIO"}
        </button>
      </div>
    </div>
  );
}
