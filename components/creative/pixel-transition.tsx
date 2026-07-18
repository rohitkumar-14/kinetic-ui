"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float progress;
uniform float pixels;
uniform vec2 resolution;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  // Use resolution to make pixels square
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 uv = vUv;
  
  // Grid based on aspect ratio
  vec2 gridId = floor(uv * aspect * pixels);
  float r = rand(gridId);
  
  // Add some distortion based on progress
  vec2 distortedUv = uv;
  if(progress > 0.0 && progress < 1.0) {
     float wave = sin(progress * 3.1415);
     distortedUv += (r - 0.5) * 0.05 * wave;
  }
  
  // Smoothstep for the pixel transition
  float mixProgress = smoothstep(r - 0.2, r + 0.2, progress);
  
  vec4 color1 = texture2D(tex1, distortedUv);
  vec4 color2 = texture2D(tex2, distortedUv);
  
  gl_FragColor = mix(color1, color2, mixProgress);
}
`;

function Scene({
  src1,
  src2,
  isHovered,
  gridSize,
}: {
  src1: string;
  src2: string;
  isHovered: boolean;
  gridSize: number;
}) {
  const { viewport, size } = useThree();
  const [texture1, texture2] = useTexture([src1, src2]);

  useMemo(() => {
    texture1.colorSpace = THREE.SRGBColorSpace;
    texture2.colorSpace = THREE.SRGBColorSpace;
    texture1.minFilter = THREE.LinearFilter;
    texture2.minFilter = THREE.LinearFilter;
  }, [texture1, texture2]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const mat = materialRef.current;
      const target = isHovered ? 1 : 0;
      mat.uniforms.progress.value = THREE.MathUtils.lerp(
        mat.uniforms.progress.value,
        target,
        delta * 3
      );
      mat.uniforms.pixels.value = gridSize;
      mat.uniforms.resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          tex1: { value: texture1 },
          tex2: { value: texture2 },
          progress: { value: 0 },
          pixels: { value: gridSize },
          resolution: { value: new THREE.Vector2(size.width, size.height) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

interface PixelTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  firstImage: string;
  secondImage: string;
  gridSize?: number;
}

export function PixelTransition({
  firstImage,
  secondImage,
  gridSize = 40,
  className,
  ...props
}: PixelTransitionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
            <span className="text-zinc-500 text-sm">Loading textures...</span>
          </div>
        }
      >
        <Canvas>
          <Scene
            src1={firstImage}
            src2={secondImage}
            isHovered={isHovered}
            gridSize={gridSize}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
