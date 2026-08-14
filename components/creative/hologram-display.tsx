"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, Environment, ContactShadows, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface HologramDisplayProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

function HologramMesh({ children, color = "#06b6d4" }: HologramDisplayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation of the holographic UI
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1.5;
    }
  });

  return (
    <group>
      {/* Hologram Projector Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 0.5, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Inner glowing lens */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>

      {/* Volumetric Light Cone approximation */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[2.5, 1.2, 5, 32, 1, true]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* The floating Hologram UI */}
      <group ref={groupRef}>
        <Html 
          transform 
          wrapperClass="hologram-html" 
          distanceFactor={6} 
          zIndexRange={[100, 0]}
          occlude="blending"
        >
          <div 
            className="w-[400px] h-[500px] relative pointer-events-auto"
            style={{
              filter: `drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color})`,
            }}
          >
            {/* Scanline overlay for holo effect */}
            <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px]" />
            {children}
          </div>
        </Html>
      </group>

      {/* Dynamic Lighting */}
      <SpotLight 
        ref={lightRef as any}
        position={[0, 0.5, 0]} 
        angle={0.6} 
        penumbra={1} 
        intensity={20} 
        color={color} 
        distance={10}
        castShadow
      />
    </group>
  );
}

export function HologramDisplay({ children, className, color = "#06b6d4" }: HologramDisplayProps) {
  return (
    <div className={cn("w-full h-[600px] relative bg-black rounded-xl overflow-hidden", className)}>
      <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <HologramMesh color={color}>
          {children}
        </HologramMesh>

        <ContactShadows position={[0, -0.25, 0]} opacity={0.8} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
