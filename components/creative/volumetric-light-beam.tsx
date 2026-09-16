"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Sparkles, Shield, Cpu } from "lucide-react";

export interface VolumetricLightBeamProps {
  beamIntensity?: number; // 0.5 to 3.0
  beamColor?: string; // hex color
  coneAngle?: number; // 0.2 to 0.8
  dustCount?: number; // 50 to 300
  fogDensity?: number; // 0.1 to 1.5
  className?: string;
}

// Custom Volumetric Light Cone Shader
const volumetricVertexShader = `
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const volumetricFragmentShader = `
uniform vec3 uColor;
uniform float uIntensity;
uniform float uConeAngle;
uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  // Axial distance falloff from apex (top: vUv.y = 1.0, bottom: vUv.y = 0.0)
  float heightFade = smoothstep(0.0, 0.4, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
  
  // Radial edge soft falloff (glancing rim)
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float rim = pow(1.0 - abs(dot(vNormal, viewDir)), 1.8);

  // Subtle atmospheric noise shimmer
  float shimmer = sin(vWorldPosition.y * 6.0 - uTime * 3.0) * 0.08 + 0.92;

  // Mie scattering radiance
  float alpha = rim * heightFade * uIntensity * shimmer * 0.4;
  vec3 finalColor = uColor * (1.0 + rim * 0.5);

  gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
}
`;

function DustParticles({ count = 150, color = "#ffffff" }: { count: number; color: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = Math.random() * 4 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = Math.random() * 0.008 + 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i * 3 + 1];
      array[i * 3] += Math.sin(array[i * 3 + 1] * 2.0) * 0.002;

      // Wrap vertically
      if (array[i * 3 + 1] > 2.2) {
        array[i * 3 + 1] = -1.8;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function LightRig({
  intensity = 1.5,
  color = "#60a5fa",
  coneAngle = 0.45,
  dustCount = 150,
}: {
  intensity: number;
  color: string;
  coneAngle: number;
  dustCount: number;
}) {
  const coneMesh = useRef<THREE.Mesh>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const targetObjRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const pointerTarget = useRef(new THREE.Vector3(0, -1, 0));

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uConeAngle: { value: coneAngle },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (coneMesh.current) {
      const mat = coneMesh.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uIntensity.value = intensity;
      mat.uniforms.uColor.value.set(color);

      // Follow mouse pointer across screen
      const mx = (state.pointer.x * 2.2);
      const mz = (state.pointer.y * -1.8);
      pointerTarget.current.set(mx, -1.0, mz);

      targetObjRef.current.position.lerp(pointerTarget.current, 0.08);

      // Aim cone towards target
      const apex = new THREE.Vector3(0, 2.5, 0);
      coneMesh.current.position.copy(apex);
      coneMesh.current.lookAt(targetObjRef.current.position);
      coneMesh.current.rotateX(-Math.PI / 2); // align cylinder axis
    }

    if (spotLightRef.current) {
      spotLightRef.current.target = targetObjRef.current;
      spotLightRef.current.color.set(color);
      spotLightRef.current.intensity = intensity * 3.5;
    }
  });

  return (
    <>
      <primitive object={targetObjRef.current} />

      {/* Primary Spot Light */}
      <spotLight
        ref={spotLightRef}
        position={[0, 2.5, 0]}
        angle={coneAngle}
        penumbra={0.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Volumetric Cone Geometry */}
      <mesh ref={coneMesh} position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.08, 1.8 * coneAngle * 2.5, 3.8, 48, 1, true]} />
        <shaderMaterial
          vertexShader={volumetricVertexShader}
          fragmentShader={volumetricFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Suspended Dust Motes */}
      <DustParticles count={dustCount} color={color} />
    </>
  );
}

export function VolumetricLightBeam({
  beamIntensity = 1.6,
  beamColor = "#60a5fa",
  coneAngle = 0.45,
  dustCount = 180,
  className,
}: VolumetricLightBeamProps) {
  return (
    <div className={cn("relative w-full h-[500px] rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden", className)}>
      <Canvas
        camera={{ position: [0, 0.6, 4.2], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.15} />

        <LightRig
          intensity={beamIntensity}
          color={beamColor}
          coneAngle={coneAngle}
          dustCount={dustCount}
        />

        {/* Illuminated Ground Plane & Specular Card */}
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial roughness={0.7} metalness={0.2} color="#09090b" />
        </mesh>

        {/* Floating Frosted Glass Plaque in the Light Path */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, -0.6, 0.4]} rotation={[-0.1, 0, 0]}>
            <mesh receiveShadow castShadow>
              <boxGeometry args={[2.8, 1.4, 0.08]} />
              <meshPhysicalMaterial
                transmission={0.88}
                roughness={0.25}
                ior={1.5}
                thickness={0.5}
                color="#0f172a"
              />
            </mesh>

            {/* Embedded 3D HTML Interface Content */}
            <Html transform distanceFactor={3.2} position={[0, 0, 0.05]}>
              <div className="w-80 p-5 rounded-2xl bg-zinc-950/75 border border-white/15 backdrop-blur-xl shadow-2xl select-none">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> Volumetric Ray
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    60 FPS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Atmospheric God Rays</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                  Light cone with real-time Mie scattering, dynamic pointer tracking, and floating dust motes.
                </p>
              </div>
            </Html>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
