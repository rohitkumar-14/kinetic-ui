"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  TorusKnot,
  Icosahedron,
  Octahedron,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

interface ChromaticGlassPrismProps {
  /**
   * Refraction index for the glass. Higher values increase bending of background light.
   * Typical values: 1.0 (air), 1.5 (glass), 2.4 (diamond).
   */
  ior?: number;
  /**
   * Chromatic aberration amount (0 to 1). Increases the rainbow spectral dispersion at edges.
   */
  chromaticAberration?: number;
  /**
   * Thickness of the transparent mesh. Affects volume refractions.
   */
  thickness?: number;
  /**
   * Base color tint of the glass material.
   */
  color?: string;
  /**
   * Shape of the crystal geometry
   */
  shape?: "icosahedron" | "octahedron" | "torusknot";
  /**
   * Optional CSS class for the container
   */
  className?: string;
}

// Separate component for the actual crystal logic to utilize useFrame
function CrystalObject({
  ior,
  chromaticAberration,
  thickness,
  color,
  shape,
}: Omit<ChromaticGlassPrismProps, "className">) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Handle mouse move to calculate target rotation based on cursor
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // The crystal tilts slightly towards the cursor
      targetRotation.current.x = y * 0.8; // tilt up/down
      targetRotation.current.y = x * 0.8; // tilt left/right
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base slow rotation for a continuous idle spin
      const baseRotationX = state.clock.elapsedTime * 0.2;
      const baseRotationY = state.clock.elapsedTime * 0.3;

      // Smoothly damp the mesh rotation towards the target cursor tilt + base spin
      easing.dampE(
        meshRef.current.rotation,
        [
          baseRotationX + targetRotation.current.x,
          baseRotationY + targetRotation.current.y,
          0,
        ],
        0.25,
        delta
      );
    }
  });

  // Dynamically select the geometry based on prop
  const Geometry = useMemo(() => {
    switch (shape) {
      case "octahedron":
        return <Octahedron args={[1.5, 0]} />;
      case "torusknot":
        return <TorusKnot args={[1, 0.3, 128, 32]} />;
      case "icosahedron":
      default:
        return <Icosahedron args={[1.5, 0]} />; // Flat faces
    }
  }, [shape]);

  return (
    <Float floatIntensity={2} rotationIntensity={0} speed={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {Geometry}
        {/*
          MeshTransmissionMaterial gives us performant, PBR-based volumetric glass
          It supports chromatic aberration (RGB dispersion), transmission (refraction), and thickness.
        */}
        <MeshTransmissionMaterial
          backside={true}
          backsideThickness={thickness}
          samples={8} // Increase for better quality blur, lowers performance
          resolution={512} // Render target resolution for background refraction
          transmission={1} // 100% transmissive (glass-like)
          roughness={0.05} // Slightly rough surface for realistic smudges, keep low for clear glass
          thickness={thickness}
          ior={ior}
          chromaticAberration={chromaticAberration}
          anisotropy={0.3} // Adds stretching to the specular highlights
          distortion={0}
          distortionScale={0.1}
          temporalDistortion={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color={color}
          attenuationDistance={0.5} // Light absorption distance
          attenuationColor={color}
        />
      </mesh>
    </Float>
  );
}

// Background decorative elements to provide something interesting for the crystal to refract
function EnvironmentBackground() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={ringsRef} position={[0, 0, -5]}>
      {/* Three offset rings to create cool distorted reflections inside the prism */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, 0, -4]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[4, 0.15, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0, 0, -6]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[5, 0.2, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Floating sparkles behind */}
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
    </group>
  );
}

export function ChromaticGlassPrism({
  ior = 1.5,
  chromaticAberration = 0.5,
  thickness = 1.5,
  color = "#ffffff",
  shape = "icosahedron",
  className,
}: ChromaticGlassPrismProps) {
  // Wait for mount to render Three.js Canvas to avoid hydration mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={className} />;

  return (
    <div className={`w-full h-full relative bg-neutral-950 overflow-hidden ${className || ""}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: false }} // alpha false for better bloom/color blending, bg is solid
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />
        
        {/* Studio environment for high quality reflections on the glass surface */}
        <Environment preset="city" />

        <EnvironmentBackground />

        <CrystalObject
          ior={ior}
          chromaticAberration={chromaticAberration}
          thickness={thickness}
          color={color}
          shape={shape}
        />

        {/* Soft shadow underneath the float area */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Canvas>
      
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />
    </div>
  );
}
