"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface ParticleSystemProps {
  count?: number;
  color?: string;
  className?: string;
}

function Particles({ count = 2000, color = "#6366f1" }: { count: number; color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  const { pointer, viewport } = useThree();
  const mouse = new THREE.Vector3();

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Map pointer to world coordinates (z=0 plane)
    mouse.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Current position
      const px = positionsArray[ix];
      const py = positionsArray[iy];
      
      // Calculate distance to mouse
      const dx = mouse.x - px;
      const dy = mouse.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Repulsion force
      const maxDist = 2;
      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        positionsArray[ix] -= dx * force * 0.05;
        positionsArray[iy] -= dy * force * 0.05;
      }

      // Spring back to original position
      positionsArray[ix] += (originalPositions[ix] - positionsArray[ix]) * 0.02;
      positionsArray[iy] += (originalPositions[iy] - positionsArray[iy]) * 0.02;
      positionsArray[iz] += (originalPositions[iz] - positionsArray[iz]) * 0.02;
      
      // Slow rotation over time
      const angle = state.clock.elapsedTime * 0.1;
      const ox = originalPositions[ix];
      const oz = originalPositions[iz];
      
      originalPositions[ix] = ox * Math.cos(angle * 0.01) - oz * Math.sin(angle * 0.01);
      originalPositions[iz] = ox * Math.sin(angle * 0.01) + oz * Math.cos(angle * 0.01);
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleSystem({
  count = 2000,
  color = "#6366f1",
  className,
}: ParticleSystemProps) {
  return (
    <div className={cn("w-full h-[400px] bg-slate-950", className)}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Particles count={count} color={color} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
