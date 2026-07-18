"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Base distortion
  float noise1 = snoise(uv * 2.0 + uTime * 0.05);
  float noise2 = snoise(uv * 3.0 - uTime * 0.08 + noise1);
  
  // Mouse influence
  float mouseDist = distance(uv, uMouse);
  float mouseInfluence = smoothstep(0.6, 0.0, mouseDist);
  vec2 distortedUv = uv + noise2 * 0.15 + mouseInfluence * 0.2 * vec2(snoise(uv + uTime), snoise(uv - uTime));
  
  // Layered noise for color mixing
  float n1 = snoise(distortedUv * 2.0 + uTime * 0.1);
  float n2 = snoise(distortedUv * 4.0 - uTime * 0.15);
  
  // Mix colors
  vec3 colorA = mix(uColor1, uColor2, n1 * 0.5 + 0.5);
  vec3 finalColor = mix(colorA, uColor3, n2 * 0.5 + 0.5);
  
  // Subtle vignette
  float vignette = 1.0 - smoothstep(0.4, 1.5, length(uv - 0.5));
  
  gl_FragColor = vec4(finalColor * vignette, 1.0);
}
`;

function Scene({
  color1,
  color2,
  color3,
  speed = 1,
}: {
  color1: string;
  color2: string;
  color3: string;
  speed?: number;
}) {
  const { viewport, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Track mouse coordinates globally
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight); // GLSL coords are bottom-left
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uColor3: { value: new THREE.Color(color3) },
    }),
    [color1, color2, color3, size]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * speed;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      // Smoothly interpolate mouse to avoid jerky movement
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.05);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface FluidBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  className?: string;
}

export function FluidBackground({
  color1 = "#4f46e5", // Indigo 600
  color2 = "#db2777", // Pink 600
  color3 = "#0f172a", // Slate 900
  speed = 1,
  className,
}: FluidBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      <Canvas>
        <Scene color1={color1} color2={color2} color3={color3} speed={speed} />
      </Canvas>
    </div>
  );
}
