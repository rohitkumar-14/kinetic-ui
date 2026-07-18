"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// GLSL Fragment Shader: Distorted Transition
// ─────────────────────────────────────────────
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTextureCurrent;
  uniform sampler2D uTextureNext;
  uniform float uProgress;
  uniform float uIntensity;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Simple 2D noise for distortion
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    float p = uProgress;

    // ─── Chromatic Aberration (RGB Split) ───
    // As progress increases, each color channel samples from a slightly offset UV.
    float aberrationStrength = uIntensity * p * (1.0 - p) * 4.0; // Peaks at p=0.5
    vec2 redOffset   = vec2(aberrationStrength * 0.02, 0.0);
    vec2 greenOffset = vec2(0.0, 0.0);
    vec2 blueOffset  = vec2(-aberrationStrength * 0.02, aberrationStrength * 0.01);

    // ─── Liquid Noise Distortion ───
    float noiseVal = noise(uv * 8.0 + p * 3.0);
    vec2 distortion = vec2(
      noiseVal * aberrationStrength * 0.05,
      noiseVal * aberrationStrength * 0.03
    );

    // ─── Wave Displacement ───
    float wave = sin(uv.y * 20.0 + p * 12.0) * aberrationStrength * 0.01;
    vec2 waveOffset = vec2(wave, 0.0);

    // Final distorted UVs for both textures
    vec2 uvDistorted = uv + distortion + waveOffset;

    // Sample current image (with RGB split)
    float currentR = texture2D(uTextureCurrent, uvDistorted + redOffset).r;
    float currentG = texture2D(uTextureCurrent, uvDistorted + greenOffset).g;
    float currentB = texture2D(uTextureCurrent, uvDistorted + blueOffset).b;
    vec4 colorCurrent = vec4(currentR, currentG, currentB, 1.0);

    // Sample next image (with RGB split)
    float nextR = texture2D(uTextureNext, uvDistorted + redOffset).r;
    float nextG = texture2D(uTextureNext, uvDistorted + greenOffset).g;
    float nextB = texture2D(uTextureNext, uvDistorted + blueOffset).b;
    vec4 colorNext = vec4(nextR, nextG, nextB, 1.0);

    // ─── Dissolve Mask ───
    // Use noise to create a non-linear transition boundary
    float dissolve = noise(uv * 5.0 + vec2(p * 2.0, 0.0));
    float mixFactor = smoothstep(p - 0.3, p + 0.3, dissolve);

    // Final mix: dissolve from current to next
    vec4 finalColor = mix(colorNext, colorCurrent, mixFactor);

    gl_FragColor = finalColor;
  }
`;

// ─────────────────────────────────────────────
// Internal Scene Component
// ─────────────────────────────────────────────
interface TransitionPlaneProps {
  images: string[];
  currentIndex: number;
  nextIndex: number;
  progress: React.MutableRefObject<number>;
  isTransitioning: boolean;
  intensity: number;
}

function TransitionPlane({ images, currentIndex, nextIndex, progress, isTransitioning, intensity }: TransitionPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Load all textures
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return images.map((src) => {
      const tex = loader.load(src);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });
  }, [images]);

  // Animate progress
  useFrame((_, delta) => {
    if (!materialRef.current) return;

    if (isTransitioning) {
      progress.current = Math.min(progress.current + delta * 1.2, 1.0);
    }

    materialRef.current.uniforms.uProgress.value = progress.current;
    materialRef.current.uniforms.uTextureCurrent.value = textures[currentIndex] || textures[0];
    materialRef.current.uniforms.uTextureNext.value = textures[nextIndex] || textures[0];
  });

  const uniforms = useMemo(() => ({
    uTextureCurrent: { value: textures[0] },
    uTextureNext: { value: textures[0] },
    uProgress: { value: 0 },
    uIntensity: { value: intensity },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
  }), [textures, intensity, viewport.width, viewport.height]);

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────
// Public Component
// ─────────────────────────────────────────────
export interface WebGLGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image URLs */
  images: string[];
  /** Distortion intensity (default 1.0) */
  intensity?: number;
  /** Show navigation controls */
  showControls?: boolean;
  /** Show image counter */
  showCounter?: boolean;
  /** Aspect ratio (default "16/9") */
  aspectRatio?: string;
}

export function WebGLGallery({
  images,
  intensity = 1.0,
  showControls = true,
  showCounter = true,
  aspectRatio = "16/9",
  className,
  ...props
}: WebGLGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressRef = useRef(0);

  const goTo = useCallback((targetIndex: number) => {
    if (isTransitioning || targetIndex === currentIndex) return;

    setNextIndex(targetIndex);
    setIsTransitioning(true);
    progressRef.current = 0;

    // Wait for the transition to finish
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsTransitioning(false);
      progressRef.current = 0;
    }, 900); // ~1 second transition
  }, [isTransitioning, currentIndex]);

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % images.length;
    goTo(next);
  }, [currentIndex, images.length, goTo]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    goTo(prev);
  }, [currentIndex, images.length, goTo]);

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl bg-black group", className)}
      style={{ aspectRatio }}
      {...props}
    >
      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ position: "absolute", inset: 0 }}
      >
        <TransitionPlane
          images={images}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          progress={progressRef}
          isTransitioning={isTransitioning}
          intensity={intensity}
        />
      </Canvas>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <button
            onClick={goPrev}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={goNext}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}

      {/* Image Counter */}
      {showCounter && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              disabled={isTransitioning}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
