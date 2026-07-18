"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface LiquidFluidShaderProps {
  imageUrl: string;
  intensity?: number;
  className?: string;
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
uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Calculate distance from mouse
  float dist = distance(uv, uMouse);
  
  // Create ripple effect
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.05 * uIntensity;
  
  // Dampen ripple based on distance
  ripple *= exp(-dist * 5.0);
  
  // Apply distortion
  vec2 distortedUv = uv + (uv - uMouse) * ripple;
  
  // Keep within bounds
  distortedUv = clamp(distortedUv, 0.0, 1.0);
  
  vec4 texColor = texture2D(uTexture, distortedUv);
  gl_FragColor = texColor;
}
`;

function FluidImage({ imageUrl, intensity }: { imageUrl: string; intensity: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  
  const [mouse] = useState(() => new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    }),
    [texture, intensity]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uIntensity.value = intensity;
      
      // Smoothly interpolate mouse
      mouse.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uMouse.value.copy(mouse);
    }
  });

  const handlePointerMove = (e: any) => {
    if (e.uv) {
      targetMouse.current.set(e.uv.x, e.uv.y);
    }
  };

  const handlePointerLeave = () => {
    targetMouse.current.set(0.5, 0.5);
  };

  return (
    <mesh 
      ref={mesh} 
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function LiquidFluidShader({
  imageUrl,
  intensity = 1,
  className,
}: LiquidFluidShaderProps) {
  return (
    <div className={cn("w-full h-full overflow-hidden rounded-xl", className)}>
      <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
        <React.Suspense fallback={null}>
          <FluidImage imageUrl={imageUrl} intensity={intensity} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
