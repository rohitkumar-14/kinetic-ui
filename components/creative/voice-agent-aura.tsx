"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
  uniform float uTime;
  uniform float uVolume;
  uniform float uSpeed;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Classic Perlin 3D Noise 
  // by Stefan Gustavson
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Create base noise mapped to sphere coordinates
    float noiseFreq = 2.0;
    float noiseAmp = 0.4 + (uVolume * 0.8);
    vec3 noisePos = vec3(position.x * noiseFreq + uTime * uSpeed, position.y * noiseFreq + uTime * uSpeed, position.z * noiseFreq);
    float noise = cnoise(noisePos) * noiseAmp;
    
    // Add high frequency ripples if volume is high
    float ripple = sin(position.y * 10.0 + uTime * 5.0) * (uVolume * 0.1);
    
    vDisplacement = noise + ripple;
    
    vec3 newPosition = position + normal * vDisplacement;
    vPosition = newPosition;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uVolume;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Iridescent fresnel effect based on view angle and normal
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.0);

    // Map colors based on displacement and fresnel
    float colorMix1 = smoothstep(-0.5, 0.5, vDisplacement);
    float colorMix2 = smoothstep(0.0, 1.0, fresnel + (uVolume * 0.5));
    
    vec3 finalColor = mix(uColor1, uColor2, colorMix1);
    finalColor = mix(finalColor, uColor3, colorMix2);
    
    // Add intense core glow when volume peaks
    vec3 coreGlow = uColor1 * (1.0 - fresnel) * (0.5 + uVolume * 1.5);
    finalColor += coreGlow;

    // Output with slight opacity for glowing edges
    float alpha = 0.9 + (fresnel * 0.1);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface OrbProps {
  volume?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
}

function Orb({ volume = 0, color1 = "#4f46e5", color2 = "#c026d3", color3 = "#38bdf8", speed = 1.0 }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Parse colors just once
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVolume: { value: volume },
      uSpeed: { value: speed },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uColor3: { value: new THREE.Color(color3) },
    }),
    [color1, color2, color3, speed, volume]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate the volume uniform to prevent jitter
      const currentVol = materialRef.current.uniforms.uVolume.value;
      materialRef.current.uniforms.uVolume.value = THREE.MathUtils.lerp(currentVol, volume, 0.1);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05 * speed;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* High segment count for smooth displacement */}
      <sphereGeometry args={[1.2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface VoiceAgentAuraProps {
  /**
   * The audio volume level (0.0 to 1.0).
   * Typically driven by a Web Audio API analyzer node.
   */
  volume?: number;
  /**
   * Primary color of the orb
   */
  color1?: string;
  /**
   * Secondary color mapped to displaced areas
   */
  color2?: string;
  /**
   * Fresnel rim lighting color
   */
  color3?: string;
  /**
   * Animation speed multiplier
   */
  speed?: number;
  className?: string;
}

export function VoiceAgentAura({
  volume = 0.2,
  color1 = "#4f46e5",
  color2 = "#c026d3",
  color3 = "#38bdf8",
  speed = 1.0,
  className,
}: VoiceAgentAuraProps) {
  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-neutral-950", className)}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Soft lighting environment */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Orb volume={volume} color1={color1} color2={color2} color3={color3} speed={speed} />
      </Canvas>
      
      {/* Post-processing pseudo-bloom using CSS blur for a soft aura look */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 blur-3xl rounded-full scale-[0.6]"
        style={{
          background: `radial-gradient(circle at center, ${color1} 0%, transparent 70%)`,
          transform: `scale(${0.6 + volume * 0.4})`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
}
