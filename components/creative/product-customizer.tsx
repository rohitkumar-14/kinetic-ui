"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// --------------------------------------------------------------------------
// 3D MODEL COMPONENTS
// --------------------------------------------------------------------------

interface AnimatedMaterialProps {
  color: string;
  roughness?: number;
  metalness?: number;
  distort?: boolean;
}

function AnimatedMaterial({ color, roughness = 0.2, metalness = 0.8, distort = false }: AnimatedMaterialProps) {
  const materialRef = useRef<any>(null);
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      targetColor.set(color);
      materialRef.current.color.lerp(targetColor, delta * 4);
    }
  });

  if (distort) {
    return (
      <MeshDistortMaterial
        ref={materialRef}
        roughness={roughness}
        metalness={metalness}
        speed={2}
        distort={0.4}
      />
    );
  }

  return (
    <meshStandardMaterial 
      ref={materialRef} 
      roughness={roughness} 
      metalness={metalness} 
    />
  );
}

interface SciFiCoreProps {
  baseColor: string;
  accentColor: string;
  coreColor: string;
}

function SciFiCore({ baseColor, accentColor, coreColor }: SciFiCoreProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2;
      outerRingRef.current.rotation.y += delta * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.4;
      innerRingRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Floating Center Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <AnimatedMaterial color={coreColor} roughness={0.1} metalness={0.9} distort />
        </mesh>
      </Float>

      {/* Inner Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.8, 0.1, 16, 100]} />
          <AnimatedMaterial color={accentColor} roughness={0.4} metalness={1} />
        </mesh>
        {/* Orbits on inner ring */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <AnimatedMaterial color={accentColor} roughness={0.2} metalness={1} />
          </mesh>
        ))}
      </group>

      {/* Outer Ring */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.05, 16, 100]} />
          <AnimatedMaterial color={baseColor} roughness={0.5} metalness={0.8} />
        </mesh>
        {/* Cage pillars */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * 2.8, 0, Math.sin(angle) * 2.8]}
            rotation={[0, -angle, 0]}
          >
            <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
            <AnimatedMaterial color={baseColor} roughness={0.3} metalness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --------------------------------------------------------------------------
// UI COMPONENT
// --------------------------------------------------------------------------

export interface ProductCustomizerProps {
  className?: string;
}

export function ProductCustomizer({ className }: ProductCustomizerProps) {
  // Configurator State
  const [baseColor, setBaseColor] = useState("#2a2a2a");
  const [accentColor, setAccentColor] = useState("#ff3b30");
  const [coreColor, setCoreColor] = useState("#0a84ff");

  const colors = {
    base: [
      { name: "Space Gray", hex: "#2a2a2a" },
      { name: "Silver", hex: "#e5e5ea" },
      { name: "Midnight", hex: "#1c1c1e" },
      { name: "Starlight", hex: "#f0ece6" },
    ],
    accent: [
      { name: "Product Red", hex: "#ff3b30" },
      { name: "Orange", hex: "#ff9500" },
      { name: "Mint", hex: "#00c7be" },
      { name: "Pink", hex: "#ff2d55" },
    ],
    core: [
      { name: "Blue", hex: "#0a84ff" },
      { name: "Indigo", hex: "#5e5ce6" },
      { name: "Purple", hex: "#bf5af2" },
      { name: "Green", hex: "#32d74b" },
    ]
  };

  return (
    <div className={cn("relative w-full h-[600px] bg-[#0A0A0A] rounded-2xl overflow-hidden flex flex-col md:flex-row", className)}>
      
      {/* 3D Canvas Area */}
      <div className="flex-1 h-[60%] md:h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          
          <SciFiCore 
            baseColor={baseColor} 
            accentColor={accentColor} 
            coreColor={coreColor} 
          />

          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#000000"
          />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        <div className="absolute top-6 left-6 pointer-events-none">
          <h2 className="text-white font-bold tracking-widest uppercase text-xs">Sci-Fi Core Generator</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">Interactive WebGL</p>
        </div>
      </div>

      {/* UI Controls Area */}
      <div className="w-full md:w-80 bg-black/50 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col gap-8 overflow-y-auto">
        
        {/* Base Material */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Chassis Material</h3>
          <div className="flex gap-3">
            {colors.base.map((c) => (
              <button
                key={c.name}
                onClick={() => setBaseColor(c.hex)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                  baseColor === c.hex ? "border-white scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
          <p className="text-zinc-500 text-xs mt-2">{colors.base.find(c => c.hex === baseColor)?.name}</p>
        </div>

        {/* Accent Ring */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Orbital Ring</h3>
          <div className="flex gap-3">
            {colors.accent.map((c) => (
              <button
                key={c.name}
                onClick={() => setAccentColor(c.hex)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                  accentColor === c.hex ? "border-white scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
          <p className="text-zinc-500 text-xs mt-2">{colors.accent.find(c => c.hex === accentColor)?.name}</p>
        </div>

        {/* Energy Core */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Energy Core</h3>
          <div className="flex gap-3">
            {colors.core.map((c) => (
              <button
                key={c.name}
                onClick={() => setCoreColor(c.hex)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                  coreColor === c.hex ? "border-white scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
          <p className="text-zinc-500 text-xs mt-2">{colors.core.find(c => c.hex === coreColor)?.name}</p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-4">
            <span className="text-white font-medium text-xl">$4,999</span>
            <span className="text-emerald-400 text-xs uppercase tracking-wider">In Stock</span>
          </div>
          <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
            Deploy Core
          </button>
        </div>

      </div>
    </div>
  );
}
