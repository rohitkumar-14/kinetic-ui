"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface LiquidImageDistortionProps {
  imageSrc: string;
  className?: string;
  intensity?: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform float uIntensity;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse to current pixel
    float dist = distance(uv, uMouse);
    
    // Create a ripple effect based on distance and time
    float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.5 + 0.5;
    
    // Intensity of the distortion (fades out further from mouse)
    float strength = smoothstep(0.5, 0.0, dist) * uHover * uIntensity;
    
    // Apply displacement
    vec2 displacedUv = uv + (uv - uMouse) * ripple * strength * 0.2;
    
    // Chromatic aberration trick
    float r = texture2D(uTexture, displacedUv + vec2(strength * 0.02, 0.0)).r;
    float g = texture2D(uTexture, displacedUv).g;
    float b = texture2D(uTexture, displacedUv - vec2(strength * 0.02, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function LiquidPlane({ imageSrc, intensity = 1.0 }: { imageSrc: string; intensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  // Load texture
  const texture = useTexture(imageSrc);
  
  // Target mouse position for lerping
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));
  
  // Hover state for lerping
  const targetHover = useRef(0);
  const currentHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    }),
    [texture, intensity]
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    // Smoothly interpolate mouse position and hover state
    currentMouse.current.lerp(targetMouse.current, 0.1);
    currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.1);

    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    materialRef.current.uniforms.uHover.value = currentHover.current;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.copy(e.uv);
        }
      }}
      onPointerEnter={() => {
        targetHover.current = 1;
      }}
      onPointerLeave={() => {
        targetHover.current = 0;
      }}
    >
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

export function LiquidImageDistortion({ 
  imageSrc, 
  className,
  intensity = 1.0 
}: LiquidImageDistortionProps) {
  return (
    <div className={cn("relative w-full h-[600px] overflow-hidden rounded-xl", className)}>
      <Canvas 
        // Orthographic camera makes the 2x2 plane fit perfectly in view
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 2]}
      >
        {/* Fill the viewport by passing an orthographic projection manually or letting R3F scale it. 
            Since R3F uses a perspective camera by default, to make a 2x2 plane fill the screen we 
            can use Viewport calculations. For simplicity, we just use the Canvas default and scale the mesh. */}
        <LiquidPlane imageSrc={imageSrc} intensity={intensity} />
      </Canvas>
    </div>
  );
}
