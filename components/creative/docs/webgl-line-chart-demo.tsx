"use client";

import React, { useEffect, useState } from "react";
import { WebGLLineChart } from "@/components/creative/webgl-line-chart";

export function WebGLLineChartDemo() {
  const [data, setData] = useState<number[]>([10, 15, 8, 24, 30, 25, 40, 35, 50, 48, 60]);

  // Optionally simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), prev[prev.length - 1] + (Math.random() * 20 - 10)];
        return newData.map(n => Math.max(0, n)); // keep it positive
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 bg-zinc-950 flex flex-col gap-4 rounded-xl border border-border">
      <WebGLLineChart data={data} color="#0ea5e9" />
      <div className="flex justify-between text-xs text-zinc-500 font-mono">
        <span>Drag to rotate</span>
        <span>Live Data Stream</span>
      </div>
    </div>
  );
}
