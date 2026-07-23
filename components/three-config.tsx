"use client";

import { useEffect } from "react";

export function ThreeConfig() {
  useEffect(() => {
    // Suppress Three.js r184 deprecation warnings emitted by third-party fiber/drei internals
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = typeof args[0] === "string" ? args[0] : "";
      if (
        message.includes("THREE.Clock: This module has been deprecated") ||
        message.includes("THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Handle global WebGL context loss to automatically restore canvas renderers
    const handleContextLost = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("webglcontextlost", handleContextLost, true);

    return () => {
      console.warn = originalWarn;
      window.removeEventListener("webglcontextlost", handleContextLost, true);
    };
  }, []);

  return null;
}
