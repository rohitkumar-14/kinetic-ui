"use client";

import React from "react";
import { ThemeExporter } from "@/components/creative/theme-exporter";

export function ThemeExporterDemo() {
  return (
    <div className="w-full p-6 flex items-center justify-center bg-black rounded-3xl min-h-[350px]">
      <ThemeExporter className="max-w-xl" />
    </div>
  );
}
