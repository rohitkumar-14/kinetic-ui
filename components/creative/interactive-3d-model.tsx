"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  PresentationControls, 
  Float, 
  useGLTF,
  ContactShadows,
  BakeShadows
} from "@react-three/drei";
import { cn } from "@/lib/utils";

export interface Interactive3DModelProps {
  modelUrl?: string;
  scale?: number;
  environment?: "city" | "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "park" | "lobby";
  floatSpeed?: number;
  floatRange?: [number, number];
  className?: string;
}

// Separate component for the actual model to use the useGLTF hook
function Model({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
}

// Fallback procedurally generated beautiful object
function FallbackModel({ scale }: { scale: number }) {
  return (
    <mesh scale={scale}>
      <torusKnotGeometry args={[1, 0.3, 256, 64]} />
      <meshStandardMaterial 
        color="#6366f1" 
        roughness={0.1} 
        metalness={0.8} 
        envMapIntensity={2} 
      />
    </mesh>
  );
}

export function Interactive3DModel({
  modelUrl,
  scale = 1,
  environment = "city",
  floatSpeed = 2,
  floatRange = [-0.2, 0.2],
  className,
}: Interactive3DModelProps) {
  return (
    <div className={cn("w-full h-[400px]", className)}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          snap
        >
          <Float speed={floatSpeed} rotationIntensity={1} floatIntensity={1} floatingRange={floatRange}>
            <Suspense fallback={null}>
              {modelUrl ? (
                <Model url={modelUrl} scale={scale} />
              ) : (
                <FallbackModel scale={scale} />
              )}
            </Suspense>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset={environment} />
        <BakeShadows />
      </Canvas>
    </div>
  );
}
