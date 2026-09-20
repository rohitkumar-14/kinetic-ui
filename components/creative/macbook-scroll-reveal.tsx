"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Html, ContactShadows } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

interface MacBookScrollRevealProps {
  src?: string; // The URL to display on the laptop screen
  title?: string;
  badge?: string;
}

// Model component
function MacBook({ src, scrollYProgress }: { src: string; scrollYProgress: any }) {
  // Using a public free MacBook GLTF from pmndrs market
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  ) as any;
  
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Map scroll progress (0 to 1) to lid rotation (closed to open)
    const scroll = scrollYProgress.get();
    
    // The lid is closed at rotation.x = Math.PI, fully open at Math.PI / 2 - 0.4
    const closed = Math.PI - 0.05; // slightly open to avoid z-fighting
    const open = Math.PI / 2 - 0.4;
    
    // Smoothly interpolate the lid hinge
    const targetLidAngle = closed - (closed - open) * scroll;
    
    // Smooth out the animation with lerp
    if (screenRef.current) {
      screenRef.current.rotation.x = THREE.MathUtils.lerp(
        screenRef.current.rotation.x,
        targetLidAngle,
        0.1
      );
    }

    // Add a gentle floating animation
    const t = state.clock.getElapsedTime();
    group.current.position.y = (Math.sin(t / 1.5) / 10) - 0.5;
    
    // Optional: add a slight rotation based on mouse or time
    group.current.rotation.y = Math.sin(t / 3) / 15;
  });

  return (
    <group ref={group} dispose={null} position={[0, -0.5, 0]}>
      {/* Base / Keyboard */}
      <mesh geometry={nodes.macbook.geometry} material={materials.macbook}>
        <mesh geometry={nodes.macbook_1.geometry} material={materials.macbook_1} />
        <mesh geometry={nodes.macbook_2.geometry} material={materials.macbook_2} />
      </mesh>
      
      {/* Lid / Screen */}
      <mesh
        ref={screenRef}
        geometry={nodes.macbook_lid.geometry}
        material={materials.macbook_lid}
        position={[0, 0.04, -0.1]}
        rotation={[Math.PI, 0, 0]}
      >
        <mesh geometry={nodes.macbook_lid_1.geometry} material={materials.macbook_lid_1} />
        
        {/* The screen display */}
        <mesh position={[0, 0.45, -0.32]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.25, 0.8]} />
          <meshBasicMaterial color="#000000" />
          <Html
            transform
            occlude
            distanceFactor={0.8}
            position={[0, 0, 0.01]}
            rotation={[0, 0, 0]}
            className="w-[1250px] h-[800px] overflow-hidden rounded-md bg-zinc-950 flex flex-col"
          >
            {/* Fake browser bar */}
            <div className="w-full h-12 bg-zinc-900 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto w-1/2 h-6 bg-zinc-800 rounded-md border border-white/5 flex items-center px-3">
                <span className="text-xs text-zinc-400 truncate">{src}</span>
              </div>
            </div>
            {/* Iframe for content */}
            <iframe 
              src={src} 
              className="w-full flex-1 border-none bg-white"
              title="MacBook Screen Content"
            />
          </Html>
        </mesh>
      </mesh>
    </group>
  );
}

export function MacBookScrollReveal({ 
  src = "https://kinetic.studio",
  title = "Discover the unseen.",
  badge = "SCROLL DOWN"
}: MacBookScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[250vh] bg-neutral-950"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden perspective-[1000px]">
        
        {/* Intro Text */}
        <motion.div 
          className="absolute top-1/4 flex flex-col items-center z-10 pointer-events-none"
          style={{ opacity, scale }}
        >
          <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase">{badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white text-center max-w-3xl leading-tight">
            {title}
          </h1>
        </motion.div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={0.5} />
            
            <MacBook src={src} scrollYProgress={scrollYProgress} />
            
            <Environment preset="city" />
            <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          </Canvas>
        </div>
        
        {/* Gradient Overlay for blending bottom edge */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
}

// Preload the model to prevent lag
useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
