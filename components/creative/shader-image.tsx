"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// --- Liquid Ripple Shader ---
const LiquidRippleMaterial = shaderMaterial(
  {
    uTex1: new THREE.Texture(),
    uTex2: new THREE.Texture(),
    uProgress: 0,
    uIntensity: 0.5,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform float uProgress;
  uniform float uIntensity;

  void main() {
    vec2 uv = vUv;
    
    // Ripple calculation
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);
    
    // Distort UVs based on distance and progress
    vec2 distortedUv1 = uv + (uv - center) * sin(dist * 20.0 - uProgress * 10.0) * uProgress * uIntensity;
    vec2 distortedUv2 = uv + (uv - center) * sin(dist * 20.0 - uProgress * 10.0) * (1.0 - uProgress) * uIntensity;
    
    // Sample both textures
    vec4 tex1 = texture2D(uTex1, distortedUv1);
    vec4 tex2 = texture2D(uTex2, distortedUv2);
    
    // Mix based on progress
    gl_FragColor = mix(tex1, tex2, uProgress);
  }
  `
);

// --- Noise Dissolve Shader ---
const NoiseDissolveMaterial = shaderMaterial(
  {
    uTex1: new THREE.Texture(),
    uTex2: new THREE.Texture(),
    uProgress: 0,
    uIntensity: 1.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform float uProgress;
  uniform float uIntensity;

  // Simple pseudo-random 2D noise function
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
      mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
  }

  void main() {
    vec2 uv = vUv;
    
    // Generate noise value
    float n = noise(uv * 20.0 * uIntensity);
    
    // Smoothstep threshold based on progress
    float threshold = smoothstep(uProgress - 0.2, uProgress + 0.2, n);
    
    // Reverse logic: at progress 0, we want tex1. So when progress is low, threshold is high.
    // Actually, simple step:
    float mixFactor = smoothstep(1.0 - uProgress, 1.0 - uProgress + 0.1, n);
    
    vec4 tex1 = texture2D(uTex1, uv);
    vec4 tex2 = texture2D(uTex2, uv);
    
    gl_FragColor = mix(tex1, tex2, uProgress);
    
    // Apply dissolve organically
    // If progress is higher than noise, show tex2, else tex1
    float stepMask = step(n, uProgress * 1.2); 
    gl_FragColor = mix(tex1, tex2, stepMask);
  }
  `
);

// Register materials with R3F
import { extend } from '@react-three/fiber';
extend({ LiquidRippleMaterial, NoiseDissolveMaterial });

// Add types for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidRippleMaterial: any;
      noiseDissolveMaterial: any;
    }
  }
}

interface ShaderPlaneProps {
  image1: string;
  image2: string;
  effect: "liquid" | "noise";
  isHovered: boolean;
  intensity?: number;
}

function ShaderPlane({ image1, image2, effect, isHovered, intensity = 0.5 }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Load textures
  const [tex1, tex2] = useTexture([image1, image2]);
  
  useFrame((state, delta) => {
    if (materialRef.current) {
      // Lerp progress to target (1 if hovered, 0 if not)
      const target = isHovered ? 1 : 0;
      // Damped lerp for smooth animation
      materialRef.current.uProgress = THREE.MathUtils.lerp(
        materialRef.current.uProgress,
        target,
        delta * 6.0
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      {effect === "liquid" ? (
        <liquidRippleMaterial 
          ref={materialRef} 
          uTex1={tex1} 
          uTex2={tex2} 
          uIntensity={intensity}
          transparent={true}
        />
      ) : (
        <noiseDissolveMaterial 
          ref={materialRef} 
          uTex1={tex1} 
          uTex2={tex2} 
          uIntensity={intensity}
          transparent={true}
        />
      )}
    </mesh>
  );
}

export interface ShaderImageProps {
  /** The default image URL */
  image1: string;
  /** The image URL to transition to on hover */
  image2: string;
  /** The shader effect to use */
  effect?: "liquid" | "noise";
  /** The intensity of the shader distortion */
  intensity?: number;
  /** Optional class name for the wrapper div */
  className?: string;
}

export function ShaderImage({
  image1,
  image2,
  effect = "liquid",
  intensity = 0.5,
  className,
}: ShaderImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }} // Orthographic-like setup to fill plane
        dpr={[1, 2]}
        className="absolute inset-0 w-full h-full"
      >
        <Suspense fallback={null}>
          <ShaderPlane 
            image1={image1} 
            image2={image2} 
            effect={effect} 
            isHovered={isHovered} 
            intensity={intensity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
