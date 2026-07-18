"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Intense liquid distortion wave based on time and progress
  float waveX = sin(uv.y * 15.0 + uTime * 2.0) * 0.05 * sin(uProgress * 3.1415);
  float waveY = cos(uv.x * 15.0 + uTime * 2.0) * 0.05 * sin(uProgress * 3.1415);
  
  vec2 distortedUv = uv + vec2(waveX, waveY);
  
  vec4 color1 = texture2D(uTexture1, distortedUv);
  vec4 color2 = texture2D(uTexture2, distortedUv);
  
  // Add a glitch color separation effect during the transition
  vec4 finalColor = mix(color1, color2, uProgress);
  
  // Vignette
  float dist = distance(uv, vec2(0.5));
  finalColor.rgb *= smoothstep(0.8, 0.2, dist);
  
  gl_FragColor = finalColor;
}
`;

function FluidScene({ images, currentIndex }: { images: string[], currentIndex: number }) {
  const textures = useTexture(images);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // We keep track of the "from" and "to" indices to manage the transition shader
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  
  useEffect(() => {
    if (currentIndex !== prevIndex) {
      if (materialRef.current) {
        // Reset progress to 0 and set the new textures
        materialRef.current.uniforms.uTexture1.value = textures[prevIndex];
        materialRef.current.uniforms.uTexture2.value = textures[currentIndex];
        materialRef.current.uniforms.uTargetProgress.value = 1.0;
        materialRef.current.uniforms.uProgress.value = 0.0;
      }
      // Update prevIndex after a short delay so the transition can happen
      const timer = setTimeout(() => setPrevIndex(currentIndex), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, prevIndex, textures]);

  const uniforms = useMemo(() => ({
    uTexture1: { value: textures[prevIndex] },
    uTexture2: { value: textures[currentIndex] },
    uProgress: { value: 0 },
    uTargetProgress: { value: 0 },
    uTime: { value: 0 }
  }), [textures, prevIndex, currentIndex]);

  useFrame((state) => {
    if (materialRef.current) {
      // Smoothly interpolate progress
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        materialRef.current.uniforms.uTargetProgress.value,
        0.05
      );
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // Calculate plane dimensions to cover viewport
  // Use a large plane to cover screen
  return (
    <mesh>
      <planeGeometry args={[16, 9]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export interface FluidDistortionGalleryProps {
  images: string[];
  className?: string;
}

export function FluidDistortionGallery({ images, className }: FluidDistortionGalleryProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className={cn("relative w-full h-[600px] overflow-hidden rounded-2xl bg-black cursor-pointer group", className)} onClick={next}>
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white font-mono">LOADING TEXTURES...</div>}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <FluidScene images={images} currentIndex={index} />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 font-mono text-xs">PREV</button>
        <button onClick={(e) => { e.stopPropagation(); next(); }} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 font-mono text-xs">NEXT</button>
      </div>
    </div>
  );
}
