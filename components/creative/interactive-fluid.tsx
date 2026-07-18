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
uniform vec2 uMouseVelocity;
uniform vec3 uColor1;
uniform vec3 uColor2;

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
  
  // Calculate distance from mouse
  float dist = distance(uv, uMouse);
  
  // Base noise for fluid movement
  float noise1 = snoise(uv * 3.0 + uTime * 0.1);
  float noise2 = snoise(uv * 5.0 - uTime * 0.15 + noise1);
  
  // Velocity influence (trails)
  float velocityMag = length(uMouseVelocity);
  float influence = smoothstep(0.5, 0.0, dist) * min(velocityMag * 100.0, 1.0);
  
  // Distort UVs based on noise and mouse influence
  vec2 distortedUv = uv + vec2(snoise(uv + uTime), snoise(uv - uTime)) * 0.1;
  distortedUv += normalize(uv - uMouse) * influence * 0.1;
  
  // Create color blobs
  float blob1 = snoise(distortedUv * 2.0 + uTime * 0.2);
  float blob2 = snoise(distortedUv * 4.0 - uTime * 0.3);
  
  // Mix colors based on blobs and influence
  vec3 finalColor = mix(uColor1, uColor2, blob1 * 0.5 + 0.5);
  finalColor = mix(finalColor, vec3(1.0), influence * 0.5); // Add white flash on fast movement
  
  // Vignette to darken edges
  float vignette = 1.0 - smoothstep(0.2, 1.5, length(uv - 0.5));
  
  gl_FragColor = vec4(finalColor * vignette, 1.0);
}
`;

function FluidScene({
  color1,
  color2,
}: {
  color1: string;
  color2: string;
}) {
  const { viewport, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const velocity = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
    }),
    [color1, color2, size]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Calculate smooth velocity
      const lastMouse = mouse.current.clone();
      mouse.current.lerp(targetMouse.current, 0.1);
      
      const currentVelocity = new THREE.Vector2().subVectors(mouse.current, lastMouse);
      velocity.current.lerp(currentVelocity, 0.1);
      
      // Decay velocity when not moving
      velocity.current.multiplyScalar(0.95);

      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uMouse.value.copy(mouse.current);
      materialRef.current.uniforms.uMouseVelocity.value.copy(velocity.current);
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

export interface InteractiveFluidProps {
  color1?: string;
  color2?: string;
  className?: string;
}

export function InteractiveFluid({
  color1 = "#1e1b4b", // Deep indigo
  color2 = "#38bdf8", // Sky blue
  className,
}: InteractiveFluidProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidScene color1={color1} color2={color2} />
      </Canvas>
    </div>
  );
}
