"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// A simple Raymarching Shader for volumetric-like glowing nebulas/clouds
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

// Classic 3D noise (Simplex/Perlin approximation)
mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// Simple fractal noise
float fbm(vec3 p) {
  float f = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for(int i = 0; i < 4; i++) {
    // A cheap fake noise by combining sines
    float n = sin(p.x*freq) * cos(p.y*freq) * sin(p.z*freq);
    f += n * amp;
    p.xy *= rot(1.2);
    p.yz *= rot(0.9);
    amp *= 0.5;
    freq *= 2.0;
  }
  return f;
}

void main() {
  // Normalize pixel coordinates (from -1 to 1)
  vec2 uv = (vUv - 0.5) * 2.0;
  uv.x *= uResolution.x / uResolution.y;

  // Ray setup
  vec3 ro = vec3(0.0, 0.0, -3.0); // Ray origin (camera)
  vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction
  
  // Slowly move the camera forward
  ro.z += uTime * 0.5;
  
  // Raymarching loop
  float t = 0.0;
  float density = 0.0;
  
  // We do a fixed number of steps for performance
  for(int i = 0; i < 30; i++) {
    vec3 p = ro + rd * t;
    
    // Evaluate density function (noise) at current point
    float d = fbm(p * 0.8 + vec3(0.0, uTime * 0.2, 0.0));
    
    // Accumulate density if it's "thick" enough
    if(d > 0.1) {
      density += (d - 0.1) * 0.1;
    }
    
    // Step forward
    t += max(0.1, d * 0.5); // Variable step size based on distance field
    
    if(t > 10.0 || density > 1.0) break;
  }
  
  // Color mapping based on density
  vec3 col = mix(vec3(0.0), mix(uColor1, uColor2, density), density * 2.0);
  
  // Add some ambient glowing fog
  col += vec3(0.05, 0.02, 0.1) * t * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

function RaymarchingScene({ color1 = "#4f46e5", color2 = "#db2777" }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
  }), [color1, color2]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Update resolution on resize (simplified: assuming fullscreen or resizing correctly via viewport)
      materialRef.current.uniforms.uResolution.value.set(
        state.size.width * state.viewport.dpr,
        state.size.height * state.viewport.dpr
      );
    }
  });

  return (
    <mesh>
      {/* Fullscreen quad */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export interface RaymarchingCloudsProps {
  className?: string;
  color1?: string;
  color2?: string;
}

export function RaymarchingClouds({ className, color1, color2 }: RaymarchingCloudsProps) {
  return (
    <div className={cn("relative w-full h-screen bg-black overflow-hidden", className)}>
      <Canvas camera={{ position: [0, 0, 1] }} className="absolute inset-0 pointer-events-none">
        <RaymarchingScene color1={color1} color2={color2} />
      </Canvas>
    </div>
  );
}
