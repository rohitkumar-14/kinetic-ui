"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ScrollControls, useScroll, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function PortalRing({ src, showBadge }: { src: string; showBadge?: boolean }) {
  const portalRef = useRef<THREE.Group>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!portalRef.current || !screenRef.current) return;
    
    const r1 = scroll.range(0, 1);
    
    // Animate the Portal Ring from sideways to facing the camera
    // Starts turned 90 degrees (Math.PI / 2) and tilted back
    portalRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI / 2, 0, r1);
    portalRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 6, 0, r1);
    
    // Zoom in effect
    state.camera.position.z = THREE.MathUtils.lerp(30, 14, r1);
    state.camera.position.y = THREE.MathUtils.lerp(5, 0, r1);
    
    // Dynamic opacity for the screen
    const opacity = r1 < 0.3 ? 0 : (r1 - 0.3) * (1 / 0.7);
    screenRef.current.style.opacity = opacity.toString();
    
    // Rotate the glowing rings slowly over time
    portalRef.current.children[0].rotation.z += 0.002;
    portalRef.current.children[1].rotation.z -= 0.005;
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
      <group ref={portalRef} dispose={null}>
        
        {/* Outer Metallic Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[12, 0.8, 32, 100]} />
          <meshPhysicalMaterial 
            color="#111" 
            metalness={1} 
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Inner Glowing Energy Rings */}
        <mesh position={[0, 0, 0.2]}>
          <torusGeometry args={[11.2, 0.1, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.2]}>
          <torusGeometry args={[11.2, 0.1, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} />
        </mesh>
        
        {/* The Embedded Circular Portal Screen */}
        <group position={[0, 0, 0]}>
          <Html transform wrapperClass="htmlScreen" distanceFactor={7} zIndexRange={[100, 0]} occlude="blending">
            <div
              ref={screenRef}
              className={cn(
                "w-[1600px] h-[1600px] bg-black rounded-full overflow-hidden flex flex-col relative border-4 border-cyan-500/30 shadow-[0_0_150px_rgba(6,182,212,0.4)]",
              )}
            >
              <div className="flex-1 w-full relative">
                 <iframe 
                   src={src}
                   className="w-full h-full border-none opacity-90 scale-105"
                   title="Portal Content"
                 />
                 
                 {/* Portal Vignette/Overlay to blend the screen into the ring */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)] pointer-events-none" />

                 {showBadge && (
                   <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-lg px-8 py-3 rounded-full font-mono tracking-[0.3em] shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                     PORTAL ACTIVE
                   </div>
                 )}
              </div>
            </div>
          </Html>
        </group>

      </group>
    </Float>
  );
}

export interface PortalScrollProps {
  src?: string;
  showBadge?: boolean;
  className?: string;
}

export function PortalScroll({ 
  src = "https://example.com", 
  showBadge = true,
  className 
}: PortalScrollProps) {
  return (
    <div className={cn("w-full h-[400vh]", className)}>
      <div className="sticky top-0 w-full h-screen bg-black overflow-hidden">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black -z-10" />
        
        <Canvas camera={{ position: [0, 5, 30], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={3} color="#8b5cf6" />
          <spotLight position={[-20, -20, -10]} angle={0.15} penumbra={1} intensity={2} color="#06b6d4" />
          
          <ScrollControls pages={4} damping={0.1}>
            <PortalRing src={src} showBadge={showBadge} />
          </ScrollControls>
        </Canvas>
        
        {/* Overlay Text */}
        <div className="absolute top-16 left-0 w-full text-center pointer-events-none z-10 mix-blend-screen">
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter">
            SPATIAL <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600">PORTAL</span>
          </h2>
          <p className="text-cyan-500/60 mt-4 max-w-md mx-auto text-sm md:text-lg font-mono tracking-widest">
            A NEW DIMENSION OF SCROLL
          </p>
        </div>
      </div>
    </div>
  );
}
