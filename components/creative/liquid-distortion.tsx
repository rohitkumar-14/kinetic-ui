"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform float uRippleAmount;
uniform float uSplitAmount;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Calculate distance from mouse
  float dist = distance(uv, uMouse);
  
  // Create a ripple effect based on hover state and distance
  float ripple = sin(dist * 20.0 - uTime * uSpeed) * uRippleAmount * uHover;
  
  // Apply distortion only near the mouse
  float mask = smoothstep(0.4, 0.0, dist);
  
  vec2 distortedUv = uv + ripple * mask;
  
  // RGB Split effect
  float splitAmount = uSplitAmount * uHover * mask;
  vec4 colorR = texture2D(uTexture, vec2(distortedUv.x + splitAmount, distortedUv.y));
  vec4 colorG = texture2D(uTexture, distortedUv);
  vec4 colorB = texture2D(uTexture, vec2(distortedUv.x - splitAmount, distortedUv.y));
  
  gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
}
`;

function DistortionScene({ 
  imageUrl, 
  hovered,
  mousePos,
  rippleAmount = 0.05,
  splitAmount = 0.02,
  speed = 5.0
}: { 
  imageUrl: string;
  hovered: boolean;
  mousePos: { x: number; y: number };
  rippleAmount?: number;
  splitAmount?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load texture
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  
  // Target values for smooth interpolation
  const targetHover = useRef(0);
  const currentHover = useRef(0);
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uRippleAmount: { value: rippleAmount },
      uSplitAmount: { value: splitAmount },
      uSpeed: { value: speed }
    }),
    [texture, rippleAmount, splitAmount, speed]
  );

  useEffect(() => {
    targetHover.current = hovered ? 1 : 0;
  }, [hovered]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Smoothly interpolate hover state
      currentHover.current += (targetHover.current - currentHover.current) * 0.1;
      
      // Smoothly interpolate mouse position
      currentMouse.current.lerp(new THREE.Vector2(mousePos.x, mousePos.y), 0.1);
      
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uHover.value = currentHover.current;
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export interface LiquidDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
  rippleAmount?: number;
  splitAmount?: number;
  speed?: number;
}

export function LiquidDistortion({ 
  imageUrl, 
  alt = "Image", 
  className,
  rippleAmount = 0.05,
  splitAmount = 0.02,
  speed = 5.0
}: LiquidDistortionProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL uses bottom-left origin
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-crosshair rounded-xl", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Canvas 
        className="w-full h-full block absolute inset-0 z-10"
        camera={{ position: [0, 0, 1] }}
      >
        <React.Suspense fallback={null}>
          <DistortionScene 
            imageUrl={imageUrl} 
            hovered={hovered} 
            mousePos={mousePos} 
            rippleAmount={rippleAmount}
            splitAmount={splitAmount}
            speed={speed}
          />
        </React.Suspense>
      </Canvas>
      {/* Fallback image that stays behind canvas */}
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover invisible" 
      />
    </div>
  );
}
