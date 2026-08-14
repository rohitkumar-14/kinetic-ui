"use client";

import React from "react";
import { VisionGlassDock } from "@/components/creative/vision-glass-dock";
import { MessageCircle, Mail, Map, Settings, Camera, Music, Calendar } from "lucide-react";

export default function VisionGlassDockDemo() {
  const items = [
    { icon: <MessageCircle className="w-5 h-5" />, label: "Messages" },
    { icon: <Mail className="w-5 h-5" />, label: "Mail" },
    { icon: <Map className="w-5 h-5" />, label: "Maps" },
    { icon: <Camera className="w-5 h-5" />, label: "Photos" },
    { icon: <Music className="w-5 h-5" />, label: "Music" },
    { icon: <Calendar className="w-5 h-5" />, label: "Calendar" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-gradient-to-br from-indigo-900 via-purple-900 to-zinc-900 border border-white/10 rounded-xl p-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]" />

      <div className="w-full h-full flex flex-col justify-end pb-8 z-10">
        <div className="text-center mb-auto mt-8">
          <h2 className="text-2xl font-bold text-white mb-2">Vision OS Dock</h2>
          <p className="text-zinc-200">
            Hover over the icons to see the advanced framer-motion magnification physics and glassmorphic blurring.
          </p>
        </div>

        <VisionGlassDock items={items} />
      </div>

    </div>
  );
}
