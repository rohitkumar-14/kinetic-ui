'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export interface GlobeMarker {
  location: [number, number];
  size: number;
}

interface GlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  speed?: number;
  scale?: number;
  dark?: number;
  diffuse?: number;
  mapBrightness?: number;
  mapSamples?: number;
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  markerColor?: [number, number, number];
  markers?: GlobeMarker[];
  theta?: number;
}

const DEFAULT_MARKERS: GlobeMarker[] = [
  { location: [37.7595, -122.4367], size: 0.06 },  // San Francisco
  { location: [40.7128, -74.0060], size: 0.06 },   // New York
  { location: [51.5074, -0.1278], size: 0.06 },    // London
  { location: [35.6895, 139.6917], size: 0.06 },   // Tokyo
  { location: [19.0760, 72.8777], size: 0.08 },    // Mumbai
  { location: [-33.8688, 151.2093], size: 0.05 },  // Sydney
  { location: [48.8566, 2.3522], size: 0.05 },     // Paris
  { location: [55.7558, 37.6173], size: 0.05 },    // Moscow
  { location: [-23.5505, -46.6333], size: 0.05 },  // São Paulo
  { location: [1.3521, 103.8198], size: 0.05 },    // Singapore
];

// Helper to convert lat/long to 3D Cartesian coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

// Helper to generate quadratic bezier points for network arcs
function getArcPoints(start: THREE.Vector3, end: THREE.Vector3, radius: number): THREE.Vector3[] {
  const midVec = new THREE.Vector3().addVectors(start, end).normalize();
  const distance = start.distanceTo(end);
  const liftHeight = radius * (1.0 + distance * 0.25);
  midVec.multiplyScalar(liftHeight);
  const curve = new THREE.QuadraticBezierCurve3(start, midVec, end);
  return curve.getPoints(30);
}

// Procedurally generate a 2D world map coordinate dot matrix texture
function createWorldMapTexture(): THREE.CanvasTexture | null {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background ocean (pure black/transparent)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 2048, 1024);

  // Draw main continent shapes scaled to canvas size
  const drawContinents = () => {
    // Eurasia & Africa
    ctx.beginPath();
    ctx.moveTo(350 * 2, 80 * 2);
    ctx.lineTo(650 * 2, 70 * 2);
    ctx.lineTo(850 * 2, 100 * 2);
    ctx.lineTo(880 * 2, 200 * 2);
    ctx.lineTo(800 * 2, 280 * 2);
    ctx.lineTo(750 * 2, 320 * 2);
    ctx.lineTo(600 * 2, 300 * 2);
    ctx.lineTo(550 * 2, 350 * 2);
    ctx.lineTo(520 * 2, 250 * 2);
    ctx.lineTo(460 * 2, 250 * 2);
    ctx.lineTo(500 * 2, 420 * 2);
    ctx.lineTo(400 * 2, 400 * 2);
    ctx.lineTo(360 * 2, 250 * 2);
    ctx.lineTo(300 * 2, 200 * 2);
    ctx.lineTo(320 * 2, 120 * 2);
    ctx.closePath();
    
    // North America
    ctx.moveTo(50 * 2, 80 * 2);
    ctx.lineTo(250 * 2, 70 * 2);
    ctx.lineTo(300 * 2, 120 * 2);
    ctx.lineTo(240 * 2, 180 * 2);
    ctx.lineTo(200 * 2, 220 * 2);
    ctx.lineTo(150 * 2, 180 * 2);
    ctx.lineTo(100 * 2, 150 * 2);
    ctx.lineTo(50 * 2, 120 * 2);
    ctx.closePath();

    // South America
    ctx.moveTo(200 * 2, 220 * 2);
    ctx.lineTo(260 * 2, 240 * 2);
    ctx.lineTo(280 * 2, 300 * 2);
    ctx.lineTo(240 * 2, 420 * 2);
    ctx.lineTo(210 * 2, 450 * 2);
    ctx.lineTo(180 * 2, 350 * 2);
    ctx.lineTo(170 * 2, 280 * 2);
    ctx.closePath();

    // Australia
    ctx.moveTo(750 * 2, 350 * 2);
    ctx.lineTo(850 * 2, 360 * 2);
    ctx.lineTo(870 * 2, 420 * 2);
    ctx.lineTo(780 * 2, 410 * 2);
    ctx.closePath();

    // Greenland
    ctx.moveTo(260 * 2, 40 * 2);
    ctx.lineTo(310 * 2, 40 * 2);
    ctx.lineTo(300 * 2, 80 * 2);
    ctx.lineTo(270 * 2, 90 * 2);
    ctx.closePath();

    // Madagascar
    ctx.moveTo(520 * 2, 370 * 2);
    ctx.lineTo(540 * 2, 360 * 2);
    ctx.lineTo(550 * 2, 400 * 2);
    ctx.closePath();
  };

  // Paint the grid of dots only inside the continent paths
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  drawContinents();
  
  for (let x = 0; x < 2048; x += 14) {
    for (let y = 0; y < 1024; y += 14) {
      if (ctx.isPointInPath(x, y)) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Traveling data packet pulse component
const Pulse = ({ points, color }: { points: THREE.Vector3[]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speedFactor = useMemo(() => 0.35 + Math.random() * 0.45, []);
  const offset = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speedFactor + offset) % 1;
    const index = Math.floor(t * (points.length - 1));
    const point = points[index];
    if (point) {
      ref.current.position.copy(point);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

// 3D Scene elements and animation loop
const GlobeScene = ({
  color,
  markers,
  markerColor,
  speed,
  theta,
}: {
  color: string;
  markers: GlobeMarker[];
  markerColor: string;
  speed: number;
  theta: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createWorldMapTexture(), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.08 * speed * delta;
    }
  });

  const connections = useMemo(() => {
    if (markers.length < 2) return [];
    const conns = [];
    for (let i = 0; i < markers.length; i++) {
      conns.push({ start: i, end: (i + 1) % markers.length });
      if (markers.length > 3) {
        conns.push({ start: i, end: (i + 3) % markers.length });
      }
    }
    return conns;
  }, [markers]);

  return (
    <group ref={groupRef} rotation={[theta, 0, 0]}>
      {/* Occlusion Core Sphere (hides back-facing elements) */}
      <mesh>
        <sphereGeometry args={[1.96, 32, 32]} />
        <meshBasicMaterial color="#09090b" transparent opacity={0.65} />
      </mesh>

      {/* Earth Dot-Matrix Continents */}
      {texture && (
        <mesh>
          <sphereGeometry args={[1.98, 64, 64]} />
          <meshBasicMaterial
            color={color}
            alphaMap={texture}
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Latitude/Longitude Mesh Lines */}
      <mesh>
        <sphereGeometry args={[2.0, 24, 24]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Ring Decoration */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.02, 2.03, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {/* Markers (Tech Hubs / Global Cities) */}
      {markers.map((marker, i) => {
        const scaleVal = marker.size ? marker.size * 12 : 1;
        const pos = latLongToVector3(marker.location[0], marker.location[1], 2.01);
        return (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[0.035 * scaleVal, 16, 16]} />
              <meshBasicMaterial color={markerColor} toneMapped={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.045 * scaleVal, 0.065 * scaleVal, 16]} />
              <meshBasicMaterial color={markerColor} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* Network Paths & Traveling Pulses */}
      {connections.map((conn, idx) => {
        const startPos = latLongToVector3(markers[conn.start].location[0], markers[conn.start].location[1], 2.01);
        const endPos = latLongToVector3(markers[conn.end].location[0], markers[conn.end].location[1], 2.01);
        const points = getArcPoints(startPos, endPos, 2.01);

        return (
          <React.Fragment key={idx}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </line>
            <Pulse points={points} color={markerColor} />
          </React.Fragment>
        );
      })}
    </group>
  );
};

export function Globe({ 
  className, 
  color = "#6366f1",
  speed = 1,
  scale = 1,
  dark = 1,
  diffuse = 1.2,
  mapBrightness = 6,
  mapSamples = 16000,
  baseColor = [0.1, 0.1, 0.1],
  glowColor = [0.15, 0.15, 0.15],
  markerColor,
  markers = DEFAULT_MARKERS,
  theta = 0.3,
  ...props 
}: GlobeProps) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedMarkerColor = useMemo(() => {
    if (markerColor) {
      return `rgb(${Math.round(markerColor[0] * 255)}, ${Math.round(markerColor[1] * 255)}, ${Math.round(markerColor[2] * 255)})`;
    }
    return color;
  }, [markerColor, color]);

  if (!mounted) {
    return (
      <div 
        className={cn("relative w-full aspect-square max-w-[600px] mx-auto bg-zinc-950/20 rounded-full flex items-center justify-center border border-white/5", className)}
        {...props}
      />
    );
  }

  return (
    <div 
      className={cn("relative w-full aspect-square max-w-[600px] mx-auto cursor-grab active:cursor-grabbing select-none", className)}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      {...props}
    >
      {/* Background Soft Glow */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full blur-[80px] opacity-25"
        style={{ 
          background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
          transform: "scale(1.1)",
        }}
      />

      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GlobeScene
          color={color}
          markers={markers}
          markerColor={resolvedMarkerColor}
          speed={speed}
          theta={theta}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

