"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface LiquidMercuryDropletProps {
  viscosity?: number; // 0.1 (fluid) to 2.0 (stiff)
  distortion?: number; // 0.1 to 2.0 ripple intensity
  metalness?: number; // 0.0 to 1.0
  roughness?: number; // 0.0 to 1.0
  tintColor?: string; // hex or color string
  scale?: number;
  className?: string;
}

const mercuryVertexShader = `
uniform float uTime;
uniform float uDistortion;
uniform float uViscosity;
uniform vec2 uPointer;
uniform float uPointerForce;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

// Classic Perlin 3D Noise by Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vec3 pos = position;
  
  // Continuous fluid undulating breathing
  float speed = uTime * (1.2 / max(uViscosity, 0.2));
  float noise1 = snoise(pos * 1.5 + vec3(speed * 0.4, speed * 0.3, speed * 0.2));
  float noise2 = snoise(pos * 3.0 - vec3(speed * 0.2, speed * 0.5, speed * 0.1)) * 0.4;
  
  // Surface ripple displacement
  float displacement = (noise1 + noise2) * 0.25 * uDistortion;
  
  // Dynamic cursor push ripple
  float pDist = length(pos.xy - uPointer * 2.0);
  float pointerWave = sin(pDist * 8.0 - uTime * 6.0) * exp(-pDist * 2.5) * uPointerForce * 0.35;
  
  pos += normal * (displacement + pointerWave);

  // Recalculate view & normal
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const mercuryFragmentShader = `
uniform vec3 uColor;
uniform float uMetalness;
uniform float uRoughness;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  // High-contrast Fresnel rim for liquid metallic sheen
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  
  // Specular reflection highlights
  vec3 lightDir1 = normalize(vec3(1.0, 1.5, 1.0));
  vec3 lightDir2 = normalize(vec3(-1.2, -1.0, 0.8));
  vec3 halfVector1 = normalize(lightDir1 + viewDir);
  vec3 halfVector2 = normalize(lightDir2 + viewDir);

  float spec1 = pow(max(dot(normal, halfVector1), 0.0), mix(128.0, 16.0, uRoughness));
  float spec2 = pow(max(dot(normal, halfVector2), 0.0), mix(64.0, 8.0, uRoughness));
  
  // Procedural chrome environment reflection
  vec3 reflectDir = reflect(-viewDir, normal);
  float envHorizon = smoothstep(-0.2, 0.2, reflectDir.y);
  vec3 skyColor = vec3(0.95, 0.98, 1.0);
  vec3 groundColor = vec3(0.12, 0.13, 0.16);
  vec3 envReflect = mix(groundColor, skyColor, envHorizon);

  // Liquid rainbow chromatic fringe
  float chroma = sin(reflectDir.y * 10.0 + uTime * 2.0) * 0.08 * (1.0 - uRoughness);
  vec3 chromaTint = vec3(chroma, -chroma * 0.5, -chroma);

  // Base metallic mercury mix
  vec3 baseColor = mix(uColor, vec3(0.92, 0.94, 0.96), uMetalness);
  vec3 finalColor = baseColor * envReflect + (spec1 + spec2 * 0.6) * vec3(1.0) + fresnel * 0.6 * skyColor + chromaTint;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function MercuryMesh({
  viscosity = 1,
  distortion = 1,
  metalness = 0.95,
  roughness = 0.1,
  tintColor = "#ffffff",
  scale = 1.3,
}: Omit<LiquidMercuryDropletProps, "className">) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetForce = useRef(0);
  const pointerPos = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: distortion },
      uViscosity: { value: viscosity },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerForce: { value: 0 },
      uColor: { value: new THREE.Color(tintColor) },
      uMetalness: { value: metalness },
      uRoughness: { value: roughness },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDistortion.value,
        distortion,
        0.05
      );
      materialRef.current.uniforms.uViscosity.value = viscosity;
      materialRef.current.uniforms.uMetalness.value = metalness;
      materialRef.current.uniforms.uRoughness.value = roughness;
      materialRef.current.uniforms.uColor.value.set(tintColor);

      targetForce.current = THREE.MathUtils.lerp(targetForce.current, 0, 0.05);
      materialRef.current.uniforms.uPointerForce.value = targetForce.current;
      materialRef.current.uniforms.uPointer.value.lerp(pointerPos.current, 0.1);
    }
  });

  const handlePointerMove = (e: any) => {
    if (e.point) {
      pointerPos.current.set(e.point.x, e.point.y);
      targetForce.current = 1.5;
    }
  };

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        targetForce.current = 2.0;
      }}
    >
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={mercuryVertexShader}
        fragmentShader={mercuryFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function LiquidMercuryDroplet({
  viscosity = 1,
  distortion = 1,
  metalness = 0.95,
  roughness = 0.1,
  tintColor = "#f1f5f9",
  scale = 1.4,
  className,
}: LiquidMercuryDropletProps) {
  return (
    <div className={cn("relative w-full h-[450px] overflow-hidden rounded-2xl bg-zinc-950/80 border border-white/10", className)}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#60a5fa" />
        
        <PresentationControls
          global
          snap
          speed={1.5}
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
            <MercuryMesh
              viscosity={viscosity}
              distortion={distortion}
              metalness={metalness}
              roughness={roughness}
              tintColor={tintColor}
              scale={scale}
            />
          </Float>
        </PresentationControls>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.6}
          scale={5}
          blur={2.5}
          far={3}
          color="#000000"
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
