"use client";

import { VideoPortal } from "@/components/creative/video-portal";

const mockProjects = [
  {
    id: "1",
    title: "Neon Genesis",
    category: "Web Design",
    videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4"
  },
  {
    id: "2",
    title: "Quantum Flow",
    category: "Branding",
    videoUrl: "https://videos.pexels.com/video-files/3129576/3129576-uhd_3840_2160_30fps.mp4"
  },
  {
    id: "3",
    title: "Ethereal Space",
    category: "3D Motion",
    videoUrl: "https://videos.pexels.com/video-files/2278095/2278095-uhd_3840_2160_30fps.mp4"
  },
  {
    id: "4",
    title: "Neural Network",
    category: "App Dev",
    videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-uhd_3840_2160_30fps.mp4"
  }
];

export interface VideoPortalDemoProps {
  portalSize?: number;
}

export function VideoPortalDemo({ portalSize = 300 }: VideoPortalDemoProps) {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      <VideoPortal 
        items={mockProjects} 
        portalSize={portalSize}
      />
    </div>
  );
}
