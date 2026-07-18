"use client";

import React from "react";
import { MorphChart } from "@/components/creative/morph-chart";

const demoData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2800 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3400 },
  { label: "Jul", value: 4100 },
];

export function MorphChartDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <MorphChart 
        data={demoData} 
        color="#818cf8"
        className="shadow-2xl" 
      />
    </div>
  );
}
