"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  TorusKnot, 
  Float,
  useGLTF
} from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// --- Model Component ---
// This handles either a provided GLTF model or a fallback TorusKnot
function ConfiguratorModel({ 
  modelUrl, 
  color, 
  metalness, 
  roughness 
}: { 
  modelUrl?: string; 
  color: string; 
  metalness: number; 
  roughness: number; 
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // If a modelUrl is provided, we would ideally load it using useGLTF.
  // However, dynamically changing materials on a loaded GLTF requires traversing its scene graph.
  // For this generic component, we'll implement a fallback TorusKnot to demonstrate the configurator logic.
  
  // Smoothly interpolate color
  useFrame((state, delta) => {
    if (meshRef.current && (meshRef.current.material as THREE.MeshStandardMaterial)) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = new THREE.Color(color);
      mat.color.lerp(targetColor, 0.1);
      mat.metalness = THREE.MathUtils.lerp(mat.metalness, metalness, 0.1);
      mat.roughness = THREE.MathUtils.lerp(mat.roughness, roughness, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 256, 64]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.5} 
          roughness={0.5} 
          envMapIntensity={1}
        />
      </TorusKnot>
    </Float>
  );
}

export interface ProductConfiguratorProps {
  className?: string;
  modelUrl?: string; // Optional URL to a .gltf or .glb file
}

export function ProductConfigurator({ className, modelUrl }: ProductConfiguratorProps) {
  const [color, setColor] = useState("#ffffff");
  const [materialType, setMaterialType] = useState<"matte" | "metallic" | "glass">("metallic");

  const colors = [
    { name: "Titanium White", value: "#ffffff" },
    { name: "Obsidian Black", value: "#111111" },
    { name: "Crimson Red", value: "#dc2626" },
    { name: "Cobalt Blue", value: "#2563eb" },
    { name: "Emerald Green", value: "#059669" },
    { name: "Neon Purple", value: "#9333ea" },
  ];

  // Material presets
  const materialPresets = {
    matte: { metalness: 0.1, roughness: 0.8 },
    metallic: { metalness: 0.9, roughness: 0.2 },
    glass: { metalness: 0.1, roughness: 0.05 }, // Approximation without transmission
  };

  return (
    <div className={cn("relative w-full h-[600px] flex flex-col md:flex-row bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl", className)}>
      
      {/* 3D Canvas Area */}
      <div className="flex-1 relative cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-mono text-sm tracking-widest">
            LOADING MODEL...
          </div>
        }>
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <ConfiguratorModel 
              modelUrl={modelUrl}
              color={color} 
              metalness={materialPresets[materialType].metalness}
              roughness={materialPresets[materialType].roughness}
            />
            
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={2} 
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
        <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-500 tracking-widest pointer-events-none">
          DRAG TO ROTATE / SCROLL TO ZOOM
        </div>
      </div>

      {/* UI Control Panel */}
      <div className="w-full md:w-80 bg-zinc-900 border-l border-white/5 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-1">Configuration</h3>
          <p className="text-xs text-zinc-400">Design your perfect artifact.</p>
        </div>

        {/* Color Selection */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h4 className="text-sm font-semibold text-zinc-200">Color</h4>
            <span className="text-xs text-zinc-500 font-medium">
              {colors.find(c => c.value === color)?.name}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={cn(
                  "h-10 rounded-full border-2 transition-all duration-300",
                  color === c.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Material Selection */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-200 mb-4">Finish</h4>
          <div className="flex flex-col gap-2">
            {(["matte", "metallic", "glass"] as const).map((mat) => (
              <button
                key={mat}
                onClick={() => setMaterialType(mat)}
                className={cn(
                  "px-4 py-3 rounded-xl border text-sm font-medium text-left transition-colors capitalize",
                  materialType === mat 
                    ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400" 
                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {mat} Finish
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-6">
          <button className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors">
            Finalize Design
          </button>
        </div>
      </div>

    </div>
  );
}
