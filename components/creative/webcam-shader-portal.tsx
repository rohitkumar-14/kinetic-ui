"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Camera, CameraOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// --- GLSL SHADERS ---

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const defaultFragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}
`;

const glitchFragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

// Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  
  // Glitch effect based on time
  float glitchIntensity = step(0.9, random(vec2(uTime * 0.1, uTime * 0.2))) * 0.1;
  float glitchLine = step(0.8, random(vec2(uv.y * 10.0, uTime)));
  
  if (glitchLine > 0.5) {
    uv.x += glitchIntensity * (random(vec2(uTime, uv.y)) - 0.5);
  }

  // RGB Split
  float split = glitchIntensity * 0.5;
  float r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(split, 0.0)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

const asciiFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
varying vec2 vUv;

float character(float n, vec2 p) {
  p = floor(p*vec2(4.0, -4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
    if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
  }
  return 0.0;
}

void main() {
  vec2 pix = gl_FragCoord.xy;
  vec3 col = texture2D(uTexture, floor(pix/8.0)*8.0/uResolution).rgb;
  
  float gray = dot(col, vec3(0.299, 0.587, 0.114));
  float n = 65536.0; // Space
  
  if (gray > 0.2) n = 65600.0;    // .
  if (gray > 0.3) n = 332772.0;   // *
  if (gray > 0.4) n = 15255086.0; // o
  if (gray > 0.5) n = 23385164.0; // &
  if (gray > 0.6) n = 15252014.0; // 8
  if (gray > 0.7) n = 13199452.0; // @
  if (gray > 0.8) n = 11512810.0; // #
  
  vec2 p = mod(pix/4.0, 2.0) - vec2(1.0);
  col = col * character(n, p);
  
  // Matrix green tint
  gl_FragColor = vec4(0.0, col.g * 1.5, 0.0, 1.0);
}
`;


// --- R3F COMPONENT ---

function ShaderPlane({ videoTexture, variant }: { videoTexture: THREE.VideoTexture | null, variant: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const fragmentShader = useMemo(() => {
    switch(variant) {
      case "glitch": return glitchFragmentShader;
      case "matrix": return asciiFragmentShader;
      default: return defaultFragmentShader;
    }
  }, [variant]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: videoTexture },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }), [videoTexture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Update texture if it changes
      if (materialRef.current.uniforms.uTexture.value !== videoTexture) {
        materialRef.current.uniforms.uTexture.value = videoTexture;
      }
    }
  });

  if (!videoTexture) return null;

  return (
    <mesh>
      {/* 16:9 Aspect Ratio Plane */}
      <planeGeometry args={[16/3, 9/3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // Fix mirror effect by inverting the UVs (since webcams are usually mirrored)
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// --- MAIN WRAPPER COMPONENT ---

export interface WebcamShaderPortalProps {
  className?: string;
  initialVariant?: "default" | "glitch" | "matrix";
}

export function WebcamShaderPortal({ className, initialVariant = "matrix" }: WebcamShaderPortalProps) {
  const [isActive, setIsActive] = useState(false);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const [variant, setVariant] = useState(initialVariant);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleWebcam = async () => {
    if (isActive) {
      // Stop
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setVideoTexture(null);
      setIsActive(false);
    } else {
      // Start
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        streamRef.current = stream;
        
        if (!videoRef.current) {
          const video = document.createElement("video");
          video.autoplay = true;
          video.muted = true;
          video.playsInline = true;
          videoRef.current = video;
        }
        
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const texture = new THREE.VideoTexture(videoRef.current);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        // Flip horizontally so it acts like a mirror
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;
        
        setVideoTexture(texture);
        setIsActive(true);
      } catch (err) {
        console.error("Webcam access denied.", err);
        alert("Please allow webcam access to use this feature.");
      }
    }
  };

  const cycleVariant = () => {
    const variants = ["default", "glitch", "matrix"];
    const nextIndex = (variants.indexOf(variant) + 1) % variants.length;
    setVariant(variants[nextIndex] as any);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full h-[500px] bg-black rounded-3xl overflow-hidden group", className)}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={["#000"]} />
        <ShaderPlane videoTexture={videoTexture} variant={variant} />
      </Canvas>
      
      {/* Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={toggleWebcam}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-xl backdrop-blur-md",
            isActive 
              ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30" 
              : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
          )}
        >
          {isActive ? (
            <>
              <CameraOff className="w-5 h-5" />
              Stop Feed
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Enable Webcam
            </>
          )}
        </button>
        
        {isActive && (
          <button
            onClick={cycleVariant}
            className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all shadow-xl backdrop-blur-md"
            title="Cycle Shader"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="uppercase text-xs tracking-widest">{variant}</span>
          </button>
        )}
      </div>

      {!isActive && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-0">
          <p className="text-zinc-400 font-mono text-sm tracking-widest mt-32">AWAITING CAMERA STREAM</p>
        </div>
      )}
    </div>
  );
}
