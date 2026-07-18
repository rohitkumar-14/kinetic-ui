"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

// A noise function for vertex displacement
const vertexShader = `
uniform float uTime;
uniform float uAudioFreq;
varying vec2 vUv;
varying float vDisplacement;

// Classic 3D Perlin Noise
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
  
  // Calculate noise based on position, time, and audio frequency
  float noise = cnoise(position * 2.0 + uTime);
  
  // Displace vertex along its normal
  // The louder the audio (uAudioFreq), the larger the displacement
  float displacement = noise * (0.1 + uAudioFreq * 1.5);
  vDisplacement = displacement;
  
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uAudioFreq;
varying vec2 vUv;
varying float vDisplacement;

void main() {
  // Mix colors based on displacement (higher displacement = hotter color)
  float mixValue = (vDisplacement * 2.0) + (uAudioFreq * 0.5);
  vec3 color = mix(uColor1, uColor2, clamp(mixValue, 0.0, 1.0));
  
  // Add a core glow
  float intensity = 1.05 - dot(vUv - 0.5, vUv - 0.5) * 2.0;
  color *= intensity;

  gl_FragColor = vec4(color, 1.0);
}
`;

function OrbScene({ analyser, color1, color2 }: { analyser: AnalyserNode | null, color1: string, color2: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Data array for frequency
  const dataArray = useMemo(() => {
    if (!analyser) return new Uint8Array(0);
    return new Uint8Array(analyser.frequencyBinCount);
  }, [analyser]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAudioFreq: { value: 0 },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) }
  }), [color1, color2]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      let avgFreq = 0;
      if (analyser && dataArray.length > 0) {
        analyser.getByteFrequencyData(dataArray);
        // Calculate average volume from frequency data
        let sum = 0;
        // Only sample the lower frequencies (bass/mids) for more noticeable pulsing
        const sampleLimit = Math.floor(dataArray.length * 0.3);
        for (let i = 0; i < sampleLimit; i++) {
          sum += dataArray[i];
        }
        avgFreq = (sum / sampleLimit) / 255.0; // Normalize 0 to 1
      }

      // Smoothly interpolate the uniform to prevent jitter
      materialRef.current.uniforms.uAudioFreq.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uAudioFreq.value,
        avgFreq,
        0.1
      );
    }
  });

  return (
    <mesh>
      <icosahedronGeometry args={[2, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export interface MicrophoneReactiveOrbProps {
  className?: string;
  color1?: string;
  color2?: string;
}

export function MicrophoneReactiveOrb({ 
  className,
  color1 = "#4f46e5", // Indigo
  color2 = "#db2777"  // Pink
}: MicrophoneReactiveOrbProps) {
  const [isListening, setIsListening] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleMicrophone = async () => {
    if (isListening) {
      // Stop listening
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setAnalyser(null);
      setIsListening(false);
    } else {
      // Start listening
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        streamRef.current = stream;
        
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        
        const source = audioContext.createMediaStreamSource(stream);
        const analyzerNode = audioContext.createAnalyser();
        analyzerNode.fftSize = 256;
        
        source.connect(analyzerNode);
        setAnalyser(analyzerNode);
        setIsListening(true);
      } catch (err) {
        console.error("Microphone access denied or error occurred.", err);
        alert("Please allow microphone access to use this feature.");
      }
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full h-[500px] bg-black rounded-3xl overflow-hidden group", className)}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <OrbScene analyser={analyser} color1={color1} color2={color2} />
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button
          onClick={toggleMicrophone}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-xl backdrop-blur-md",
            isListening 
              ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30" 
              : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
          )}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Mic
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Enable Mic
            </>
          )}
        </button>
      </div>
      
      {!isListening && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-0">
          <p className="text-zinc-400 font-mono text-sm tracking-widest mt-32">AWAITING AUDIO INPUT</p>
        </div>
      )}
    </div>
  );
}
