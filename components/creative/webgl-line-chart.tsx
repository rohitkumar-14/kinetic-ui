"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface WebGLLineChartProps {
  data: number[];
  color?: string;
  className?: string;
}

function ChartLine({ data, color = "#8b5cf6" }: { data: number[], color?: string }) {
  const lineRef = useRef<any>(null);

  const points = useMemo(() => {
    if (!data || data.length === 0) return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0)];
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const pts = [];
    for (let i = 0; i < data.length; i++) {
      // Map x from -5 to 5
      const x = (i / (data.length - 1)) * 10 - 5;
      // Map y from -2 to 2
      const y = ((data[i] - min) / range) * 4 - 2;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }, [data]);

  useFrame((state) => {
    if (lineRef.current) {
      // Animate the line drawing in by modulating dashOffset
      if (lineRef.current.material.dashOffset > 0) {
        lineRef.current.material.dashOffset -= 0.02;
      }
    }
  });

  return (
    <group>
      {/* The neon glowing line */}
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={5}
        dashed={true}
        dashSize={100} // make dashSize large enough to cover the whole line
        dashOffset={100} // start fully hidden
        dashScale={1}
      />
      {/* Background glow using a wider, transparent line */}
      <Line
        points={points}
        color={color}
        lineWidth={20}
        transparent
        opacity={0.15}
      />
      {/* Particles emitting along the line */}
      <Sparkles 
        count={50} 
        scale={[10, 4, 2]} 
        color={color} 
        size={2} 
        speed={0.4} 
        opacity={0.5} 
      />
    </group>
  );
}

export function WebGLLineChart({ data, color = "#8b5cf6", className }: WebGLLineChartProps) {
  return (
    <div className={cn("w-full h-[400px] bg-black rounded-xl overflow-hidden relative", className)}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <ChartLine data={data} color={color} />
        {/* Allow users to slightly rotate the chart for a 3D effect */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minAzimuthAngle={-0.2} 
          maxAzimuthAngle={0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2 + 0.2}
        />
      </Canvas>
      <div className="absolute top-4 left-4 pointer-events-none">
        <h3 className="text-white font-semibold text-lg tracking-tight">Revenue (3D)</h3>
        <p className="text-zinc-500 text-sm">Interactive WebGL Visualization</p>
      </div>
    </div>
  );
}
