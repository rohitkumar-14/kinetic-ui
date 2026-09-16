"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Layers, Sparkles, Cpu, ShieldCheck } from "lucide-react";

export interface ExplodedView3DProps {
  explosionProgress?: number; // 0 (assembled) to 1 (fully exploded)
  autoRotate?: boolean;
  accentColor?: string;
  showPins?: boolean;
  className?: string;
}

interface AnnotationPinProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  specs: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function AnnotationPin({ position, title, subtitle, specs, icon, active, onClick }: AnnotationPinProps) {
  return (
    <Html position={position} center distanceFactor={8}>
      <div className="relative group select-none pointer-events-auto">
        <button
          onClick={onClick}
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 shadow-lg border backdrop-blur-md",
            active
              ? "bg-indigo-500 text-white border-white scale-125 ring-4 ring-indigo-500/30"
              : "bg-zinc-900/90 text-zinc-300 border-white/20 hover:border-indigo-400 hover:scale-110"
          )}
        >
          {icon}
        </button>

        {/* Floating Callout Card */}
        <div
          className={cn(
            "absolute left-9 top-1/2 -translate-y-1/2 w-48 p-3 rounded-xl border border-white/15 bg-zinc-950/95 backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-none z-50",
            active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          )}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 mb-0.5">{subtitle}</div>
          <div className="text-xs font-semibold text-white mb-1">{title}</div>
          <div className="text-[10px] text-zinc-400 leading-relaxed font-light">{specs}</div>
        </div>
      </div>
    </Html>
  );
}

function WatchAssembly({
  progress = 0.5,
  accentColor = "#6366f1",
  showPins = true,
}: {
  progress: number;
  accentColor: string;
  showPins: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [activePin, setActivePin] = useState<number | null>(null);

  // Smooth lerped explosion factor
  const currentProgress = useRef(progress);
  useFrame((_, delta) => {
    currentProgress.current = THREE.MathUtils.damp(currentProgress.current, progress, 6, delta);
    if (groupRef.current) {
      // Base positions spaced out along Y axis
      const spread = currentProgress.current * 1.6;

      // Layer 1: Sapphire Glass Lens
      const glass = groupRef.current.children[0];
      if (glass) glass.position.y = 0.35 + spread * 1.5;

      // Layer 2: Bezel Ring
      const bezel = groupRef.current.children[1];
      if (bezel) bezel.position.y = 0.25 + spread * 1.0;

      // Layer 3: AMOLED Display
      const display = groupRef.current.children[2];
      if (display) display.position.y = 0.15 + spread * 0.6;

      // Layer 4: Neural Logic Board (PCB)
      const pcb = groupRef.current.children[3];
      if (pcb) pcb.position.y = 0.0 + spread * 0.1;

      // Layer 5: Haptic Engine & Battery
      const battery = groupRef.current.children[4];
      if (battery) battery.position.y = -0.15 - spread * 0.5;

      // Layer 6: Titanium Chassis Unibody
      const chassis = groupRef.current.children[5];
      if (chassis) chassis.position.y = -0.3 - spread * 1.0;

      // Layer 7: Biosensor Array Glass
      const sensor = groupRef.current.children[6];
      if (sensor) sensor.position.y = -0.45 - spread * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Sapphire Glass Top */}
      <group position={[0, 0.35, 0]}>
        <mesh>
          <cylinderGeometry args={[1.35, 1.35, 0.04, 64]} />
          <meshPhysicalMaterial
            transmission={0.95}
            roughness={0.05}
            ior={1.77}
            thickness={0.2}
            color="#f8fafc"
          />
        </mesh>
        {showPins && (
          <AnnotationPin
            position={[1.5, 0, 0]}
            subtitle="Protection Layer"
            title="Sapphire Crystal"
            specs="Mohs hardness 9 with double anti-reflective nanocoating."
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
            active={activePin === 1}
            onClick={() => setActivePin(activePin === 1 ? null : 1)}
          />
        )}
      </group>

      {/* 2. Titanium Bezel Ring */}
      <group position={[0, 0.25, 0]}>
        <mesh>
          <torusGeometry args={[1.32, 0.08, 32, 64]} />
          <meshStandardMaterial metalness={0.9} roughness={0.2} color="#94a3b8" />
        </mesh>
      </group>

      {/* 3. AMOLED Display Matrix */}
      <group position={[0, 0.15, 0]}>
        <mesh>
          <cylinderGeometry args={[1.28, 1.28, 0.03, 64]} />
          <meshStandardMaterial roughness={0.3} metalness={0.1} color="#09090b" />
        </mesh>
        {/* Glowing Dial Graphics */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 1.15, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.25, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {showPins && (
          <AnnotationPin
            position={[-1.5, 0, 0]}
            subtitle="Display Matrix"
            title="Ultra AMOLED 120Hz"
            specs="2,000 nits peak brightness with dynamic sub-pixel rendering."
            icon={<Sparkles className="w-3.5 h-3.5" />}
            active={activePin === 2}
            onClick={() => setActivePin(activePin === 2 ? null : 2)}
          />
        )}
      </group>

      {/* 4. Neural PCB Logic Board */}
      <group position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1.25, 1.25, 0.04, 64]} />
          <meshStandardMaterial roughness={0.4} metalness={0.6} color="#064e3b" />
        </mesh>
        {/* Microchip Silicon Core */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.6, 0.03, 0.6]} />
          <meshStandardMaterial roughness={0.1} metalness={0.9} color="#0f172a" />
        </mesh>
        {showPins && (
          <AnnotationPin
            position={[1.5, 0, 0]}
            subtitle="Processor"
            title="Neural S6 SiP"
            specs="4nm dual-core silicon with on-device biometric neural engine."
            icon={<Cpu className="w-3.5 h-3.5" />}
            active={activePin === 3}
            onClick={() => setActivePin(activePin === 3 ? null : 3)}
          />
        )}
      </group>

      {/* 5. Lithium Haptic Power Core */}
      <group position={[0, -0.15, 0]}>
        <mesh>
          <cylinderGeometry args={[1.15, 1.15, 0.12, 64]} />
          <meshStandardMaterial roughness={0.3} metalness={0.8} color="#334155" />
        </mesh>
      </group>

      {/* 6. Titanium Unibody Chassis */}
      <group position={[0, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[1.38, 1.34, 0.25, 64]} />
          <meshStandardMaterial roughness={0.25} metalness={0.85} color="#1e293b" />
        </mesh>
        {/* Crown Dial Button */}
        <mesh position={[1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.18, 32]} />
          <meshStandardMaterial roughness={0.2} metalness={0.9} color={accentColor} />
        </mesh>
        {showPins && (
          <AnnotationPin
            position={[-1.5, 0, 0]}
            subtitle="Architecture"
            title="Grade 5 Titanium"
            specs="Aerospace forged unibody housing with IP68 50m water resistance."
            icon={<Layers className="w-3.5 h-3.5" />}
            active={activePin === 4}
            onClick={() => setActivePin(activePin === 4 ? null : 4)}
          />
        )}
      </group>

      {/* 7. Biosensor Ceramic Array Base */}
      <group position={[0, -0.45, 0]}>
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.05, 64]} />
          <meshStandardMaterial roughness={0.1} metalness={0.3} color="#09090b" />
        </mesh>
        {/* Concentric Optical Lenses */}
        <mesh position={[0, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.45, 32]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0, -0.031, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.8, 32]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

export function ExplodedView3D({
  explosionProgress = 0.6,
  autoRotate = false,
  accentColor = "#6366f1",
  showPins = true,
  className,
}: ExplodedView3DProps) {
  const [internalProgress, setInternalProgress] = useState(explosionProgress);

  // Sync internal progress if prop changes
  React.useEffect(() => {
    setInternalProgress(explosionProgress);
  }, [explosionProgress]);

  return (
    <div className={cn("relative w-full h-[520px] rounded-2xl bg-zinc-950/85 border border-white/10 overflow-hidden flex flex-col", className)}>
      {/* Interactive Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [3.2, 2.0, 3.8], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 8, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#38bdf8" />
          <pointLight position={[0, 2, 0]} intensity={1.2} color={accentColor} />

          <PresentationControls
            global
            snap
            speed={1.5}
            zoom={0.9}
            rotation={[0.2, -0.4, 0]}
            polar={[-Math.PI / 4, Math.PI / 3]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Float speed={autoRotate ? 2 : 0} rotationIntensity={autoRotate ? 0.4 : 0} floatIntensity={0.2}>
              <WatchAssembly
                progress={internalProgress}
                accentColor={accentColor}
                showPins={showPins}
              />
            </Float>
          </PresentationControls>

          <ContactShadows position={[0, -2.2, 0]} opacity={0.5} scale={7} blur={2.5} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Floating HUD Bottom Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        <span className="text-[11px] font-medium text-zinc-400">Assembled</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={internalProgress}
          onChange={(e) => setInternalProgress(parseFloat(e.target.value))}
          className="w-32 md:w-48 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <span className="text-[11px] font-medium text-zinc-400">Exploded</span>
      </div>
    </div>
  );
}
