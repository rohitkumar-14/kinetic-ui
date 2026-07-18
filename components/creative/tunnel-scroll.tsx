"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface TunnelScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Spacing in 3D units between each child */
  spacing?: number;
  /** Base color of the neon tunnel */
  tunnelColor?: string;
}

// ─── THE TUNNEL MESH ───
function Tunnel({ length, color }: { length: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.1;
    }
    if (materialRef.current) {
      // Pulse the emissive intensity slightly
      materialRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -length / 2]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Cylinder extending along the Z axis (rotated 90deg on X) */}
      <cylinderGeometry args={[8, 8, length + 20, 32, Math.floor(length / 2), true]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={1}
        wireframe={true}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ─── THE SCENE CAMERA CONTROLLER ───
function SceneController({
  scrollYProgress,
  maxZ,
}: {
  scrollYProgress: MotionValue<number>;
  maxZ: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    // Read the framer-motion scroll progress (0 to 1)
    const progress = scrollYProgress.get();
    
    // Target Z position for the camera
    const targetZ = progress * -maxZ;

    // Smoothly interpolate the camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // Optional: Add a slight shake or sway based on movement
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z, 
      Math.sin(progress * Math.PI * 4) * 0.05, 
      0.08
    );
  });

  return null;
}

// ─── THE MAIN WRAPPER ───
export function TunnelScroll({
  children,
  spacing = 30,
  tunnelColor = "#6366f1", // indigo-500
  className,
  ...props
}: TunnelScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Convert children to array and filter out nulls/booleans
  const childrenArray = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxZ = (childrenArray.length - 1) * spacing;

  // Render a placeholder during SSR to avoid hydration mismatches with Canvas
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      // Create a tall scrolling container. e.g., 200vh per child section.
      style={{ height: `${childrenArray.length * 150}vh` }}
      {...props}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: false }}
          >
            {/* Environment and Lighting */}
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 0, spacing * 1.5]} />
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            {/* The Infinite Tunnel */}
            <Tunnel length={maxZ} color={tunnelColor} />

            {/* Render Children as 3D Billboards */}
            {childrenArray.map((child, i) => {
              const zPosition = -i * spacing;
              return (
                <group key={i} position={[0, 0, zPosition]}>
                  {/* We use scale to ensure the HTML element looks sharp but is sized reasonably in 3D space */}
                  <Html
                    transform
                    center
                    distanceFactor={15} // Keeps elements looking consistent at distance
                    className="flex items-center justify-center pointer-events-auto"
                    style={{
                      // It's highly recommended to use fixed widths on the actual children passed to this component
                      // so they don't try to infinitely expand inside the 3D projection.
                      width: "100%",
                      maxWidth: "1000px", 
                    }}
                  >
                    <div className="w-full flex items-center justify-center opacity-100">
                      {child}
                    </div>
                  </Html>
                </group>
              );
            })}

            {/* Handles moving the camera forward based on scroll */}
            <SceneController scrollYProgress={scrollYProgress} maxZ={maxZ} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
