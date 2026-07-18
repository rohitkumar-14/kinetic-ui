"use client";

import { ScrollVideoScrub } from "@/components/creative/scroll-video-scrub";

export function ScrollVideoScrubDemo({ videoUrl = "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4" }: { videoUrl?: string }) {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      <div className="h-[600px] overflow-y-auto no-scrollbar pointer-events-auto relative">
        
        {/* Intro space */}
        <div className="h-screen flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Video Scrubbing</h2>
          <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto leading-relaxed">
            Keep scrolling down. The video below will map its exact timeline to your scrollbar. Scroll up to reverse time.
          </p>
          <div className="mt-12 animate-bounce opacity-50">&darr;</div>
        </div>

        {/* The pinned component */}
        <ScrollVideoScrub 
          videoUrl={videoUrl}
          textNodes={[
            {
              start: 0.1,
              end: 0.3,
              content: (
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    Built for speed
                  </h2>
                  <p className="text-white/70 font-mono text-sm uppercase tracking-widest">
                    Hardware accelerated rendering
                  </p>
                </div>
              )
            },
            {
              start: 0.4,
              end: 0.6,
              content: (
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    Pixel Perfect
                  </h2>
                  <p className="text-white/70 font-mono text-sm uppercase tracking-widest">
                    Frame by frame precision
                  </p>
                </div>
              )
            },
            {
              start: 0.7,
              end: 0.9,
              content: (
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    Ready to launch
                  </h2>
                  <p className="text-white/70 font-mono text-sm uppercase tracking-widest">
                    Drop it into your project
                  </p>
                </div>
              )
            }
          ]}
        />

        {/* Outro space */}
        <div className="h-[50vh] flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-3xl font-black uppercase">End of sequence</h2>
          <p className="text-zinc-500 mt-2 font-mono text-sm">Scroll back up to rewind the video</p>
        </div>

      </div>
    </div>
  );
}
