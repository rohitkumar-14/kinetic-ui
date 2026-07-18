"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Standard ASCII gradient from dark to light
const ASCII_CHARS = " .:-=+*#%@";

export interface AsciiRendererProps extends React.HTMLAttributes<HTMLPreElement> {
  /** URL of the image or video to render */
  src?: string;
  /** Whether the source is a video */
  isVideo?: boolean;
  /** Use live webcam feed instead of src */
  useWebcam?: boolean;
  /** The resolution of the ASCII grid (number of characters wide) */
  resolution?: number;
  /** Text color of the ASCII output */
  color?: string;
  /** Font size of the ASCII characters */
  fontSize?: number;
  /** Font family (must be monospace) */
  fontFamily?: string;
  /** Background color */
  backgroundColor?: string;
  /** Re-render interval in milliseconds. 0 = 60fps */
  updateInterval?: number;
}

export function AsciiRenderer({
  src,
  isVideo = false,
  useWebcam = false,
  resolution = 100, // Number of characters wide
  color = "#22c55e", // Hacker green
  fontSize = 8,
  fontFamily = "monospace",
  backgroundColor = "#000000",
  updateInterval = 30, // Limit to ~30fps by default for performance
  className,
  ...props
}: AsciiRendererProps) {
  const [asciiArt, setAsciiArt] = useState("");
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  // Initialize media (Webcam or Video)
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (useWebcam) {
      const video = document.createElement("video");
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          video.srcObject = stream;
          video.play();
          mediaRef.current = video;
        })
        .catch(err => {
          console.error("Webcam access denied or unavailable", err);
          setAsciiArt("WEBCAM ACCESS DENIED");
        });
    } else if (src) {
      if (isVideo) {
        const video = document.createElement("video");
        video.crossOrigin = "Anonymous";
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (err.name !== 'AbortError') {
              console.error("Video playback error:", err);
            }
          });
        }
        mediaRef.current = video;
      } else {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        mediaRef.current = img;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (mediaRef.current instanceof HTMLVideoElement) {
        mediaRef.current.pause();
        mediaRef.current.removeAttribute('src');
        mediaRef.current.load();
      }
    };
  }, [src, isVideo, useWebcam]);

  // Main rendering loop
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvasRef.current = canvas;

    if (!ctx) return;

    const renderAscii = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current < updateInterval) {
        animationFrameRef.current = requestAnimationFrame(renderAscii);
        return;
      }
      
      const media = mediaRef.current;
      if (!media) {
        animationFrameRef.current = requestAnimationFrame(renderAscii);
        return;
      }

      // Check if media is loaded
      let mediaWidth = 0;
      let mediaHeight = 0;
      
      if (media instanceof HTMLVideoElement && media.readyState >= 2) {
        mediaWidth = media.videoWidth;
        mediaHeight = media.videoHeight;
      } else if (media instanceof HTMLImageElement && media.complete && media.naturalWidth > 0) {
        mediaWidth = media.naturalWidth;
        mediaHeight = media.naturalHeight;
      }

      if (mediaWidth > 0 && mediaHeight > 0) {
        lastUpdateRef.current = timestamp;

        // Calculate aspect ratio. 
        // We multiply height by 0.5 because monospaced characters are typically twice as tall as they are wide.
        // This prevents the ASCII image from looking squished vertically.
        const aspectRatio = mediaHeight / mediaWidth;
        const canvasWidth = resolution;
        const canvasHeight = Math.floor(resolution * aspectRatio * 0.5);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw media to canvas
        ctx.drawImage(media, 0, 0, canvasWidth, canvasHeight);

        // Extract pixel data
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const pixels = imageData.data;

        let asciiString = "";

        for (let y = 0; y < canvasHeight; y++) {
          for (let x = 0; x < canvasWidth; x++) {
            const offset = (y * canvasWidth + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            
            // Calculate brightness (standard perceived luminance formula)
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Map brightness to an ASCII character
            const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1));
            asciiString += ASCII_CHARS[charIndex];
          }
          asciiString += "\n";
        }

        setAsciiArt(asciiString);
      }

      // If it's a static image, we only need to render once (unless it's a gif, but canvas only grabs first frame)
      if (media instanceof HTMLImageElement) {
        return;
      }

      animationFrameRef.current = requestAnimationFrame(renderAscii);
    };

    animationFrameRef.current = requestAnimationFrame(renderAscii);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resolution, updateInterval]);

  return (
    <pre
      className={cn(
        "overflow-hidden font-mono whitespace-pre flex items-center justify-center p-4 rounded-xl",
        className
      )}
      style={{
        color,
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
        fontFamily,
        backgroundColor,
      }}
      {...props}
    >
      {asciiArt || "INITIALIZING DATA STREAM..."}
    </pre>
  );
}
