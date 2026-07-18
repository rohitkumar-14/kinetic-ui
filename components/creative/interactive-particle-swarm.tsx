"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
attribute float size;

void main() {
  vec3 pos = position;
  
  // Interactive repulsion from mouse
  float dist = distance(pos, uMouse);
  if(dist < 3.0) {
    vec3 dir = normalize(pos - uMouse);
    // Exponential falloff for smooth repulsion
    pos += dir * (3.0 - dist) * 0.8;
  }
  
  // Ambient floating motion
  pos.y += sin(uTime * 0.5 + pos.x * 2.0) * 0.2;
  pos.x += cos(uTime * 0.5 + pos.y * 2.0) * 0.2;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Perspective scaling for particle sizes
  gl_PointSize = size * (400.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
void main() {
  // Make particles perfectly circular
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if(ll > 0.5) discard;
  
  // Radial gradient for a soft, glowing orb effect
  float alpha = (0.5 - ll) * 2.0;
  
  // Cyberpunk cyan glow
  gl_FragColor = vec4(0.0, 1.0, 0.8, alpha);
}
`;

function Swarm({ count = 15000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Generate particles in a hollow sphere formation
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 2; // Radius between 6 and 8
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = Math.random() * 1.5; // Random initial sizes
    }
    
    return [positions, sizes];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(999, 999, 999) }
  }), []);

  useFrame((state) => {
    if (materialRef.current && pointsRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Map screen mouse coordinates to 3D world space
      const { mouse, camera } = state;
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Smoothly interpolate the repulsion center towards the mouse
      materialRef.current.uniforms.uMouse.value.lerp(pos, 0.1);
      
      // Slowly rotate the entire swarm
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={count} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export interface InteractiveParticleSwarmProps {
  className?: string;
  particleCount?: number;
}

export function InteractiveParticleSwarm({ className, particleCount = 15000 }: InteractiveParticleSwarmProps) {
  return (
    <div className={cn("relative w-full h-[600px] bg-black overflow-hidden", className)}>
      {/* Fallback text while WebGL context initializes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-cyan-900/30 font-mono text-xs tracking-[1em]">INITIALIZING_SWARM</span>
      </div>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} className="z-10">
        <Swarm count={particleCount} />
      </Canvas>
    </div>
  );
}
