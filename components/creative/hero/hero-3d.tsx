'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/creative/magnetic-button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

// Custom Shader Definition
const GlassFluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color('#6366f1') }, // Indigo
    uColor2: { value: new THREE.Color('#ec4899') }, // Pink
    uColor3: { value: new THREE.Color('#06b6d4') }, // Cyan
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vModelPosition;

    // Simple 3D sine-based noise for vertex waving
    float wave(vec3 p) {
      return sin(p.x * 2.0 + uTime * 1.5) * cos(p.y * 2.0 + uTime * 1.5) * sin(p.z * 2.0 + uTime * 1.0);
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Deform the position slightly like a liquid
      vec3 pos = position;
      float d = wave(pos * 1.2) * 0.18;
      pos += normal * d;
      
      vModelPosition = pos;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vModelPosition;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Fresnel effect for glowing edges (tighter power for more definition)
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
      
      // Create a shifting color palette using time and position
      vec3 baseColor = mix(uColor1, uColor2, sin(vModelPosition.x + uTime * 0.5) * 0.5 + 0.5);
      baseColor = mix(baseColor, uColor3, cos(vModelPosition.y + uTime * 0.3) * 0.5 + 0.5);
      
      // Tone down base color and use a colored fresnel glow instead of solid white
      vec3 finalColor = baseColor * 0.65 + (fresnel * vec3(0.4, 0.7, 1.0) * 0.45);
      
      // Reduce alpha to prevent compounding exposure in additive blending
      float alpha = 0.12 + fresnel * 0.38;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

function FluidMesh({ color, speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Keep track of active speed-modified time
  const timeRef = useRef(0);

  useEffect(() => {
    if (shaderRef.current && color) {
      shaderRef.current.uniforms.uColor1.value.set(color);
    }
  }, [color]);

  // Update uniform values & mouse-follow rotation on each frame
  useFrame((state, delta) => {
    const { pointer } = state;
    timeRef.current += delta * speed;

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = timeRef.current;
      shaderRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
    }

    if (meshRef.current) {
      // Smoothly interpolate rotation to mouse position
      targetRotation.current.y = (pointer.x * Math.PI) / 3;
      targetRotation.current.x = (-pointer.y * Math.PI) / 3;

      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05 * speed;
      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05 * speed;
      
      // Add subtle constant spin
      meshRef.current.rotation.z += 0.003 * speed;

      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.55, 150, 20]} />
        <shaderMaterial
          ref={shaderRef}
          args={[GlassFluidShader]}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

export interface Hero3DProps {
  color?: string;
  speed?: number;
  scale?: number;
  badgeText?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function Hero3D({
  color,
  speed = 1,
  scale = 1,
  badgeText = "Three.js & WebGL",
  title = "Immersive 3D Experiences",
  description = "A stunning WebGL hero section with custom GLSL shaders. Move your cursor to interact with the fluid physics in real-time.",
  primaryCtaText = "Start Building",
  primaryCtaHref = "#",
  secondaryCtaText = "View Components",
  secondaryCtaHref = "#",
  className
}: Hero3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className={cn("@container relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white", className)}>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 h-full w-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <FluidMesh color={color} speed={speed} scale={scale} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Radial Mask to blend canvas edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)] pointer-events-none" />

      {/* Content Overlay */}
      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl select-none pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium mb-8 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>{badgeText}</span>
        </div>

        <h1 className="text-5xl @md:text-7xl @2xl:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          {title}
        </h1>

        <p className="max-w-2xl text-lg @md:text-xl text-zinc-400 mb-10 font-light leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 items-center justify-center pointer-events-auto">
          <Link href={primaryCtaHref}>
            <MagneticButton className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
              {primaryCtaText} <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>
          <Link href={secondaryCtaHref}>
            <MagneticButton className="h-12 px-8 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm text-white font-medium hover:bg-white/5 transition-colors">
              <Terminal className="mr-2 h-4 w-4" /> {secondaryCtaText}
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
