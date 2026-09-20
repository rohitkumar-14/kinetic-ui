"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";
import { cn } from "@/lib/utils";

interface CubeImageGalleryProps {
  images?: string[];
  className?: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
];

function Cube({ images }: { images: string[] }) {
  const meshRef = useRef<any>(null);
  
  // Load all 6 textures
  const textures = useTexture(images);
  
  // Interactivity state
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Rotation logic based on time
  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
    
    // Slow down rotation if hovered
    if (meshRef.current && hovered) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    // @ts-ignore - framer-motion-3d types are incompatible with R3F v9
    <motion.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      initial={{ scale: 0 }}
      animate={{ 
        scale: clicked ? 1.5 : 1,
        y: hovered ? 0.2 : 0
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <boxGeometry args={[3, 3, 3]} />
      {textures.map((texture, idx) => (
        <meshStandardMaterial 
          key={idx} 
          attach={`material-${idx}`} 
          map={texture} 
          roughness={0.2}
          metalness={0.8}
        />
      ))}
    </motion.mesh>
  );
}

export function CubeImageGallery({ images = defaultImages, className }: CubeImageGalleryProps) {
  // We need exactly 6 images for a cube. If fewer, repeat them.
  const safeImages = [...images];
  while (safeImages.length < 6) {
    safeImages.push(...images);
  }
  const cubeImages = safeImages.slice(0, 6);

  return (
    <div className={cn("relative w-full h-[600px] bg-neutral-950 cursor-grab active:cursor-grabbing", className)}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#4f46e5" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#db2777" />
        
        <Cube images={cubeImages} />
        
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-white/50 text-sm tracking-widest uppercase">Click to expand • Drag to rotate</p>
      </div>
    </div>
  );
}
