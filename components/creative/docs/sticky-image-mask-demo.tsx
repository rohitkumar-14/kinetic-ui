"use client";

import { StickyImageMask } from "@/components/creative/sticky-image-mask";

export function StickyImageMaskDemo({ text = "NATURE", videoUrl = "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4" }: { text?: string, videoUrl?: string }) {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 h-[600px] bg-zinc-950">
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pointer-events-auto">
        
        {/* Intro Space */}
        <div className="h-[70vh] flex flex-col items-center justify-center text-white relative z-20">
          <p className="text-zinc-500 font-mono text-sm mb-4 uppercase tracking-widest">Scroll slowly to reveal</p>
          <div className="animate-bounce">
            &darr;
          </div>
        </div>

        {/* The Mask Reveal Section */}
        <StickyImageMask 
          text={text} 
          videoUrl={videoUrl}
        />

        {/* Outro Space */}
        <div className="h-[70vh] flex flex-col items-center justify-center bg-zinc-950 text-white gap-4 relative z-20">
          <h2 className="text-4xl md:text-6xl font-black text-center max-w-lg tracking-tighter">
            Seamless Cinematic Reveal
          </h2>
          <p className="text-zinc-500 text-center max-w-md text-lg">
            Built with CSS mix-blend-mode for perfect edge sharpness and GPU-accelerated scaling.
          </p>
        </div>

      </div>
    </div>
  );
}
