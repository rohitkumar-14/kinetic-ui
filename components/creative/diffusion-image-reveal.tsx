"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// A simplex noise + transition shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;

  // Simple noise function
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
  }

  void main() {
    // Generate some noise based on uv and time
    float n = noise(vUv * 10.0 + uTime * 0.5);
    
    // Create an edge where the image reveals
    float edge = smoothstep(uProgress - 0.2, uProgress + 0.2, n + vUv.y);

    vec4 texColor = texture2D(uTexture, vUv);
    
    // If we are below the edge, show image, else show transparent or a dark color
    if (edge < uProgress * 2.0) {
      gl_FragColor = texColor;
    } else {
      // The "loading" or "unrevealed" state
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - (edge * 0.5));
    }
  }
`;

function ShaderImage({ src, trigger }: { src: string, trigger: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const texture = useMemo(() => {
    if (typeof window !== "undefined") {
      const loader = new THREE.TextureLoader();
      return loader.load(src);
    }
    return null;
  }, [src]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Animate progress to 1 when triggered
      const target = trigger ? 1.0 : 0.0;
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        target,
        0.02
      );
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
        transparent={true}
      />
    </mesh>
  );
}

export interface DiffusionImageRevealProps {
  src: string;
  className?: string;
}

export function DiffusionImageReveal({ src, className }: DiffusionImageRevealProps) {
  const [trigger, setTrigger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("w-full h-[400px] overflow-hidden rounded-xl", className)}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderImage src={src} trigger={trigger} />
      </Canvas>
    </div>
  );
}
