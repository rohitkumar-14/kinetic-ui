'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Icosahedron,
  Octahedron,
  Dodecahedron,
  Torus,
  TorusKnot,
  Float,
  Environment,
  ContactShadows,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export type Floating3DVariant = 'crystal' | 'nebula' | 'prism' | 'plasma' | 'ring';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  scale?: number;
  variant?: Floating3DVariant;
}

// ─── Crystal Variant: Wireframe icosahedron with glass inner ──────────────────
function CrystalScene({ color = '#818cf8', speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!outerRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    outerRef.current.rotation.y += (targetX - outerRef.current.rotation.y) * 0.08;
    outerRef.current.rotation.x += (-targetY - outerRef.current.rotation.x) * 0.08;

    if (innerRef.current) {
      innerRef.current.rotation.y = outerRef.current.rotation.y * 0.6;
      innerRef.current.rotation.x = outerRef.current.rotation.x * 0.6;
      innerRef.current.rotation.z += 0.003 * speed;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <Icosahedron ref={outerRef} args={[1.5 * scale, 1]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          wireframe
        />
      </Icosahedron>
      <Icosahedron ref={innerRef} args={[1.1 * scale, 0]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.6}
          envMapIntensity={2}
        />
      </Icosahedron>
    </Float>
  );
}

// ─── Nebula Variant: Distorted sphere with animated surface ───────────────────
function NebulaScene({ color = '#a855f7', speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(3);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 5;
    const targetY = (state.pointer.y * Math.PI) / 5;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.06;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.06;

    // Animate distortion
    distortRef.current = 0.3 + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.15;
  });

  return (
    <Float speed={1.2 * speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.4 * scale}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2 * speed}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

// ─── Prism Variant: Rotating octahedron with refractive glass ─────────────────
function PrismScene({ color = '#22d3ee', speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.08;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.z += 0.002 * speed;

    if (ringRef.current) {
      ringRef.current.rotation.x += 0.004 * speed;
      ringRef.current.rotation.y += 0.006 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.6} floatIntensity={1.8}>
      <group>
        <Octahedron ref={meshRef} args={[1.3 * scale]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color={color}
            roughness={0.0}
            metalness={0.1}
            transparent
            opacity={0.85}
            transmission={0.6}
            thickness={1.5}
            ior={2.4}
            envMapIntensity={3}
          />
        </Octahedron>
        <Torus ref={ringRef} args={[1.8 * scale, 0.015, 16, 100]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color={color}
            roughness={0.1}
            metalness={0.95}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Torus>
      </group>
    </Float>
  );
}

// ─── Plasma Variant: Organic blob with emissive glow ──────────────────────────
function PlasmaScene({ color = '#f43f5e', speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 5;
    const targetY = (state.pointer.y * Math.PI) / 5;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={1 * speed} rotationIntensity={0.4} floatIntensity={2.5}>
      <mesh ref={meshRef} scale={1.3 * scale}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.3}
          distort={0.5}
          speed={1.5 * speed}
          emissive={color}
          emissiveIntensity={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

// ─── Ring Variant: Torus knot with metallic finish ────────────────────────────
function RingScene({ color = '#f59e0b', speed = 1, scale = 1 }: { color?: string; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.07;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.07;
    meshRef.current.rotation.z += 0.003 * speed;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.7} floatIntensity={1.5}>
      <TorusKnot ref={meshRef} args={[0.9 * scale, 0.3 * scale, 128, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.95}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2.5}
        />
      </TorusKnot>
    </Float>
  );
}

// ─── Scene Wrapper ────────────────────────────────────────────────────────────
function Scene({ variant = 'crystal', color, speed = 1, scale = 1 }: {
  variant?: Floating3DVariant;
  color?: string;
  speed?: number;
  scale?: number;
}) {
  const SceneMap: Record<Floating3DVariant, React.FC<{ color?: string; speed?: number; scale?: number }>> = {
    crystal: CrystalScene,
    nebula: NebulaScene,
    prism: PrismScene,
    plasma: PlasmaScene,
    ring: RingScene,
  };

  const ActiveScene = SceneMap[variant] || CrystalScene;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4338ca" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color={color || '#818cf8'} />
      <Environment preset="city" />

      <ActiveScene color={color} speed={speed} scale={scale} />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.35}
        scale={10}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </>
  );
}

// ─── Main Floating3DCard Component ────────────────────────────────────────────
export function Floating3DCard({
  children,
  className,
  color,
  speed = 1,
  scale = 1,
  variant = 'crystal',
  ...props
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = color || {
    crystal: '#818cf8',
    nebula: '#a855f7',
    prism: '#22d3ee',
    plasma: '#f43f5e',
    ring: '#f59e0b',
  }[variant];

  return (
    <div
      className={cn(
        "relative w-full max-w-sm rounded-3xl border bg-background/50 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-2xl",
        isHovered ? "border-white/20" : "border-border/50",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? `0 0 40px ${accentColor}15, 0 20px 60px rgba(0,0,0,0.3)` : undefined,
      }}
      {...props}
    >
      {/* 3D Canvas Area */}
      <div
        className="h-72 w-full relative"
        style={{
          background: `linear-gradient(180deg, ${accentColor}10 0%, transparent 80%)`,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene variant={variant} color={color} speed={speed} scale={scale} />
        </Canvas>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at 50% 50%, ${accentColor}20 0%, transparent 70%)`,
          }}
        />

        {/* Top edge light line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
          }}
        />
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}
